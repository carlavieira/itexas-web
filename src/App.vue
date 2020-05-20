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
    }
  }
</script>

<style>
::-webkit-scrollbar {
  width: 5px;
}

/* Track */
::-webkit-scrollbar-track {
  background: #FBF9FC;
}

/* Handle */
::-webkit-scrollbar-thumb {
  background:  #555;
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: #ff3535 ;
}
</style>

