import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import vuetify from "./plugins/vuetify";
import VueResource from "vue-resource";

Vue.config.productionTip = false;
Vue.use(VueResource);
Vue.http.interceptors.push(function(request, next) {
  request.headers.set("Content-Type", "application/json");
  request.headers.set("Access-Control-Allow-Origin", "*");
  request.headers.set(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  request.headers.set(
    "Access-Control-Allow-Methods",
    "POST, GET, PUT, DELETE, OPTIONS"
  );
  request.headers.set(
    "X-CSRF-Token",
    document.getElementsByName("csrf-token")[0].content
  );
  next();
});

new Vue({
  router,
  vuetify,
  VueResource,
  render: h => h(App)
}).$mount("#app");
