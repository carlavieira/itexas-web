import Vue from "vue";
import VueRouter from "vue-router";
//import login from "../components/Login.vue";
import app from "../components/Aplicativo.vue";
import members from "../components/membros/Membros.vue";

Vue.use(VueRouter);

const routes = [
  { path: "*", redirect: "/login" },
  { path: "/", redirect: "/login" },
  { path: "/login", name: "login", component: app },
  {
    path: "/aplicativo", name: "app", component: app, children: [
      { path: "/aplicativo/membros", name: "members", component: members }
    ]
  }
];

const router = new VueRouter({
  routes
});

export default router;
