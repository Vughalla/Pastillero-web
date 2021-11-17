<template lang="html">

  <div class="src-components-users">
    <div class="users">
      <h2>usuarios</h2>
      <input type="text" class="search" v-model="usersSearch" placeholder="Buscar Usuario">
    </div>
    
    <div v-if="filterUsers.length" class="table-responsive">
      <table class="table table-dark">
        <tr>
          <th>Nombre</th>
          <th>Apellido</th>
          <th>Fecha de nacimiento</th>
          <th>Email</th>
        </tr>
        <tr v-for="(post,index) in filterUsers" :key="index">
          <td v-for="(col,index) in getCols" :key="index">{{post[col + 1]}}</td>
        </tr>
      </table>
      <span class="no-filters" v-if="filterUsers.length === 0">No hay medicamentos con esas características</span>
    </div>
  </div>

</template>

<script lang="js">

  export default  {
    name: 'src-components-users',
    props: [],
    mounted () {

    },
    data () {
      return {
        usersSearch: '',
        users: [
          {
            id: '1',
            name: 'Pancracio',
            lastName: 'Apellido',
            birth: '18.06.1954',
            email: 'user@user.com'
          },
          {
            id: '2',
            name: 'Ernesto',
            lastName: 'Apellido',
            birth: '18.06.1954',
            email: 'user@user.com'
          },
          {
            id: '3',
            name: 'Antonio',
            lastName: 'Apellido',
            birth: '18.06.1954',
            email: 'user@user.com'
          },
          {
            id: '4',
            name: 'Egberto',
            lastName: 'Apellido',
            birth: '18.06.1954',
            email: 'user@user.com'
          },
          {
            id: '5',
            name: 'Hilda',
            lastName: 'Apellido',
            birth: '18.06.1954',
            email: 'user@user.com'
          },
          {
            id: '6',
            name: 'Mirta',
            lastName: 'Apellido',
            birth: '18.06.1954',
            email: 'user@user.com'
          },
          {
            id: '7',
            name: 'Carmen',
            lastName: 'Apellido',
            birth: '18.06.1954',
            email: 'user@user.com'
          },
          {
            id: '8',
            name: 'Teresa',
            lastName: 'Apellido',
            birth: '18.06.1954',
            email: 'user@user.com'
          },
          {
            id: '9',
            name: 'Roberto',
            lastName: 'Apellido',
            birth: '18.06.1954',
            email: 'user@user.com'
          },
        ]
      }
    },
    methods: {

    },
    computed: {
      filterUsers() {
        return this.users.filter((user) => {
          let dataUsers = `${user.name}${user.lastName}${user.birth}${user.email}`
          return dataUsers.toLowerCase().includes(this.usersSearch.toLowerCase());
        });
      },
      getCols() {
        return Object.keys(this.users[0]);
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

  .users {
    padding-top: 40px;
    text-align: start;
  }

  .src-components-users {

  }
</style>
