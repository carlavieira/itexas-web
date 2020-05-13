<template>
  <v-container>
    <v-snackbar v-model="snackbar" :color="color" :timeout="timeout">
      {{ text }}</v-snackbar
    >
    <v-row class="px-4">
      <h2>Reuniões</h2>
      <v-spacer></v-spacer>
      <v-btn
        v-if="$route.name == 'reuniao'"
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
              style="max-width: 300px;"
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
          >
            <template v-slot:item.type="{ item }">
              <span>{{ formatTypeMeeting(item.type) }}</span>
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
            <template v-slot:item.actions="{ item }">
              <v-icon small @click="meetingShow(item)"
                >mdi-dots-horizontal</v-icon
              >
            </template>
          </v-data-table>
        </v-card>
      </v-flex>
    </v-row>
    <NovaReuniao
      :show="btnReuniao"
      @close="btnReuniao = false"
      @getAllMeeting="getMeeting()"
      v-on:showSnackbar="showSnackbar"
    ></NovaReuniao>
    <modalDetail
      v-if="showDetail"
      :show="showDetail"
      :meeting="meetingDetail"
      @close="showDetail = false"
      v-on:showSnackbar="showSnackbar"
      @getAllMeeting="getMeeting()"
    >
    </modalDetail>
  </v-container>
</template>

<script>
import NovaReuniao from "./CadastrarReuniao.vue";
import meetingController from "../../controllers/MeetingController";
import participationController from "../../controllers/ParticipationController";
import modalDetail from "./ModalDetail.vue";
import moment from "moment";

export default {
  data() {
    return {
      btnReuniao: false,
      search: "",
      data: null,
      meetingController,
      participationController,
      meetingDetail: null,
      showDetail: false,
      leaders: {},
      snackbar: false,
      text: "",
      timeout: 3000,
      color: "",
      headersReuniao: [
        {
          text: "Tipo",
          align: "center",
          value: "type",
        },
        { text: "Líder", value: "member" },
        { text: "Data", value: "date" },
        { text: "Hora", value: "time" },
        {
          text: "Detalhes",
          value: "actions",
          sortable: false,
          align: "center",
        },
      ],
      reunioes: [],
      types: [
        { text: "REB", value: "REB" },
        { text: "Reunião de Área", value: "RA" },
        { text: "Reunião de Time", value: "RT" },
        { text: "Reunião de LR", value: "LR" },
        { text: "Reunião de Corner", value: "CN" },
      ],
    };
  },

  components: {
    NovaReuniao,
    modalDetail,
  },

  async created() {
    this.getMeeting();
  },

  methods: {
    formatDate(date) {
      return moment(date).format("DD/MM/YYYY");
    },
    formatTypeMeeting(sigla) {
      if (sigla == "REB") return "REB";
      else if (sigla == "RA") return "Reunião de Área";
      else if (sigla == "RT") return "Reunião de Time";
      else if (sigla == "LR") return "Reunião de LR";
      else if (sigla == "CN") return "Reunião de Corner";
    },
    formatTime(time) {
      let hora = time.split(":");
      return `${hora[0]}:${hora[1]}`;
    },
    meetingShow(meeting) {
      (this.meetingDetail = meeting), (this.showDetail = true);
    },

    async getMeeting() {
      if (this.$route.name == "reuniao") {
        const res = await this.meetingController.getAllMeeting(this.$api);
        this.reunioes = res;
      } else if (this.$route.name == "minhas-reunioes") {
        const memberID = localStorage.getItem("user_id");
        const minhasParticipacoes = await this.participationController.getMemberParticipationMeeting(
          this.$api,
          memberID
        );
        const minhasReunioes = [];
        minhasParticipacoes.forEach((participacao) => {
          minhasReunioes.push(participacao.meeting);
        });
        this.reunioes = minhasReunioes;
      }
    },
    showSnackbar(snackbarDetails) {
      this.snackbar = true;
      this.text = snackbarDetails.text;
      this.color = snackbarDetails.color;
    },
  },
};
</script>

<style>
v-snackbar {
  display: flex;
  text-align: center;
}
</style>
