<template>
  <div>
    <v-app-bar dark color="primary" class="px-2 hidden-lg-and-up" style="max-height: 56px;">
      <v-app-bar-nav-icon color="tertiary" @click="drawer = !drawer"></v-app-bar-nav-icon>
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
          <v-img max-width="75px" class="mx-auto" src="../assets/branco.png"></v-img>
        </v-list-item-content>
      </v-list-item>
      <v-divider></v-divider>
      <v-list nav dense dark class="tertiary--text px-7 pt-6 py-4">
        <v-list-item link @click="makeCheck()">
          <v-list-item-icon>
            <v-icon>mdi-alarm-check</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>Check-in / Check-out</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item class="radius" v-for="item in items" :key="item.text" router :to="item.path">
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

    <div class="pa-3" style="background-color: #f1f1f1; min-height: 100vh">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import authController from "../controllers/AuthController";
import officeHoursController from "../controllers/OfficeHoursController";

export default {
  data() {
    return {
      authController,
      items: [
        {
          text: "Dashboard",
          icon: "mdi-view-dashboard-outline",
          path: "/member/dashboard"
        },
        {
          text: "Perfil",
          icon: "mdi-account-circle",
          path: "/member/perfil"
        },
        {
          text: "Minhas Office Hours",
          icon: "mdi-clipboard-text-multiple",
          path: "/member/officeHours"
        },
        {
          text: "Minhas Reuniões",
          icon: "mdi-account-multiple",
          path: "/member/minhas-reunioes"
        },
        {
          text: "Meus Eventos",
          icon: "mdi-account-group",
          path: "/member/meus-eventos"
        },
        {
          text: "Meu Critério",
          icon: "mdi-clipboard-text-multiple",
          path: "/member/meu-criterio"
        },
        {
          text: "Meus Liderados",
          icon: "mdi-clipboard-text-multiple",
          path: "/member/meus-liderados",
        },
        {
          text: "Calendário",
          icon: "mdi-calendar-month",
          path: "/member/calendario"
        },
        {
          text: "Contact List",
          icon: "mdi-account",
          path: "/member/contactList"
        },
      ],
      drawer: true,
      officeHoursController,
      officeHours: [],
      check: ""
    };
  },

  methods: {
    logout() {
      this.authController
        .logout(this.$http)
        .then(res => {
          console.log(res);
        })
        .catch(e => {
          console.log(e);
        });
    },

    async changeStatus() {
      this.check = "Check-in";
      await this.officeHoursController.getOfficeHours(this.$api).then(res => {
        this.officeHours = res.data;
        this.officeHours.forEach(oh => {
          if (!oh.checkout_time) {
            this.check = "Check-out";
          }
        });
      });
    },

    async makeCheck() {
      let checkOut = false;
      await this.officeHoursController
        .getOfficeHours(this.$api)
        .then(res => {
          this.officeHours = res.data;
          this.officeHours.forEach(oh => {
            if (!oh.checkout_time) {
              oh.checkout_time = new Date();
              this.updateOfficeHour(oh);
              checkOut = true;
            }
          });

          if (!checkOut) {
            let oh = {};
            oh.date = new Date().toISOString().split("T")[0];
            oh.checkin_time = new Date();
            this.createOfficeHour(oh);
          }
        })
        .catch(err => {
          console.log(err);
        });
    },

    async createOfficeHour(oh) {
      await officeHoursController
        .createOfficeHour(this.$api, oh)
        .then(res => {
          console.log(res);
          alert("Check-in realizado!");
          this.check="Check-out"
        })
        .catch(err => {
          console.log(err);
        });
    },

    async updateOfficeHour(oh) {
      await officeHoursController
        .editOfficeHour(this.$api, oh)
        .then(res => {
          console.log(res);
          alert("Check-out realizado!");
          this.check="Check-in"
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
};
</script>

<style scoped>
.radius {
  border-radius: 6px !important;
}
</style>
