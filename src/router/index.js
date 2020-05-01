import Vue from "vue";
import VueRouter from "vue-router";
import login from "../components/Login.vue";

import admTemplate from "../components/Admin.vue";
import dashboard from "../components/Dashboard.vue"
import members from "../components/membros/Membros.vue";
import reuniao from "../components/reuniao/Reuniao.vue";
import eventos from "../components/eventos/Eventos.vue";
import calendario from "../components/calendario/Calendario.vue";
import membershipCriteria from "../components/membershipCriteria/MembershipCriteria.vue";
import perfil from "../components/Perfil.vue"
import officeHours from "../components/officeHours/OfficeHours.vue"

import memberTemplate from "../components/Member.vue";

Vue.use(VueRouter);

const routes = [
  
  { path: "*", redirect: "/login" },
  { path: "/", redirect: "/login" },
  { path: "/login", name: "login", component: login },

  {
    path: "/adm",
    name: "admTemplate",
    component: admTemplate,
    children: [
      { path: "/adm/dashboard", name: "dashboard", component: dashboard },
      { path: "/adm/membros", name: "members", component: members },
      { path: "/adm/reuniao", name: "reuniao", component: reuniao },
      { path: "/adm/eventos", name: "eventos", component: eventos },
      { path: "/adm/calendario", name: "calendario", component: calendario },
      { path: "/adm/perfil", name: "perfil", component: perfil },
      { path: "/adm/officeHours", name: "officeHours", component: officeHours},
      { path: "/adm/membresia", name: "membershipCriteria", component: membershipCriteria}
    ]
  },

  {
    path: "/member",
    name: "memberTemplate",
    component: memberTemplate,
    children: [
      { path: "/member/perfil", name: "perfil", component:  perfil}
    ]
  }
];

const router = new VueRouter({
  mode: 'history',
  routes
});

export default router;
