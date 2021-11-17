<template lang="html">

  <div class="src-components-table">
    <h4>{{title}}</h4>
    <div class="table-wrapper">
      <table class="table table-dark">
        <tr v-if="usage !== 'meds'">
          <th v-if="hasIndex">N°</th>
          <th v-for="(col, index) in getCols" :key="index">{{col}}</th>
        </tr>
        <div v-else>
          <tr>
            <th>co_id</th>
            <th>Nombre comercial</th>
            <th>Cant X envase</th>
            <th>Unidad</th>
            <th>Laboratorio</th>
            <th>Nombre genérico</th>
          </tr>
        </div>
        <div v-if="usage !== 'meds'">
          <tr v-for="(item, index) in array" :key="index">
            <td v-if="hasIndex">{{index + 1}}</td>
            <td v-for="(col, index) in getCols" :key="index">{{item[col]}}</td>
          </tr>
        </div>
        <div :class="loading ? 'loading-wrapper' : null" v-else>
          <div v-if="loading" class="loader">Cargando!</div>
          <tr v-for="(item, index) in array" :key="index">
            <td>{{item.co_id}}</td>
            <td>{{item.name}}</td>
            <td>{{item.amount}}</td>
            <td>{{item.type}}</td>
            <td>{{item.lab}}</td>
            <td>{{item.genericName}}</td>
          </tr>
        </div>
      </table>
    </div>
  </div>

</template>

<script lang="js">
  import { db } from '../firebase/db';

  export default  {
    name: 'src-components-table',
    props: [
      'title',
      'hasIndex',
      'usage',
      'dbName'
    ],
    mounted () {
      this.getAll(this.dbName);
    },
    data () {
      return {
        array: [],
        loading: true
      }
    },
    methods: {
      getAll(dbName) {
        db.collection(dbName).get().then(
          (snapshot) => {
            snapshot.docs.forEach(doc => {
              this.array.push(doc.data());
            });
            this.loading = false;
          }
        );
      }

    },
    computed: {
      getCols() {
        return Object.keys(this.array[0]);
      }
    }
}


</script>

<style scoped lang="css">
  .src-components-table {
    text-align: start;
    margin-bottom: 40px;
  }

  h4 {
    font-weight: 600;
  }

  .loading-wrapper {
    text-align: center;
    font-size: 30px;
  }

  .loading {
    font-size: 24px;
  }

</style>
