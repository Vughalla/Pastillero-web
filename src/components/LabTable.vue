<template lang="html">

  <div class="src-components-lab-table">
    <!-- ! Table -->
    <table class="content-table">
      <thead>
        <tr>
          <th>N°</th>
          <th>Laboratorio</th>
          <th>Cantidad</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in labs" :key="index">
          <td>{{ index + 1 }}</td>
          <td>{{ item.name }}</td>
          <td>{{ item.amount }}</td>
        </tr>
      </tbody>
    </table>
    <Loader 
      :loading="false"
      :size="'large'"
    />
  </div>

</template>

<script lang="js">
  import Loader from './Loader.vue';

  export default  {
    name: 'src-components-lab-table',
    props: [
      'labs'
    ],
    components: {
      Loader
    },
    mounted () {},
    data () {
      return {
        
      }
    },
    methods: {},
    computed: {
      
    }
}


</script>

<style scoped lang="css">

  .src-components-lab-table {

  }

  .content-table {
    border-collapse: collapse;
    margin: 25px 0;
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
