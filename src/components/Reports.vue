<template>

  <section class="src-components-reports">
    <h1>Reportes</h1>
    <!-- ! Users Report -->
    <div class="title-wrapper">
      <h2>Reporte de Usuarios</h2>
      <button @click="exportToCsv(usersForReport, 'reporte_de_usuarios')">Exportar a CSV</button>
    </div>
    <div class="report-wrapper">
      <UsersReport
        :data="usersForReport"
      />
    </div>
    <!-- ! Users Report -->
    <div class="title-wrapper">
      <h2>Reporte de tratamientos por usuario</h2>
      <button @click="exportToCsv(treatmentsForReport, 'reporte_de_tratamientos_por_usuario')">Exportar a CSV</button>
    </div>
    <div class="report-wrapper">
      <TreatmentsByUsersReport
        :data="treatmentsForReport"
      />
    </div>
  </section>

</template>

<script lang="js">
  import UsersReport from './UsersReport.vue';
  import TreatmentsByUsersReport from './TreatmentsByUsersReport.vue';
  import { db } from '../firebase/db';

  export default  {
    name: 'src-components-reports',
    props: [],
    mounted () {
      this.getAllMeds();
      this.getAllUsers();
      this.getAllTreatments();
    },
    components: {
      UsersReport,
      TreatmentsByUsersReport
    },
    data () {
      return {
        users: [],
        treatments: [],
        meds: [],
        usersForReport: [],
        treatmentsForReport: []
      }
    },
    methods: {
      castUsersToCsv(data) {
        const dataForCsv = data.map(user => {
          return {
            'Nombre': user.name,
            'Apellido': user.last_name,
            'Email': user.email,
            'Edad': this.getAGe(user.birth_date),
            'Fecha de registro': user.created_at,
            'Cantidad de tratamientos': user.amount_of_treatments,
            'Mail del tutor': user.tutor_email
          }
        });
        return dataForCsv;
      },
      castTreatmentsToCsv(data) {
        const dataForCsv = data.map(user => {
          return {
            'id_med': user.id_med,
            'Nombre comercial': user.name,
            'Laboratorio': user.lab,
            'fecha de inicio': user.start_date,
            'Email': user.email,
            'Edad': this.getAGe(user.birth_date)
          }
        });
        return dataForCsv;
      },
      castToCsv(data, type) {
        switch (type) {
          case 'reporte_de_usuarios':
            return this.castUsersToCsv(data);
          case 'reporte_de_tratamientos_por_usuario':
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
        const today = this.getToday();
        const todayString = `${today.date}_${today.month}_${today.year}`;
        const data = this.castToCsv(rawData, name);
        const csv = this.objectToCsv(data);
        this.downloadCsv(csv, `${name}_${todayString}`);
      },
      castTreatmentsForReport() {
        this.treatments.forEach(treatment => {
          const med = this.getMedFromTreatment(treatment.data().id_med);
          const user = this.getUserFromTreatment(treatment.data().user_id);
          this.treatmentsForReport.push({
            id_med: med.data().co_id,
            name: med.data().name,
            lab: med.data().lab,
            start_date: treatment.data().start_date,
            email: user.data().email,
            birth_date: user.data().birth_date
          });
        });
      },
      getMedFromTreatment(id_med) {
        let med = this.meds.find(med => med.id === id_med);
        return med;
      },
      getUserFromTreatment(user_id) {
        let user = this.users.find(user => user.id === user_id);
        return user;
      },
      addUsersForReport() {
        for (let i = 0; i < this.users.length; i++) {
          this.usersForReport.push({
            id: this.users[i].id,
            name: this.users[i].data().name,
            last_name: this.users[i].data().last_name,
            birth_date: this.users[i].data().birth_date,
            email: this.users[i].data().email,
            created_at: this.users[i].data().created_at,
            tutor_email: this.users[i].data().tutor_email,
            amount_of_treatments: 0
          });
        }
      },
      castUsersForTable() {
        this.addUsersForReport();
        this.treatments.forEach(treatment => {
          if(this.usersForReport.length !== 0) {
            const currentUser = this.usersForReport.find(user => user.id === treatment.data().user_id);
            if(currentUser) {
              currentUser.amount_of_treatments++;
            }
          }
        });
        this.usersForReport.sort((a, b) => (a.amount_of_treatments < b.amount_of_treatments) ? 1 : -1);
      },
      getAGe(timeStamp) {
        let date = new Date(timeStamp);
        let today = new Date();
        let age = today.getFullYear() - date.getFullYear();
        let m = today.getMonth() - date.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < date.getDate())) {
          age--;
        }
        return age;
      },
      getToday() {
        const timeStamp = Date.now();
        return this.getFormattedDate(timeStamp);
      },
      getFormattedDate(timeStamp) {
        const newDate = new Date(timeStamp);
        return {
          date: newDate.getDate(),
          month: newDate.getMonth() + 1,
          year: newDate.getFullYear()
        }
      },
      async getAllUsers() {
        const snapshot = await db.collection('users').get();
        this.users = snapshot.docs;
      },
      async getAllTreatments() {
        const snapshot = await db.collection('treatments').get();
        this.treatments = snapshot.docs;
        this.castUsersForTable();
        this.castTreatmentsForReport();
      },
      async getAllMeds() {
        const snapshot = await db.collection('meds').get();
        this.meds = snapshot.docs;
      }
    },
    computed: {

    }
}


</script>

<style scoped lang="css">

  .src-components-reports {
    text-align: start;
  }

  h1 {
    margin-bottom: 40px;
  }
  
  h2 {
    margin: 0;
    font-size: 24px;
  }

  .report-wrapper {
    box-shadow: 4px 4px 4px rgba(0, 0, 0, 0.25);
    border-radius: 4px;
    max-height: 400px;
    overflow: scroll;
    margin-bottom: 40px;
  }

  .title-wrapper {
    display: flex;
    align-items: center;
    margin-bottom: 20px;
  }

  .title-wrapper h2 {
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

</style>
