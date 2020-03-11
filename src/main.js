import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import "../styleguide.css"
import "../globals.css"
import Vuex from 'vuex';
import store from './vuex/store'

// Vue.config.productionTip = false;
Vue.config.productionTip = false;

Vue.use(Vuex);

new Vue({
  router,
  store,
  ...App
}).$mount("#app");