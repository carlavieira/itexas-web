import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import vuetify from "./plugins/vuetify";
import VueResource from "vue-resource";
import axios from "axios";
import VueTheMask from "vue-the-mask";

Vue.use(VueTheMask);
Vue.use(VueResource);
import JsonExcel from "vue-json-excel";

Vue.component("downloadExcel", JsonExcel);

Vue.prototype.$api = axios.create({
  baseURL: "https://itexas.herokuapp.com/",
  headers: {
    Authorization: `JWT ${localStorage.getItem("access_token")}`,
  },
});

new Vue({
  router,
  vuetify,
  VueResource,
  render: (h) => h(App),
}).$mount("#app");
