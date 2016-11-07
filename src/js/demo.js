/**
 * Created by shenchangmin on 2016/10/18.
 */

import Vue from 'vue';
import VueRouter from 'vue-router';
import App from './App.vue';

Vue.use(VueRouter);


const app = new Vue({
    ...App
});
app.$mount('#app');