import Vue from "vue";
import VueRouter from "vue-router";
import login from "../components/Login.vue";

import admTemplate from "../components/Admin.vue";
import dashboard from "../components/Dashboard.vue";
import members from "../components/membros/Membros.vue";
import reuniao from "../components/reuniao/Reuniao.vue";
import eventos from "../components/eventos/Eventos.vue";
import calendario from "../components/calendario/Calendario.vue";
import membershipCriteriaAll from "../components/membershipCriteria/MembershipCriteriaAll.vue";
import membershipCriteriaMember from "../components/membershipCriteria/MembershipCriteriaMember.vue";
import perfil from "../components/Perfil.vue";
import officeHours from "../components/officeHours/OfficeHours.vue";
import officeHoursAdm from "../components/officeHours/OfficeHoursAdm.vue"

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
      {
        path: "/adm/minhas-reunioes",
        name: "minhas-reunioes",
        component: reuniao,
      },
      { path: "/adm/eventos", name: "eventos", component: eventos },
      { path: "/adm/meus-eventos", name: "meus-eventos", component: eventos },
      { path: "/adm/calendario", name: "calendario", component: calendario },
      { path: "/adm/perfil", name: "perfil", component: perfil },
      { path: "/adm/officeHours", name: "officeHours", component: officeHours },
      {
        path: "/adm/membresia",
        name: "membershipCriteriaAll",
        component: membershipCriteriaAll,
      },
      {
        path: "/adm/meu-criterio",
        name: "membershipCriteriaAdm",
        component: membershipCriteriaMember
      },
      {
        path: "/adm/officeHoursAdm",
        name: "officeHoursAdm",
        component: officeHoursAdm
      }
    ],
  },

  {
    path: "/member",
    name: "memberTemplate",
    component: memberTemplate,
    children: [
      { path: "/member/contactList", name: "contactList", component: members },
      { path: "/member/dashboard", name: "dashboard", component: dashboard },
      { path: "/member/perfil", name: "perfil", component: perfil },
      { path: "/member/calendario", name: "calendario", component: calendario },
      {
        path: "/member/meu-criterio",
        name: "membershipCriteriaUser",
        component: membershipCriteriaMember
      },
      { path: "/member/officeHour", name: "officeHours", component: officeHours },
      {
        path: "/member/minhas-reunioes",
        name: "minhas-reunioes",
        component: reuniao,
      },
      {
        path: "/member/meus-eventos",
        name: "meus-eventos",
        component: eventos,
      },
    ],
  },
];

const router = new VueRouter({
  mode: "history",
  routes,
});

export default router;
