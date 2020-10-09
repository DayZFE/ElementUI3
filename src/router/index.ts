import { createRouter, createWebHashHistory } from "vue-router";
import Home from "../view/home";
export default createRouter({
  history: createWebHashHistory(""),
  routes: [
    {
      path: "/home",
      component: Home,
    },
  ],
});
