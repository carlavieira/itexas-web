import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import vuetify from "./plugins/vuetify";
import VueResource from "vue-resource";
import VueTheMask from 'vue-the-mask';

Vue.config.productionTip = false;
Vue.use(VueResource);
Vue.use(VueTheMask);

new Vue({
  router,
  vuetify,
  VueResource,
  render: h => h(App)
}).$mount("#app");
