<template>
  <v-container>
    <v-row class="px-4">
      <h2>Reuniões</h2>
      <v-spacer></v-spacer>
      <v-btn
        @click="btnReuniao = true"
        title="Marcar Reunião"
        small
        color="secondary"
        fab
      >
        <v-icon>mdi-plus</v-icon>
      </v-btn>
    </v-row>
    <v-row class="px-4 pt-3">
      <v-flex>
        <v-card class="w-100">
          <v-card-title>
            <v-text-field
              style="max-width: 300px"
              v-model="search"
              append-icon="mdi-magnify"
              label="Pesquisar"
              single-line
              hide-details
            ></v-text-field>
          </v-card-title>
          <v-data-table
            no-data-text="Nenhuma reunião cadastrada"
            no-results-text="Nenhuma reunião encontrada"
            :headers="headersReuniao"
            :items="reunioes"
            :search="search"
          ></v-data-table>
        </v-card>
      </v-flex>
    </v-row>
    <NovaReuniao :show="btnReuniao" @close="btnReuniao = false"></NovaReuniao>
  </v-container>
</template>

<script>
import NovaReuniao from "./CadastrarReuniao.vue";
import meetingController from "../../controllers/MeetingController";
/* Ajeitar futuramente para os imports irem no main.js */
import axios from "axios";
import Vue from "vue";

Vue.prototype.$http = axios;

export default {
  components: {
    NovaReuniao
  },

  async created() {
    let res = await this.meetingController.getAllMeeting(axios);
    this.reunioes = res.data;
  },

  data() {
    return {
      btnReuniao: false,
      search: "",
      meetingController,
      headersReuniao: [
        {
          text: "Tipo",
          align: "start",
          value: "tipo"
        },
        { text: "Lider", value: "lider" },
        { text: "Data", value: "data" },
        { text: "Hora", value: "hora" }
      ],
      reunioes: [
        {
          tipo: "Reunião Geral",
          lider: "Marcos Antônio",
          data: "22/01/2020",
          hora: "20:30"
        },
        {
          tipo: "Reunião de Evento",
          lider: "Maria Luisa",
          data: "30/03/2020",
          hora: "19:00"
        },
        {
          tipo: "Reunião de Marketing",
          lider: "Marco Antônio",
          data: "27/03/2020",
          hora: "18:00"
        },
        {
          tipo: "Reunião de Team Leader",
          lider: "Murilo Costa",
          data: "26/02/2020",
          hora: "10:00"
        }
      ]
    };
  }
};
</script>
