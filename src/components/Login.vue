<template lang="html">

  <section class="src-components-login">
    <div class="form-wrapper">
      <div class="form-wrapper__text">
        <h1>Pastillero</h1>
        <h4>Un producto de Farmacias Central Oeste</h4>
      </div>
      <form @submit.prevent="pressed">
        <input type="email" placeholder="Email" v-model="email">
        <input type="password" placeholder="Contraseña" v-model="password">
        <p v-if="error !== ''">El usuario o la contraseña son incorrectos</p>
        <button :disabled="email === '' || password === ''" type="submit">Iniciar sesión</button>
      </form>
    </div>
  </section>

</template>

<script lang="js">
  import * as firebase from 'firebase/app';
  import 'firebase/auth';

  export default  {
    name: 'src-components-login',
    props: [],
    mounted () {

    },
    data () {
      return {
        email: '',
        password: '',
        error: ''
      }
    },
    methods: {
      async pressed() {
        try {
          await firebase.auth().signInWithEmailAndPassword(this.email, this.password);
          this.$router.push('/');
        } catch (error) {
          console.log(error);
          this.error = error.message;
        }
      }
    },
    computed: {

    }
}


</script>

<style scoped lang="css">
  .src-components-login {
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .form-wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    max-width: 600px;
    box-shadow: 4px 2px 8px rgba(0, 0, 0, 0.25);
    border-radius: 4px;
    padding: 40px;
    height: 50%;
  }

  .form-wrapper__text {
    margin-bottom: 40px;
  }

  form {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
  }

  form input {
    width: 100%;
    padding: 10px;
    border-radius: 4px;
    border: 1px solid #ccc;
    margin-bottom: 20px;
    font-size: 24px;
  }

  form button {
    width: 100%;
    padding: 10px;
    border-radius: 4px;
    border: 1px solid #ccc;
    background-color: #8ac344;
    color: #ffffff;
    font-size: 24px;
  }

  form button:disabled {
    background-color: #ccc;
    opacity: 0.8;
    cursor: not-allowed;
  }

  p {
    width: 100%;
    background-color: #ff4949;
    color: #ffffff;
    font-weight: 600;
    padding: 8px;
    border-radius: 4px;
    margin-top: 10px;
    font-size: 18px;
  }
</style>
