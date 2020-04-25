<template>
  <div>
    <v-app-bar
      dark
      color="primary"
      class="px-2 hidden-lg-and-up"
      style="max-height: 56px;"
    >
      <v-app-bar-nav-icon
        color="tertiary"
        @click="drawer = !drawer"
      ></v-app-bar-nav-icon>
      <v-spacer></v-spacer>
      <v-toolbar-title class="pl-0">
        <v-img src="../assets/branco2.png" max-width="70px" />
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-app-bar-nav-icon color="primary"></v-app-bar-nav-icon>
    </v-app-bar>

    <v-navigation-drawer app color="primary" v-model="drawer">
      <v-list-item style="height: 170px;" class="pa-5">
        <v-list-item-content>
          <v-img
            max-width="75px"
            class="mx-auto"
            src="../assets/branco.png"
          ></v-img>
        </v-list-item-content>
      </v-list-item>
      <v-divider></v-divider>
      <v-list nav dense dark class="tertiary--text px-7 pt-6 py-4">
        <v-list-item
          class="radius"
          v-for="item in items"
          :key="item.text"
          router
          :to="item.path"
        >
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>{{ item.text }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item link @click="logout()">
          <v-list-item-icon>
            <v-icon>mdi-exit-to-app</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>Sair</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <div class="pa-3" style="background-color: #f1f1f1; height: 100vh;">
      <router-view> </router-view>
    </div>
  </div>
</template>

<script>
import authController from "../controllers/AuthController"

export default {
  data() {
    return {
      authController,
      items: [
        {
          text: "Dashboard",
          icon: "mdi-view-dashboard-outline",
          path: "/dashboard"
        },
        {
          text: "Office Hours",
          icon: "mdi-alarm-check",
          path: "/adm/officeHours"
        },
        {
          text: "Relatórios",
          icon: "mdi-clipboard-text-multiple",
          path: "/"
        },
        {
          text: "Membros",
          icon: "mdi-account",
          path: "/adm/membros"
        },
        {
          text: "Reuniões",
          icon: "mdi-account-multiple",
          path: "/adm/reuniao"
        },
        {
          text: "Eventos",
          icon: "mdi-account-group",
          path: "/adm/eventos"
        },
        {
          text: "Calendário",
          icon: "mdi-calendar-month",
          path: "/adm/calendario"
        },
        {
          text: "Perfil",
          icon: "mdi-account-circle",
          path: "/adm/perfil"
        },

      ],
      drawer: true
    };
  },

  methods:{
    logout(){
      this.authController.logout(this.$http)
      .then(res => {
        console.log(res)
      }).catch(e => {
        console.log(e)
      })
    }
  }
};
</script>

<style scoped>
.radius {
  border-radius: 6px !important;
}
</style>
