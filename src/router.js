import Vue from 'vue';
import VueRouter from 'vue-router';

import Dashboard from './components/Dashboard.vue';
import Reports from './components/Reports.vue';
import Meds from './components/Meds.vue';
import Login from './components/Login.vue';

import * as firebase from 'firebase/app';
import 'firebase/auth';

Vue.use(VueRouter);

export const router = new VueRouter({
    mode: 'history',
    routes: [
        { path: '/', component: Dashboard, meta: { requiresAuth: true } },
        { path: '/dashboard', component: Dashboard, meta: { requiresAuth: true } },
        { path: '/reports', component: Reports, meta: { requiresAuth: true } },
        { path: '/meds', component: Meds, meta: { requiresAuth: true } },
        { path: '/login', component: Login }
    ]
});

router.beforeEach((to, from, next) => {
    const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
    const isAuthenticated = firebase.auth().currentUser;
    if(requiresAuth && !isAuthenticated) {
        next('/login');
    } else {
        next();
    }
});
