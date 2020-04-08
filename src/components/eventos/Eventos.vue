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
          >
            <template v-slot:item.date="{ item }">
              <span>{{ formatDate(item.date) }}</span>
            </template>
            <template v-slot:item.time="{ item }">
              <span>{{ formatTime(item.time) }}</span>
            </template>
          </v-data-table>
        </v-card>
      </v-flex>
    </v-row>
    <NovoEvento :show="btnEvento" @close="btnEvento = false"></NovoEvento>
  </v-container>
</template>

<script>
import NovoEvento from "./CadastrarEvento.vue";
import eventController from "../../controllers/EventController";
import moment from "moment";

export default {
  components: {
    NovoEvento,
  },

  async created() {
    let res = await this.eventController.getAllEvents(this.$api);
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
          align: "center",
          value: "type",
        },
        { text: "Lider", value: "member" },
        { text: "Data", value: "date" },
        { text: "Hora", value: "time" },
      ],
      eventos: [],
    };
  },
  methods: {
    formatDate(date) {
      return moment(date).format("DD/MM/YYYY");
    },
    formatTime(timestamp) {
      const date = new Date(timestamp);
      date.setHours(date.getHours() + 3);
      let hour = date.getHours();
      hour = (hour < 10 ? "0" : "") + hour;
      let minutes = date.getMinutes();
      minutes = (minutes < 10 ? "0" : "") + minutes;

      return `${hour}:${minutes}`;
    },
  },
};
</script>
