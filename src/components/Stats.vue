<template lang="html">

  <div class="src-components-stats">
  <h4>Estadísticas</h4>
    <div class="cards-wrapper">
        <Card class="cards-wrapper__card"
          :title="'Total Usuarios'"
          :number="totalUsers"
          :loading="loadingUsers"
        />
        <Card class="cards-wrapper__card"
          :title="'Usuarios registrados'"
          :subtitle="'Últimas 24hs'"
          :number="totalLastDayUsers"
          :loading="loadingUsers"
        />
        <Card class="cards-wrapper__card"
          :title="'Usuarios registrados'"
          :subtitle="'Último mes'"
          :number="totalLastMonthUsers"
          :loading="loadingUsers"
        />
        <Card class="cards-wrapper__card"
          :title="'Cantidad de tratamientos'"
          :number="totalTreatments"
          :loading="loadingTreatments"
        />
        <Card class="cards-wrapper__card"
          :title="'Tratamientos por usuario'"
          :subtitle="'Promedio'"
          :number="avgTreatmentsPerUser"
          :loading="loadingAvgTreatmentsByUser"
        />
        <Card class="cards-wrapper__card"
          :title="'Usuarios sin tratamientos'"
          :number="totalUsersWithoutTreatment"
          :loading="loadingUserWithNoTreatment"
        />
    </div>
  </div>

</template>

<script lang="js">
  import Card from './Card.vue';

  export default  {
    name: 'src-components-stats',
    props: [
      'totalUsers',
      'totalTreatments',
      'loadingUsers',
      'loadingTreatments',
      'totalLastDayUsers',
      'totalLastMonthUsers',
      'totalUsersWithoutTreatment',
      'loadingUserWithNoTreatment',
      'avgTreatmentsPerUser',
      'loadingAvgTreatmentsByUser'
    ],
    components: {
      Card
    },
    mounted () {

    },
    data () {
      return {

      }
    },
    methods: {

    },
    computed: {

    }
}


</script>

<style scoped lang="css">

  h4 {
    text-align: start;
    font-weight: 600;
  }

  .src-components-stats {
    margin-bottom: 40px;
  }

  .cards-wrapper {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    align-items: stretch;
  }
  
  .cards-wrapper__card {
    max-width: 46%;
    width: 100%;
    margin-bottom: 20px;
  }

</style>
