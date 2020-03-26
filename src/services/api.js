import Vue from "vue";
import VueResource from "vue-resource";

Vue.use(VueResource);

new Vue({
  http: {
    root: "/root",
    headers: {
      Authorization: "Basic YXBpOnBhc3N3b3Jk"
    }
  }
});
