<template>
  <nav class="c-navbar">
    <div class="c-navbar__content">
      <div class="c-navbar__routes">
        <router-link to="/">
          <img src="../assets/logo-white.png" alt="Central Oeste">
        </router-link>
        <router-link v-if="isLoggedIn" to="/">
          <a class="c-navbar__link" href="#">Dashboard</a>
        </router-link>
        <router-link v-if="isLoggedIn" to="/reports">
          <a class="c-navbar__link" href="#">Reports</a>
        </router-link>
        <router-link v-if="isLoggedIn" to="/meds">
          <a class="c-navbar__link" href="#">Medicamentos</a>
        </router-link>
      </div>
      <div class="c-navbar__info">
        <div v-if="isLoggedIn" class="logged">{{ userEmail }}</div>
        <button class="log-out-button" v-if="isLoggedIn" @click="signOut()">Cerrar sesión</button>
      </div>
    </div>
  </nav>
</template>

<script lang="js">
import * as firebase from 'firebase/app';
import 'firebase/auth';

  export default  {
    name: 'src-components-nav-bar',
    props: [],
    created() {
      firebase.auth().onAuthStateChanged(user => {
        if(user) {
          this.isLoggedIn = true;
          this.userEmail = user.email;
        } else {
          this.isLoggedIn = false;
        }
      });
    },
    mounted () {

    },
    data () {
      return {
        isLoggedIn: false,
        userEmail: ''
      }
    },
    methods: {
      async signOut() {
        try {
          await firebase.auth().signOut();
          window.location.href = '/';
        } catch (error) {
          console.log(error);
        }
      }
    },
    computed: {

    }
}

</script>

<style scoped lang="css">
  .src-components-nav-bar {

  }

  nav {
    max-width: 500px;
    display: flex;
    align-items: center;
  }

  a:hover {
    text-decoration: none;
  }

  img {
    width: 150px;
    margin-bottom: 100px;
  }

  .c-navbar {
    position: fixed;
    left: 0;
    top: 0;
    height: 100vh;
    padding: 20px 10px;
    background-color: #8ac344;
    display: flex;
    align-items: center;
    flex-direction: column;
  }

  .c-navbar__content {
    height: 100%;
    padding-bottom: 10vh;
    display: flex;
    align-items: flex-start;
    flex-direction: column;
    justify-content: space-between;
  }

  .c-navbar__routes {
    display: flex;
    align-items: flex-start;
    flex-direction: column;
  }

  .c-navbar__link {
    padding: 4px;
    font-size: 20px;
    font-weight: 600;
    display: block;
    color: #ffffff;
    text-decoration: none;
    transition: all 0.2s ease-in-out;
    margin-bottom: 10px;
  }

  .c-navbar__info div {
    text-align: start;
    margin-bottom: 10px;
    font-size: 18px;
    font-weight: 600;
    color: #ffffff;
    width: 150px;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
  }

  .log-out-button {
    border: none;
    background-color: #ffffff;
    color: #8ac344;
    border-radius: 4px;
    width: 100%;
    font-weight: 600;
    font-size: 20px;
    cursor: pointer;
    text-align: start;
  }

  @media (max-width: 650px) {
    
  }
</style>
