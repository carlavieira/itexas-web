<template>
  <v-dialog max-width="800px" persistent v-model="show">
    <v-card class="pa-5">
      <v-layout row class="px-3">
        <v-btn
          v-if="!editMember"
          color="black"
          @click="editMember = true"
          title="Editar"
        >
          <v-icon color="white">mdi-account-edit</v-icon>
        </v-btn>
        <v-btn color="red" class="ml-2" title="Excluir">
          <v-icon color="white">mdi-delete</v-icon>
        </v-btn>
        <v-spacer></v-spacer>
        <v-btn @click="$emit('close')" title="Fechar" icon>
          <v-icon color="grey">mdi-close</v-icon>
        </v-btn>
      </v-layout>
      <v-layout column mx-2 justify-center align-center>
        <v-avatar size="130px" class="avatar">
          <img src="https://i.imgur.com/EvaCfem.png" alt="avatar" />
          <v-btn class="float" v-if="editMember">
            <v-icon>mdi-camera</v-icon>
          </v-btn>
        </v-avatar>
        <span v-if="!editMember" class="title font-weight-medium mt-3"
          >{{ member.first_name }} {{ member.last_name }}</span
        >
        <span v-if="!editMember" class="subheading font-weight-regular"
          >( {{ member.nickname }} )</span
        >
        <v-layout row mt-3 justify-space-around style="width: 100%;">
          <v-layout justify-left col-xs-12 col-sm-6 v-if="editMember">
            <v-text-field
              label="Nome"
              outlined
              prepend-inner-icon="mdi-alpha-n"
              v-model="member.first_name"
              hide-details
            ></v-text-field>
          </v-layout>
          <v-layout justify-left col-xs-12 col-sm-6 v-if="editMember">
            <v-text-field
              label="Sobrenome"
              outlined
              prepend-inner-icon="mdi-alpha-s"
              v-model="member.last_name"
              hide-details
            ></v-text-field>
          </v-layout>
          <v-layout justify-left col-xs-12 col-sm-6>
            <v-text-field
              outlined
              prepend-inner-icon="mdi-email"
              v-model="member.email"
              :disabled="!editMember"
              hide-details
            ></v-text-field>
          </v-layout>
          <v-layout justify-left col-xs-12 col-sm-6>
            <v-text-field
              outlined
              prepend-inner-icon="mdi-slack"
              v-model="member.slack"
              :disabled="!editMember"
              hide-details
            ></v-text-field>
          </v-layout>
          <v-layout justify-left col-xs-12 col-sm-6>
            <v-text-field
              outlined
              prepend-inner-icon="mdi-phone"
              v-model="member.phone"
              :disabled="!editMember"
              hide-details
            ></v-text-field>
          </v-layout>
          <v-layout justify-left col-xs-12 col-sm-6>
            <v-text-field
              outlined
              prepend-inner-icon="mdi-briefcase"
              v-model="member.post"
              :disabled="!editMember"
              label="Cargo"
              hide-details
            ></v-text-field>
          </v-layout>
          <v-layout justify-left col-xs-12 col-sm-6>
            <v-text-field
              outlined
              prepend-inner-icon="mdi-border-none-variant"
              v-model="member.area"
              label="Area"
              :disabled="!editMember"
              hide-details
            ></v-text-field>
          </v-layout>
          <v-layout justify-left col-xs-12 col-sm-6>
            <v-text-field
              outlined
              prepend-inner-icon="mdi-account-star"
              label="Líder"
              v-model="member.leader"
              :disabled="!editMember"
              hide-details
            ></v-text-field>
          </v-layout>

          <v-layout justify-left col-xs-12 col-sm-6>
            <v-col cols="12" lg="6">
              <v-menu
                ref="menu1"
                v-model="menu1"
                :close-on-content-click="false"
                transition="scale-transition"
                offset-y
              >
                <template v-slot:activator="{ on }">
                  <v-text-field
                    v-model="dateFormatted"
                    label="Data de entrada na AIESEC"
                    persistent-hint
                    prepend-inner-icon="mdi-calendar"
                    v-on="on"
                    outlined
                    :disabled="!editMember"
                    hide-details
                  ></v-text-field>
                </template>
                <v-date-picker
                  v-model="date"
                  no-title
                  @input="menu1 = false"
                ></v-date-picker>
              </v-menu>
              <!--
              <p>
                Date in ISO format: <strong>{{ date }}</strong>
              </p>
              -->
            </v-col>
          </v-layout>
        </v-layout>

        <v-layout row align-center v-if="editMember">
          <v-btn class="ma-2" @click="sendEdit()" depressed color="success"
            >Salvar</v-btn
          >
        </v-layout>
      </v-layout>
    </v-card>
  </v-dialog>
</template>

<script></script>

<script>
import memberController from "../../controllers/MemberController";
export default {
  data: vm => ({
    date: new Date().toISOString().substr(0, 10),
    dateFormatted: vm.formatDate(new Date().toISOString().substr(0, 10)),
    menu1: false,
    menu2: false,
    editMember: false,
    memberController
  }),

  computed: {
    computedDateFormatted() {
      return this.formatDate(this.date);
    }
  },

  props: {
    show: Boolean,
    member: Object
  },

  watch: {
    date(val) {
      this.dateFormatted = this.formatDate(this.date);
    }
  },

  methods: {
    formatDate(date) {
      if (!date) return null;

      const [year, month, day] = date.split("-");
      return `${day}/${month}/${year}`;
    },
    parseDate(date) {
      if (!date) return null;

      const [month, day, year] = date.split("/");
      return `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;
    },
    async sendEdit() {
      delete this.member.post;
      delete this.member.department;
      delete this.member.leader;
      delete this.member.photo;

      console.log(this.member);

      await this.memberController
        .editMember(this.$api, this.member)
        .then(res => {
          console.log(res);
          this.member = {};
          this.$emit("close");
          this.$emit("getMembers");
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
};
</script>

<style scoped>
.avatar {
  position: relative;
}

.float {
  position: absolute;
  top: 55px;
}
</style>
