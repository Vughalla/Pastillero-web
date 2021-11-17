<template lang="html">

  <div class="src-components-meds-table">
  </div>

</template>

<script lang="js">
  import { db } from '../firebase/db';

  export default  {
    name: 'src-components-meds-table',
    props: [],
    mounted () {
      this.getAll();
    },
    data () {
      return {
        actualMeds: [],
        docs: [],
        loading: true,
        addMed: false
      }
    },
    methods: {
      getAll() {
        db.collection('meds').get().then(
          (snapshot) => {
            snapshot.docs.forEach(doc => {
              this.actualMeds.push(doc.data());
              this.docs.push(doc);
            });
            this.loading = false;
          }
        );
      },
      editMed(index) {
        const id = this.docs[index].id;
        console.log(id);
      },
      deleteMed(index) {
        const id = this.docs[index].id;
        db.collection('meds').doc(id).delete();
        this.actualMeds.splice(index, 1);
        this.docs.splice(index, 1);
      }
    },
    computed: {

    }
}


</script>

<style scoped lang="css">

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  .src-components-meds-table {
    text-align: start;
  }

</style>
