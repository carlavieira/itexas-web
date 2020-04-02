import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import vuetify from "./plugins/vuetify";
import VueResource from "vue-resource";
//import axios from "axios";

Vue.config.productionTip = false;
//Vue.prototype.$http = axios;
Vue.use(VueResource);

// Vue.http.headers.common['Authorization'] = ``

new Vue({
  router,
  vuetify,
  VueResource,
  render: h => h(App)
}).$mount("#app");
