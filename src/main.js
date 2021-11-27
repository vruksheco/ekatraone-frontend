
import Vue from 'vue'
import Vuex from 'vuex';
import App from './App.vue'
import router from './router/routes'
import store from './store/auth.module'
Vue.use(Vuex);

const router = new VueRouter({routes});

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})