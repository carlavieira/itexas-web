import Vue from "vue";
import VueRouter from "vue-router";
import login from "../components/Login.vue";
import app from "../components/Aplicativo.vue";
import members from "../components/membros/Membros.vue";
import reuniao from "../components/reuniao/Reuniao.vue";
import eventos from "../components/eventos/Eventos.vue"

Vue.use(VueRouter);

const routes = [
  { path: "*", redirect: "/login" },
  { path: "/", redirect: "/login" },
  { path: "/login", name: "login", component: login },
  {
    path: "/aplicativo", name: "app", component: app, children: [
      { path: "/aplicativo/membros", name: "members", component: members },
      { path: "/aplicativo/reuniao", name: "reuniao", component: reuniao },
      { path: "/aplicativo/eventos", name: "eventos", component: eventos }
    ]
  }
];

const router = new VueRouter({
  routes
});

export default router;
