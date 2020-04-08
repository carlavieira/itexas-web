<template>
  <v-app>
    <v-content>
      <router-view></router-view>
    </v-content>
  </v-app>
</template>

<script>
import routes from './router/index';
import Vue from "vue";
import axios from "axios";

Vue.prototype.$http = axios;

  export default {
    name: 'App',

    data () {
      return {
        routes,
        axios
      }
    }
  }
</script>

