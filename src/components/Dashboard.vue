<template>
  <div class="src-components-dashboard">
    <h1>Dashboard</h1>

    <!-- ! Table and Statistics components -->
    <div class="stats-top-table-wrapper">

      <div class="stats-top-table-wrapper__table">
        <div class="title-wrapper">
          <h4>Top 10 tratamientos por laboratorio</h4>
          <button @click="exportToCsv(usedLabsWithAmounts, 'reporte_de_tratamientos_por_laboratorio')">Exportar a CSV</button>
        </div>
        <LabTable
          :labs="usedLabsWithAmounts"
        />
      </div>

      <Stats class="stats-top-table-wrapper__stats"
        :totalUsers="users.length"
        :totalTreatments="treatments.length"
        :totalLastDayUsers="lastDayUsers.length"
        :totalLastMonthUsers="lastMonthUsers.length"
        :totalUsersWithoutTreatment="getUsersWithoutTreatment"
        :loadingUsers="loadingUsers"
        :loadingTreatments="loadingTreatments"
        :loadingUserWithNoTreatment="loadingUserWithNoTreatment"
        :avgTreatmentsPerUser="avgTreatmentsPerUser"
        :loadingAvgTreatmentsByUser="loadingAvgTreatmentsByUser"
      />

    </div>

    <!-- ! Table Component -->
    <div class="tables-wrapper">
      <div class="tables-wrapper__table-meds">
        <div class="title-wrapper">
          <h4>Top 10 tratamientos por medicamento</h4>
          <button @click="exportToCsv(usedTreatmentsWithAmounts, 'reporte_de_tratamientos_por_medicamento')">Exportar a CSV</button>
        </div>
        <TreatmentsByMedsTable
          :data="usedTreatmentsWithAmounts"
        />
      </div>
    </div>
  </div>

</template>

