<template>
  <v-container>
    <v-row class="px-4">
      <h2>Eventos</h2>
      <v-spacer></v-spacer>
      <v-btn
        @click="btnEvento = true"
        title="Marcar Evento"
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
              style="max-width: 300px;"
              v-model="search"
              append-icon="mdi-magnify"
              label="Pesquisar"
              single-line
              hide-details
            ></v-text-field>
          </v-card-title>
          <v-data-table
            no-data-text="Nenhum evento cadastrado"
            no-results-text="Nenhum evento encontrado"
            :headers="headersEvento"
            :items="eventos"
            :search="search"
          ></v-data-table>
        </v-card>
      </v-flex>
    </v-row>
    <NovoEvento :show="btnEvento" @close="btnEvento = false"></NovoEvento>
  </v-container>
</template>

<script>
import NovoEvento from "./CadastrarEvento.vue";
import eventController from "../../controllers/EventController";
/* Ajeitar futuramente para os imports irem no main.js */
import axios from "axios";
import Vue from "vue";

Vue.prototype.$http = axios;

export default {
  components: {
    NovoEvento,
  },

  async created() {
    let res = await this.eventController.getAllEvents(axios);
    this.eventos = res.data;
  },

  data() {
    return {
      btnEvento: false,
      search: "",
      eventController,
      headersEvento: [
        {
          text: "Nome",
          align: "start",
          value: "type",
        },
        { text: "Lider", value: "member" },
        { text: "Data", value: "date" },
        { text: "Hora", value: "time" },
      ],
      eventos: [],
    };
  },
};
</script>
