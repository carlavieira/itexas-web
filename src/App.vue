<template>
  <v-app>
    <v-content>
      <router-view></router-view>
    </v-content>
  </v-app>
</template>

<script>
import routes from "./router/index";

export default {
  name: "App",

  data() {
    return {
      routes,
    };
  },
};
</script>

<style>
::-webkit-scrollbar {
  width: 5px;
}

/* Track */
::-webkit-scrollbar-track {
  background: #fbf9fc;
}

/* Handle */
::-webkit-scrollbar-thumb {
  background: #555;
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: #ff3535;
}

.theme--light.v-data-table thead tr th :not(.headerTable) {
  color: rgba(0, 0, 0, 0.96) !important;
  font-size: 14px !important;
}

.v-data-table td {
  height: 38px !important;
}

th .v-data-table__checkbox {
  display: none;
}

.selectAddMember .v-text-field__details {
  display: none;
}
</style>
