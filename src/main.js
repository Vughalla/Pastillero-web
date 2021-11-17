import Vue from 'vue'
import App from './App.vue'
import { firestorePlugin } from 'vuefire';
import * as firebase from 'firebase/app';
import 'firebase/auth';

import 'jquery';
import 'popper.js';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';

Vue.use(firestorePlugin);

Vue.config.productionTip = false

Vue.config.productionTip = false;
Vue.prototype.$axios = axios;

import { router } from './router';
import './form'

let app;

firebase.auth().onAuthStateChanged(() => {
  if(!app) {
    new Vue({
      router,
      render: h => h(App)
    }).$mount('#app')
  }
});
