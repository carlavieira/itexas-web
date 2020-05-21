import Vue from "vue";
import VueRouter from "vue-router";
import login from "../components/Login.vue";

import menu from "../components/Menu.vue";
import dashboard from "../components/Dashboard.vue";
import members from "../components/membros/Membros.vue";
import reuniao from "../components/reuniao/Reuniao.vue";
import eventos from "../components/eventos/Eventos.vue";
import calendario from "../components/calendario/Calendario.vue";
import membershipCriteriaAll from "../components/membershipCriteria/MembershipCriteriaAll.vue";
import membershipCriteriaMember from "../components/membershipCriteria/MembershipCriteriaMember.vue";
import membershipCriteriaLed from "../components/membershipCriteria/MembershipCriteriaLed.vue";
import perfil from "../components/Perfil.vue";
import officeHours from "../components/officeHours/OfficeHours.vue";
import officeHoursAdm from "../components/officeHours/OfficeHoursAdm.vue";
import cargos from "../components/cargos/Cargos.vue";
import areas from "../components/areas/Areas.vue";



Vue.use(VueRouter);

const routes = [
  { path: "*", redirect: "/login" },
  { path: "/", redirect: "/login" },
  { path: "/login", name: "login", component: login },

  {
    path: "/membro",
    name: "menu",
    component: menu,
    children: [
      { path: "/membro/dashboard", name: "dashboard", component: dashboard },
      {
        path: "/membro/minhas-reunioes",
        name: "minhas-reunioes",
        component: reuniao,
      },
      { path: "/membro/meus-eventos", name: "meus-eventos", component: eventos },
      { path: "/membro/calendario", name: "calendario", component: calendario },
      { path: "/membro/perfil", name: "perfil", component: perfil },
      { path: "/membro/officeHours", name: "officeHours", component: officeHours },
      {
        path: "/membro/meu-criterio",
        name: "membershipCriteriamembro",
        component: membershipCriteriaMember
      },
      {
        path: "/membro/meus-liderados",
        name: "membershipCriteriaLed",
        component: membershipCriteriaLed
      },
    ],
  },

  {
    path: "/adm",
    name: "menuAdm",
    component: menu,
    children: [
      { path: "/adm/membros", name: "membersAdm", component: members },
      { path: "/adm/officeHours", name: "officeHoursAdm", component: officeHoursAdm },
      { path: "/adm/reuniao", name: "reuniaoAdm", component: reuniao },
      { path: "/adm/eventos", name: "eventosAdm", component: eventos },
      {
        path: "/adm/membresia",
        name: "membershipCriteriaAdm",
        component: membershipCriteriaAll,
      },
      { path: "/adm/cargos", name: "cargosAdm", component: cargos },
      { path: "/adm/areas", name: "areasAdm", component: areas },
    ]
  }
]

const router = new VueRouter({
  mode: "history",
  routes,
});

export default router;
