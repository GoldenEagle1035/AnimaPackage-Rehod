import Vue from "vue";
import Router from "vue-router";
import Genesis from "./components/Genesis";

Vue.use(Router);

export default new Router({
  mode: "history",
  routes: [
    {
      name: "home",
      path: "/",
      component: Genesis
    }
  ],
});
