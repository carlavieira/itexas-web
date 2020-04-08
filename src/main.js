import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import vuetify from "./plugins/vuetify";
import VueResource from "vue-resource";
import axios from "axios"

Vue.use(VueResource);

Vue.prototype.$api = axios.create({
  baseURL: 'http://itexas.pythonanywhere.com/',
  headers: {
    Authorization: `JWT ${localStorage.getItem("access_token")}`  
  }
})

new Vue({
  router,
  vuetify,
  VueResource,
  render: (h) => h(App),
}).$mount("#app");


