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
            <template v-slot:item.member="{ item }">
              <span> {{ item.member.first_name }} </span>
            </template>
            <template v-slot:item.date="{ item }">
              <span>{{ formatDate(item.date) }}</span>
            </template>
            <template v-slot:item.time="{ item }">
              <span>{{ formatTime(item.time) }}</span>
            </template>
            <template v-slot:item.details="{ item }">
              <v-icon small @click="eventShow(item)"
                >mdi-dots-horizontal</v-icon
              >
            </template>
          </v-data-table>
        </v-card>
      </v-flex>
    </v-row>
    <NovoEvento :show="btnEvento" @close="btnEvento = false"></NovoEvento>
    <modalDetail
      v-if="showDetail"
      :show="showDetail"
      @close="showDetail = false"
      :event="eventDetail"
    >
    </modalDetail>
  </v-container>
</template>

<script>
import NovoEvento from "./CadastrarEvento.vue";
import eventController from "../../controllers/EventController";
import modalDetail from "./ModalDetail.vue";
import moment from "moment";

export default {
  components: {
    NovoEvento,
    modalDetail,
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
      eventDetail: null,
      showDetail: false,
      headersEvento: [
        {
          text: "Nome",
          align: "center",
          value: "type",
        },
        { text: "Lider", value: "member", align: "center" },
        { text: "Data", value: "date", align: "center" },
        { text: "Hora", value: "time", align: "center" },
        { text: "Detalhes", value: "details", align: "center" },
      ],
      eventos: [],
    };
  },
  methods: {
    formatDate(date) {
      return moment(date).format("DD/MM/YYYY");
    },
    formatTime(time) {
      let hora = time.split(":");
      return `${hora[0]}:${hora[1]}`;
    },
    eventShow(event) {
      this.eventDetail = event;
      console.log(this.eventDetail);
      this.showDetail = true;
    },
  },
};
</script>
