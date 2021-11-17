<template lang="html">

  <section class="src-components-db-registry-generator">
    <button @click="addMed()">Add Med</button>
    <button @click="addTreatment()">Add Treatment</button>
    <button @click="addUser()">Add User</button>
  </section>

</template>

<script lang="js">
  import { db } from '../firebase/db';

  export default  {
    name: 'src-components-db-registry-generator',
    props: [],
    mounted () {

    },
    data () {
      return {
        today: ''
      }
    },
    methods: {
      addMed() {
        const payload = {
          co_id: '123456788',
          name: 'Bayaspirina 600 mg x 12 comp',
          amount: 12,
          type: 'Comprimidos',
          lab: 'Bayer',
          genericName: 'Dipirona',
          comments: '',
          ean_code: 123456799,
          archived: true
        }
        db.collection('meds').add(payload);
      },
      addTreatment() {
        const payload = {
          active: true,
          created_at: Date.now(),
          days_buy_back: 9,
          days_recepy: 10,
          id_med: 'bm4zaxzbACQiDrgSvYPL',
          frequency: 10,
          start_date: Date.now(),
          stock: 9999999999,
          user_id: 'OfLeE34RXPXpA77hhsl9'
        }
        db.collection('treatments').add(payload);
      },
      addUser() {
        const payload = {
          birth_date: 123456789,
          created_at: Date.now(),
          email: 'user@user.com',
          last_name: 'User9 Last Name',
          name: 'User9',
          tutor_email: 'tuto@tutor.com'
        }
        db.collection('users').add(payload);
      }
    },
    computed: {

    }
}


</script>

<style scoped lang="css">
  .src-components-db-registry-generator {

  }
</style>