<script lang="js">
  import Stats from './Stats.vue';
  import TreatmentsByMedsTable from './TreatmentsByMedsTable.vue';
  import LabTable from './LabTable.vue';
  import { db } from '../firebase/db';

  export default  {
    name: 'src-components-dashboard',
    props: [],
    components: {
      Stats,
      TreatmentsByMedsTable,
      LabTable
    },
    mounted () {
      this.getAllMeds();
      this.getToday();
      this.getAllUsers();
      this.getAllTreatments();
    },
    data () {
      return {
        testDate: {},
        today: {
          date: '',
          month: '',
          year: ''
        },
        selectedTab: '',
        meds: [],
        users: [],
        lastDayUsers: [],
        lastMonthUsers: [],
        treatments: [],
        usedUsers: [],
        usedLabs: [],
        usedLabsWithAmounts: [],
        usedTreatmentsWithAmounts: [],
        loadingUsers: true,
        loadingTreatments: true,
        loadingUserWithNoTreatment: true,
        loadingAvgTreatmentsByUser: true,
        treatmentsByUser: 0,
        userWithNoTreatment: 0,
        avgTreatmentsPerUser: 0,
        treatmentsAmount: 0
      }
    },
    methods: {
      getAllTreatmentsWithMedsAmount() {
        const meds = [];
        let currentMed = {};
        this.treatments.forEach(treatment => {
          const newCurrentMed = this.meds.find(med => med.id === treatment.data().id_med);
          if(newCurrentMed) {
            currentMed = meds.find(med => med.id === newCurrentMed.id);
            if(!currentMed) {
              meds.push({
                id: newCurrentMed.id,
                name: newCurrentMed.data().name,
                lab: newCurrentMed.data().lab,
                amount: 1
              });
            } else {
              currentMed.amount++;
            }
          }
        });
        meds.sort((a, b) => (a.amount < b.amount) ? 1 : -1);
        this.usedTreatmentsWithAmounts = meds.slice(0, 10);
      },
      getAllLabsWithMedsAmount() {
        const labs = [];
        let currentLab = {};
        for (let i = 0; i < this.usedLabs.length; i++) {
          labs.push({
            name: this.usedLabs[i],
            amount: 0
          });
        }
        this.treatments.forEach(treatment => {
          if(labs.length !== 0) {
            const currentMed = this.meds.find(med => med.id === treatment.data().id_med);
            if(currentMed !== undefined) {
              currentLab = labs.find(lab => lab.name === currentMed.data().lab);
              if(currentLab) {
                currentLab.amount++;
              }
            }
          }
        });
        labs.sort((a, b) => (a.amount < b.amount) ? 1 : -1);
        this.usedLabsWithAmounts = labs.slice(0, 10);
      },
      getAvgTreatmentsByUser() {
        let amount = 0;
        const users = [];
        let currentUser = {};
        for (let i = 0; i < this.users.length; i++) {
          users.push({
            id: this.users[i].id,
            amount: 0
          });
        }
        this.treatments.forEach(treatment => {
          if(users.length !== 0) {
            currentUser = users.find(user => user.id === treatment.data().user_id);
            if(currentUser) {
              currentUser.amount++;
            }
          }
        });
        users.forEach(user => {
          amount += user.amount;
        });
        this.avgTreatmentsPerUser = this.getAverge(amount, users.length);
        if(!Number.isInteger(this.avgTreatmentsPerUser)) {
          this.avgTreatmentsPerUser = this.avgTreatmentsPerUser.toFixed(2);
        }
      },
      getAllUsedUsers() {
        this.loadingUserWithNoTreatment = true;
        this.treatments.forEach(treatment => {
          db.collection('users').doc(treatment.data().user_id).get().then(
            (snapshot) => {
              this.loadingUserWithNoTreatment = false;
              if(!this.usedUsers.find(user => user.id === snapshot.id)) {
                this.usedUsers.push(snapshot);
              }
            }
          );
        });
      },
      async getAllUsedLabs() {
        let snapshot = {};
        const labs = [];
        for (const treatment of this.treatments) {
          snapshot = this.meds.find(med => med.id === treatment.data().id_med);
          // snapshot = await db.collection('meds').doc(treatment.data().id_med).get();
          if(snapshot !== undefined) {
            labs.push(snapshot.data().lab);
          }
        }
        labs.forEach(currentLab => {
          if(!this.usedLabs.find(lab => lab === currentLab)) {
            this.usedLabs.push(currentLab);
          }
        });
        this.getAllLabsWithMedsAmount();
        this.getAllTreatmentsWithMedsAmount();
      },
      async getAllUsers() {
        this.loadingUsers = true;
        this.users = [];
        const snapshot = await db.collection('users').get();
        snapshot.docs.forEach(doc => {
          this.users.push(doc);
        });
        this.loadingUsers = false;
        this.getLastDayUsers();
        this.getLastMonthUsers();
      },
      async getAllTreatments() {
        this.loadingTreatments = true;
        this.treatments = [];
        const snapshot = await db.collection('treatments').get();
        snapshot.docs.forEach(doc => {
          this.treatments.push(doc);
        });
        this.getAllUsedUsers();
        this.getAllUsedLabs();
        setTimeout(() => {
          this.getAvgTreatmentsByUser();
        }, 1);
        this.loadingTreatments = false;
        this.loadingAvgTreatmentsByUser = false;
      },
      async getAllMeds() {
        const snapshot = await db.collection('meds').get();
        this.meds = snapshot.docs;
      },
      getToday() {
        const timeStamp = Date.now();
        this.today = this.getFormattedDate(timeStamp);
      },
      getFormattedDate(timeStamp) {
        const newDate = new Date(timeStamp);
        return {
          date: newDate.getDate(),
          month: newDate.getMonth() + 1,
          year: newDate.getFullYear()
        }
      },
      getLastDayUsers() {
        this.users.forEach(user => {
          const newToday = new Date();
          newToday.setDate(newToday.getDate() - 1);
          let date = user.data().created_at.split('/');
          date = this.parseDates(date);
          if(date > newToday) {
            this.lastDayUsers.push(user);
          }
        });
      },
      getLastMonthUsers() {
        const newToday = new Date();
        newToday.setMonth(newToday.getMonth() - 1);
        this.users.forEach(user => {
          let date = user.data().created_at.split('/');
          date = this.parseDates(date);
          if(date > newToday) {
            this.lastMonthUsers.push(user);
          }
        });
      },
      parseDates(date) {
        const newDate = new Date(parseInt(date[2]), parseInt(date[1]) - 1, parseInt(date[0]));
        return newDate;
      },
      getAverge(amount, total) {
        return amount / total;
      },
      castLabsToCsv(data) {
        const dataForCsv = data.map(user => {
          return {
            'Laboratorio': user.name,
            'Cantidad': user.amount
          }
        });
        return dataForCsv;
      },
      castTreatmentsToCsv(data) {
        const dataForCsv = data.map(user => {
          return {
            'Nombre comercial': user.name,
            'Laboratorio': user.lab,
            'Cantidad': user.amount
          }
        });
        return dataForCsv;
      },
      castToCsv(data, type) {
        switch (type) {
          case 'reporte_de_tratamientos_por_laboratorio':
            return this.castLabsToCsv(data);
          case 'reporte_de_tratamientos_por_medicamento':
            return this.castTreatmentsToCsv(data);
          default:
            return [];
        }
      },
      objectToCsv(data) {
        const csvRows = [];
        const headers = Object.keys(data[0]);
        csvRows.push(headers.join(','));
        
        for(const row of data) {
          const values = headers.map(header => {
            const escaped = (''+row[header]).replace(/"/g, '\\"');
            return `"${escaped}"`;
          });
          csvRows.push(values.join(','));
        }
        return csvRows.join('\n');
      },
      downloadCsv(data, name) {
        const blob = new Blob([data], { type: 'text/csv' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.setAttribute('hidden', '');
        a.setAttribute('href', url);
        a.setAttribute('download', `${name}.csv`);
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
      },
      exportToCsv(rawData, name) {
        const todayString = `${this.today.date}_${this.today.month}_${this.today.year}`;
        const data = this.castToCsv(rawData, name);
        const csv = this.objectToCsv(data);
        this.downloadCsv(csv, `${name}_${todayString}`);
      },
    },
    firestore: {
      meds: db.collection('meds')
    },
    computed: {
      getCols() {
        return Object.keys(this.labsTable[0]);
      },
      getUsersWithoutTreatment() {
        if(this.usedUsers.length === 0) {
          return 0;
        }
        return this.users.length - this.usedUsers.length;
      }
    }
}


</script>

<style scoped lang="css">

  * {
    padding: 0;
    margin: 0;
    box-sizing: border-box;
  }

  .src-components-dashboard {
    text-align: start;
  }

  h1 {
    margin-bottom: 40px;
  }

  .title-wrapper {
    display: flex;
    align-items: center;
    margin-bottom: 20px;
  }

  .title-wrapper h4 {
    margin-right: 20px;
  }

  .title-wrapper button {
    border: none;
    padding: 4px 10px;
    background-color: #8ac344;
    border-radius: 4px;
    font-weight: 600;
    color: #ffffff;
    font-size: 16px;
    cursor: pointer;
  }

  .stats-top-table-wrapper {
    display: flex;
    justify-content: space-between;
  }

  .stats-top-table-wrapper__table {
    max-width: 60%;
    width: 100%;
  }

  .stats-top-table-wrapper__stats {
    max-width: 38%;
  }

  .tables-wrapper {
    display: flex;
    justify-content: space-between;
  }

  .tables-wrapper__table-meds {
    /* max-width: 45%; */
    width: 100%;
  }

  .tables-wrapper__table-age {
    max-width: 52%;
    width: 100%;
  }

  @media (max-width: 1650px) {
    .tables-wrapper {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    }

    .tables-wrapper__table-age {
      max-width: none;
    }
  }

  @media (max-width: 1000px) {
    .stats-top-table-wrapper {
      flex-direction: column-reverse;
    }

    .stats-top-table-wrapper__table {
      max-width: none;
    }

    .stats-top-table-wrapper__stats {
      max-width: none;
    }
  }

</style>
