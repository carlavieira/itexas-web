import Vue from 'vue'
import VueRouter from 'vue-router'
import login from "../components/Login.vue"
import app from '../components/Aplicativo.vue'

Vue.use(VueRouter)

const routes = [
  { path: '*', redirect: '/login' },
  { path: '/', redirect: '/login' },
  { path:"/login", name:"login", component: login },
  { path:"/aplicativo", name:"app", component: app}
]

const router = new VueRouter({
  routes
})

export default router
