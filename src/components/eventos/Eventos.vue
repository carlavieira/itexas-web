<template>
  <v-container>
    <v-snackbar top v-model="snackbar" :color="color" :timeout="timeout">{{
      text
    }}</v-snackbar>
    <v-row class="px-4">
      <h2 v-if="$route.name == 'eventosAdm'">Eventos</h2>
      <h2 v-else>Meus Eventos</h2>
      <v-spacer></v-spacer>
      <v-btn
        v-if="$route.name == 'eventosAdm'"
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
            <v-spacer></v-spacer>
            <download-excel
              :fields="json_fields"
              :data="eventos"
              name="Eventos.xls"
            >
              <v-btn icon>
                <v-icon>mdi-file-excel</v-icon>
              </v-btn>
            </download-excel>
          </v-card-title>

          <v-data-table
            no-data-text="Nenhum evento cadastrado"
            no-results-text="Nenhum evento encontrado"
            :headers="getHeaders()"
            :items="eventos"
            :search="search"
            :sort-by="['date', 'time']"
            :sort-desc="[true, true]"
            @click:row="eventShow"
            class="dataTable"
            :loading="showBar"
            loading-text="Carregando..."
          >
            <template v-slot:item.type="{ item }">
              <span> {{ formatTypeEvent(item.type) }} </span>
            </template>
            <template v-slot:item.member="{ item }">
              <span> {{ item.member.first_name }} </span>
            </template>
            <template v-slot:item.date="{ item }">
              <span>{{ formatDate(item.date) }}</span>
            </template>
            <template v-slot:item.time="{ item }">
              <span>{{ formatTime(item.time) }}</span>
            </template>
            <template v-slot:item.engagement="{ item }">
              <span>{{ formatPercentage(item.engagement) }}</span>
            </template>
            <template v-slot:item.attendance="{ item }">
              <v-icon small v-if="item.attendance" class="success--text"
                >mdi-brightness-1</v-icon
              >
              <v-icon small v-else class="error--text">mdi-brightness-1</v-icon>
            </template>
          </v-data-table>
        </v-card>
      </v-flex>
    </v-row>
    <NovoEvento
      :show="btnEvento"
      @close="
        btnEvento = false;
        forceRerender();
      "
      v-on:showSnackbar="showSnackbar"
      @getAllEvents="getEvents()"
      :key="componentKey"
    >
    </NovoEvento>
    <modalDetail
      v-if="showDetail"
      :show="showDetail"
      @close="showDetail = false"
      @close2="
        (showDetail = false),
          showSnackbar({
            text: 'Presença Alterada com sucesso',
            color: 'success',
          })
      "
      :event="eventDetail"
      v-on:showSnackbar="showSnackbar"
      @getAllEvents="getEvents()"
    >
    </modalDetail>
  </v-container>
</template>

<script>
import NovoEvento from "./CadastrarEvento.vue";
import participationController from "../../controllers/ParticipationController";
import eventController from "../../controllers/EventController";
import modalDetail from "./ModalDetail.vue";
import moment from "moment";

export default {
  components: {
    NovoEvento,
    modalDetail,
  },

  async created() {
    let res = this.getEvents();
    this.eventos = res.data;
  },

  data() {
    return {
      btnEvento: false,
      showBar: true,
      search: "",
      eventController,
      participationController,
      eventDetail: null,
      showDetail: false,
      snackbar: false,
      text: "",
      timeout: 3000,
      color: "",
      eventos: [],
      userID: null,
      componentKey: 0,
      json_fields: {
        Responsável: {
          callback: (value) => {
            return `${value.member.first_name} ${value.member.last_name}`;
          },
        },
        Cargo: "member.post.abbreviation",
        Area: "member.department.abbreviation",
        Tipo: "type",
        Data: "date",
        Hora: "time",
        "% Presença": "engagement",
      },
    };
  },
  methods: {
    formatDate(date) {
      return moment(date).format("DD/MM/YYYY");
    },
    forceRerender() {
      this.componentKey += 1;
    },
    formatTime(time) {
      let hora = time.split(":");
      return `${hora[0]}:${hora[1]}`;
    },
    formatPercentage(item) {
      if (item > 100) {
        return 100 + " %";
      } else return item + " %";
    },
    eventShow(event) {
      this.eventDetail = event;
      this.showDetail = true;
    },
    showSnackbar(snackbarDetails) {
      this.snackbar = true;
      this.text = snackbarDetails.text;
      this.color = snackbarDetails.color;
    },
    getHeaders() {
      if (this.$route.name == "eventosAdm") {
        return [
          {
            text: "Nome",
            align: "center",
            value: "type",
          },
          { text: "Responsável", value: "member", align: "center" },
          { text: "Data", value: "date", align: "center" },
          { text: "Hora", value: "time", align: "center" },
          { text: "% de Presença", value: "engagement", align: "center" },
        ];
      } else {
        return [
          {
            text: "Nome",
            align: "center",
            value: "type",
          },
          { text: "Responsável", value: "member", align: "center" },
          { text: "Data", value: "date", align: "center" },
          { text: "Hora", value: "time", align: "center" },
          { text: "Presença", value: "attendance", align: "center" },
        ];
      }
    },
    async getEvents() {
      this.eventos = [];
      if (this.$route.name == "eventosAdm") {
        const res = await this.eventController.getAllEvents(this.$api);
        this.eventos = res.data;
      } else if (this.$route.name == "meus-eventos") {
        const memberID = localStorage.getItem("user_id");
        const minhasParticipacoes = await this.participationController.getMemberParticipationEvent(
          this.$api,
          memberID
        );
        const meusEventos = [];
        minhasParticipacoes.forEach((participacao) => {
          participacao.event.participacaoID = participacao.id;
          participacao.event.attendance = participacao.attendance;
          meusEventos.push(participacao.event);
        });
        this.eventos = meusEventos;
      }
      this.showBar = false;
    },
    async deleteEvent() {
      await this.eventController.deleteEvent(this.$api, this.event);
    },
    formatTypeEvent(sigla) {
      if (sigla == "RG") return "Reunião Geral";
      else if (sigla == "AS") return "Assembléia";
      else if (sigla == "CF") return "Conferência";
      else if (sigla == "OU") return "Outros";
    },
  },
};
</script>
<style scoped>
.dataTable:hover {
  cursor: pointer;
}
</style>
