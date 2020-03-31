import Vue from "vue";
import VueRouter from "vue-router";
import login from "../components/Login.vue";
import app from "../components/Aplicativo.vue";
import cadastrarMembro from "../components/CadastrarMembro.vue";

Vue.use(VueRouter);

const routes = [
  { path: "*", redirect: "/login" },
  { path: "/", redirect: "/login" },
  { path: "/login", name: "login", component: app },
  { path: "/aplicativo", name: "app", component: login },
  { path: "/cadastrar-membro", name: "register-member", component: cadastrarMembro }
];

const router = new VueRouter({
  routes
});

export default router;
