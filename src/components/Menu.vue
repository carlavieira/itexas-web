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

      <v-list-item
        style="text-align: center"
        link
        @click="$router.push('/membro/perfil')"
      >
        <v-list-item-content>
          <span v-if="member" class="px-3 white--text body-2">{{
            member.first_name
          }}</span>
          <span
            v-if="member.post && member.department"
            class="px-3 white--text body-2"
            >{{ member.post.abbreviation }} de
            {{ member.department.abbreviation }}</span
          >
        </v-list-item-content>
      </v-list-item>

      <v-divider></v-divider>

      <v-list nav dense dark class="radius tertiary--text px-4 pt-6 py-4">
        <v-list-item @click="makeCheck()">
          <v-list-item-icon>
            <v-icon>mdi-alarm-check</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>{{ check }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-group
          v-if="member.is_staff"
          prepend-icon="mdi-account"
          dark
          class="radius admin-item tertiary--text mb-1"
        >
          <template v-slot:activator>
            <v-list-item-title>Gerenciar</v-list-item-title>
          </template>
          <v-list-item
            class="admin-item"
            v-for="item in adm"
            :key="item.text"
            router
            :to="item.path"
            link
          >
            <v-list-item-icon>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>{{ item.text }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-group>

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

    <div class="pa-3" style="background-color: #f1f1f1; min-height: 100vh;">
      <v-snackbar top v-model="snackbar" :color="color" :timeout="timeout">{{
        text
      }}</v-snackbar>
      <router-view @reload="getMember()" :key="$route.fullPath"></router-view>
    </div>
  </div>
</template>

<script>
import authController from "../controllers/AuthController";
import officeHoursController from "../controllers/OfficeHoursController";
import memberController from "../controllers/MemberController";

export default {
  data() {
    return {
      authController,
      adm: [
        //Admin
        {
          text: "Membros",
          icon: "mdi-account",
          path: "/adm/membros",
          adminItem: true,
        },
        {
          text: "Office Hours",
          icon: "mdi-alarm-check",
          path: "/adm/officeHours",
          adminItem: true,
        },
        {
          text: "Reuniões",
          icon: "mdi-account-multiple",
          path: "/adm/reuniao",
          adminItem: true,
        },
        {
          text: "Eventos",
          icon: "mdi-account-group",
          path: "/adm/eventos",
          adminItem: true,
        },
        {
          text: "Critérios de Membresia",
          icon: "mdi-clipboard-text-multiple",
          path: "/adm/membresia",
          adminItem: true,
        },
        {
          text: "Áreas",
          icon: "mdi-account",
          path: "/adm/areas",
          adminItem: true,
        },
        {
          text: "Cargos",
          icon: "mdi-account",
          path: "/adm/cargos",
          adminItem: true,
        },
      ],

      items: [
        {
          text: "Dashboard",
          icon: "mdi-view-dashboard-outline",
          path: "/membro/dashboard",
        },
        {
          text: "Meu Perfil",
          icon: "mdi-account-circle",
          path: "/membro/perfil",
        },
        {
          text: "Contact List",
          icon: "mdi-account-details",
          path: "/membro/contact-list",
        },
        {
          text: "Minhas Office Hours",
          icon: "mdi-alarm-check",
          path: "/membro/officeHours",
        },
        {
          text: "Minhas Reuniões",
          icon: "mdi-account-multiple",
          path: "/membro/minhas-reunioes",
        },
        {
          text: "Meus Eventos",
          icon: "mdi-account-group",
          path: "/membro/meus-eventos",
        },
        {
          text: "Meu Critério",
          icon: "mdi-clipboard-text-multiple",
          path: "/membro/meu-criterio",
        },
        {
          text: "Meus Liderados",
          icon: "mdi-clipboard-text-multiple",
          path: "/membro/meus-liderados",
        },
        {
          text: "Calendário",
          icon: "mdi-calendar-month",
          path: "/membro/calendario",
        },
      ],

      drawer: true,
      officeHoursController,
      officeHours: [],
      check: "",
      snackbar: false,
      text: "",
      timeout: 3000,
      color: "",
      member: {},
      memberController,
    };
  },

  async created() {
    await this.getMember();
  },

  methods: {
    async getMember() {
      this.member = await this.memberController.getMemberById(
        this.$api,
        localStorage.getItem("user_id")
      );
      this.changeStatus();
    },

    setSnackbar(text, color) {
      this.text = text;
      this.color = color;
      this.snackbar = true;
    },

    logout() {
      this.authController
        .logout(this.$http)
        .then((res) => {
          console.log(res);
        })
        .catch((e) => {
          console.log(e);
        });
    },

    async changeStatus() {
      this.check = "Check-in";
      await this.officeHoursController.getOfficeHours(this.$api).then((res) => {
        this.officeHours = res.data;
        this.officeHours.forEach((oh) => {
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
        .then((res) => {
          this.officeHours = res.data;
          this.officeHours.forEach((oh) => {
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
        .catch((err) => {
          console.log(err);
        });
    },

    async createOfficeHour(oh) {
      await officeHoursController
        .createOfficeHour(this.$api, oh)
        .then((res) => {
          console.log(res);
          this.setSnackbar("Check-in realizado!", "success");
          this.check = "Check-out";
        })
        .catch((err) => {
          console.log(err);
        });
    },

    async updateOfficeHour(oh) {
      await officeHoursController
        .editOfficeHour(this.$api, oh)
        .then((res) => {
          console.log(res);
          this.setSnackbar("Check-out realizado!", "success");
          this.check = "Check-in";
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>

<style scoped>
.radius {
  border-radius: 6px !important;
}
.admin-item {
  background-color: #2f2f2f;
}
</style>
