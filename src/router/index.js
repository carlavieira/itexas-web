import Vue from "vue";
import VueRouter from "vue-router";
import login from "../components/Login.vue";
import app from "../components/Admin.vue";
import members from "../components/membros/Membros.vue";
import reuniao from "../components/reuniao/Reuniao.vue";
import eventos from "../components/eventos/Eventos.vue";
import calendario from "../components/calendario/Calendario.vue";
import perfil from "../components/Perfil.vue"

Vue.use(VueRouter);

const routes = [
  { path: "*", redirect: "/login" },
  { path: "/", redirect: "/login" },
  { path: "/login", name: "login", component: login },
  {
    path: "/adm",
    name: "app",
    component: app,
    children: [
      { path: "/adm/membros", name: "members", component: members },
      { path: "/adm/reuniao", name: "reuniao", component: reuniao },
      { path: "/adm/eventos", name: "eventos", component: eventos },
      { path: "/adm/calendario", name: "calendario", component: calendario },
      { path: "/adm/perfil", name: "perfil", component: perfil }
    ]
  }
];

const router = new VueRouter({
  routes
});

export default router;
