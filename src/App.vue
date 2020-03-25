<template>
  <v-app>
    <v-content>
      <router-view></router-view>
    </v-content>
  </v-app>
</template>

<script>
import routes from './router/index';
  export default {
    name: 'App',

    data () {
      return {
        routes
      }
    },
  }
</script>

