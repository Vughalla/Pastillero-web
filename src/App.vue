<template>
  <div id="app">
    <NavBar />
    <router-view></router-view>
  </div>
</template>

<script>
import NavBar from './components/NavBar.vue';

export default {
  name: 'App',
  data() {
    return {
      userEmail: '',
    }
  },
  mounted() {
    this.login = false;
  },
  components: {
    NavBar
  },
  methods: {
    
  },
  computed: {
  }
}
</script>

<style>
  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    padding: 20px;
    padding-left: calc(175px + 20px);
    min-height: 100vh;
  }

  body {
    max-width: 1800px;
    width: 100%;
    margin: 0 auto !important;
  }
</style>
