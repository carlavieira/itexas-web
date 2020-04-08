<template>
  <v-dialog max-width="800px" persistent v-model="show">
    <v-card class="pa-5">
      <v-layout row class="px-3">
        <v-btn v-if="!editMember" color="black" @click="editMember = true" title="Editar">
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
          <img src="https://cdn.vuetifyjs.com/images/john.jpg" alt="John" />
          <v-btn class="float" v-if="editMember">
            <v-icon>mdi-camera</v-icon>
          </v-btn>
        </v-avatar>
        <span
          v-if="!editMember"
          class="title font-weight-medium mt-3"
        >{{ member.first_name }} {{ member.last_name }}</span>
        <span v-if="!editMember" class="subheading font-weight-regular">( {{ member.nickname }} )</span>
        <v-layout row mt-3 justify-space-around style="width:100%">
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
              hide-details
            ></v-text-field>
          </v-layout>
          <v-layout justify-left col-xs-12 col-sm-6>
            <v-text-field
              outlined
              prepend-inner-icon="mdi-border-none-variant"
              v-model="member.area"
              :disabled="!editMember"
              hide-details
            ></v-text-field>
          </v-layout>
          <v-layout justify-left col-xs-12 col-sm-6>
            <v-text-field
              outlined
              prepend-inner-icon="mdi-account-star"
              v-model="member.leader"
              :disabled="!editMember"
              hide-details
            ></v-text-field>
          </v-layout>
        </v-layout>
        <v-layout row align-center v-if="editMember">
          <v-btn class="ma-2" @click="sendEdit()" depressed color="success">Salvar</v-btn>
        </v-layout>
      </v-layout>
    </v-card>
  </v-dialog>
</template>

<script>
import moment from "moment";

export default {
  created() {
    this.formatDate();
  },

  props: {
    show: Boolean,
    member: Object
  },

  data() {
    return {
      data: null,
      editMember: false
    };
  },

  methods: {
    formatDate() {
      this.data = moment(this.member.date_joined).format("DD/MM/YYYY");
    },
    sendEdit(){

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