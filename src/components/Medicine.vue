<template lang="html">

  <section class="src-components-medicine">
    <div class="medicines">
      <h2>Medicamentos</h2>
      <input type="text" class="search" v-model="medsSearch" placeholder="Buscar medicamento">
      <div class="medicines-wrapper">
        <div class="medicine" v-for="(medicine, index) in filterMeds" :key="index">
          <div class="medicine__name medicine--field">
            <span>Nombre: </span>
            <p>{{ medicine.name }}</p>
          </div>
          <div class="medicine__drug medicine--field">
            <span>Droga: </span>
            <p>{{ medicine.drug }}</p>
          </div>
          <div class="medicine__lab medicine--field">
            <span>Laboratorio: </span>
            <p>{{ medicine.laboratory }}</p>
          </div>
        </div>
      </div>
      <span class="no-filters" v-if="filterMeds.length === 0">No hay medicamentos con esas características</span>
    </div>
  </section>

</template>

<script lang="js">

  export default  {
    name: 'src-components-medicine',
    props: [],
    mounted () {

    },
    data () {
      return {
        medsSearch: '',
        medicines: [
          {
            name: 'Inhalan',
            drug: 'Med1',
            laboratory: 'Med1'
          },
          {
            name: 'Ibupirac',
            drug: 'Med2',
            laboratory: 'Med2'
          },
          {
            name: 'alernix',
            drug: 'Med3',
            laboratory: 'Med3'
          },
          {
            name: 'Buscapina',
            drug: 'Med4',
            laboratory: 'Med4'
          },
          {
            name: 'Sertal',
            drug: 'Med5',
            laboratory: 'Med5'
          },
          {
            name: 'Epatalgina',
            drug: 'Med6',
            laboratory: 'Med6'
          },
          {
            name: 'Amoxidal',
            drug: 'Med7',
            laboratory: 'Med7'
          },
          {
            name: 'Benadryl',
            drug: 'Med8',
            laboratory: 'Med8'
          },
          {
            name: 'Poviral',
            drug: 'Med9',
            laboratory: 'Med9'
          }
        ]
      }
    },
    methods: {

    },
    computed: {
      filterMeds() {
        return this.medicines.filter((med) => {
          let registroCompleto = `${med.name}${med.drug}${med.laboratory}`
          return registroCompleto.toLowerCase().includes(this.medsSearch.toLowerCase())
        });
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

  .src-components-medicine {

  }

  h2 {
    margin-bottom: 20px;
  }

  .search {
    padding: 2px 8px;
    border-radius: 4px;
    border: 1px solid #cecece;
    margin-bottom: 20px;
    max-width: 300px;
    width: 100%;
  }

  .medicines {
    padding-top: 40px;
    text-align: start;
  }

  .medicines-wrapper {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 20px;
  }

  .medicine {
    width: 100%;
    border: 1px solid black;
    padding: 10px;
    border-radius: 4px;
    border: 2px solid #818181;
  }

  .medicine--field {
    display: flex;
    align-items: center;
    margin-bottom: 10px;
    font-weight: 500;
  }

  .medicine--field:last-of-type {
    margin: 0;
  }

  .medicine--field > span {
    margin-right: 10px;
    font-size: 20px;
  }

  .medicine--field > p {
    font-size: 20px;
    font-weight: 600;
  }

  .no-filters {
    display: block;
    text-align: center;
    background-color: #e7e7e7;
    width: 100%;
    padding: 10px;
    font-size: 24px;
    border-radius: 4px;
    font-weight: 500;
  }
</style>
