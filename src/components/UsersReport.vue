<template lang="html">

  <section class="src-components-users-report">
    <!-- ! Table -->
    <table class="content-table">
      <thead>
        <tr>
          <th>Nombre</th>
          <th>Apellido</th>
          <th>Mail</th>
          <th>Edad</th>
          <th>Fecha de registro</th>
          <th>Cant tratamientos</th>
          <th>Mail tutor</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in data" :key="index">
          <td>{{ item.name !== '' ? item.name : '-' }}</td>
          <td>{{ item.last_name !== '' ? item.last_name : '-' }}</td>
          <td>{{ item.email !== '' ? item.email : '-' }}</td>
          <td>{{ item.birth_date ? getAGe(item.birth_date) : '-' }}</td>
          <td>{{ item.created_at ? getFormattedDate(item.created_at) : '-' }}</td>
          <td>{{ item.amount_of_treatments }}</td>
          <td>{{ item.tutor_email !== '' ? item.tutor_email : '-' }}</td>
        </tr>
      </tbody>
    </table>
    <Loader 
      :loading="true"
      :size="'large'"
    />
  </section>

</template>

<script lang="js">
  import Loader from './Loader.vue';

  export default  {
    name: 'src-components-users-report',
    props: ['data'],
    components: {
      Loader
    },
    mounted () {

    },
    data () {
      return {

      }
    },
    methods: {
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
      getFormattedDate(timeStamp) {
        const date = timeStamp.split('/');
        const formattedDate = `${date[0]}/${date[1]}/${date[2]}`;
        if(formattedDate === '') {
          return '-';
        }
        return formattedDate;
      }
    },
    computed: {

    }
}


</script>

<style scoped lang="css">

  .src-components-users-report {
    text-align: start;
  }

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  .content-table {
    border-collapse: collapse;
    min-width: 100%;
  }

  .content-table thead {
    border-radius: 4px;
  }

  .content-table thead tr {
    background-color: #373737;
    color: #ffffff;
    text-align: start;
  }

  .content-table th,
  .content-table td {
    padding: 12px 15px;
  }

  .content-table tbody tr {
    border-bottom: 1px solid lightgrey;
  }

  .loader-wrapper {
    width: 100%;
    display: flex;
    justify-content: center;
  }

  .loader {
    background-color: #8ac344;
    height: 100px;
    width: 100px;
    border-radius: 50%;
    position: relative;
    margin: 10px;
    animation: spin 800ms linear infinite;
  }

</style>
