import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import vuetify from "./plugins/vuetify";
import VueResource from "vue-resource";
import DisableAutocomplete from "vue-disable-autocomplete";

Vue.use(DisableAutocomplete);
Vue.config.productionTip = false;
Vue.use(VueResource);

new Vue({
  router,
  vuetify,
  VueResource,
  render: (h) => h(App),
}).$mount("#app");
