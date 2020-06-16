import Vue from "vue";
import Router from "vue-router";
// @ts-ignore
import Home from "../views/Home.vue";
// @ts-ignore
// @ts-ignore
import Bug from "../views/Bug.vue";
import { authGuard } from "@bcwdev/auth0-vue";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      name: "home",
      component: Home,
    },
    {
      path: "/:bugId",
      name: "bug",
      component: Bug,
    },
    {
      path: "*",
      redirect: "/",
    },
  ],
});
