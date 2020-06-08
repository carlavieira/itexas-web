<template>
  <v-container>
    <v-snackbar top v-model="snackbar" :color="color" :timeout="timeout">{{
      text
    }}</v-snackbar>
    <v-row class="px-4">
      <h2 v-if="$route.name == 'reuniaoAdm'">Reuniões</h2>
      <h2 v-else>Minhas Reuniões</h2>
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
              style="max-width: 300px;"
              v-model="search"
              append-icon="mdi-magnify"
              label="Pesquisar"
              single-line
              hide-details
            ></v-text-field>
            <v-spacer></v-spacer>
             <download-excel :fields="json_fields" :data="reunioes" name="Reuniões.xls">
               <v-btn icon>
              <v-icon>mdi-file-excel</v-icon>
            </v-btn>
             </download-excel>
          </v-card-title>
          <v-data-table
            no-data-text="Nenhuma reunião cadastrada"
            no-results-text="Nenhuma reunião encontrada"
            :headers="getHeaders()"
            :items="reunioes"
            :search="search"
            :sort-by="['date', 'time']"
            :sort-desc="[true, true]"
            @click:row="meetingShow"
            class="dataTable"
          >
            <template v-slot:item.type="{ item }">
              <span>{{ formatTypeMeeting(item.type) }}</span>
            </template>
            <template v-slot:item.member="{ item }">
              <span>{{ getMember(item) }}</span>
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
              <v-icon small v-if="item.attendance" class="success--text">mdi-brightness-1</v-icon>
              <v-icon small v-else class="error--text">mdi-brightness-1</v-icon>
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
    ></modalDetail>
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
      reunioes: [],
      userID: null,
      types: [],
      json_fields: {
        "Responsável": {
            callback: (value) => {
                return `${value.member.first_name} ${value.member.last_name}`;
            }
        },
        "Cargo": "member.post.abbreviation",
        "Area": "member.department.abbreviation",
        "Tipo": "type",
        "Data": "date",
        "Hora": "time",
        "% Presença": "engagement"
      }
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
    getMember: (item) => `${item.member.first_name} ${item.member.last_name}`,
    getHeaders() {
      if (this.$route.name == "reuniaoAdm") {
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
          { text: "Presenca", value: "attendance", align: "center" },
        ];
      }
    },
    formatDate(date) {
      return moment(date).format("DD/MM/YYYY");
    },
    formatTypeMeeting(sigla) {
      if (sigla == "REB") return "REB";
      else if (sigla == "RA") return "Reunião de Área";
      else if (sigla == "RT") return "Reunião de Time";
      else if (sigla == "LR") return "Reunião de LR";
      else if (sigla == "CN") return "Reunião de Corner";
      else if (sigla == "O2O") return "One to One(O2O)";
      else if (sigla == "TR") return "Traking";
    },

    formatPercentage(item) {
      if (item > 100) {
        return 100 + " %";
      } else return item + " %";
    },

    formatTime(time) {
      let hora = time.split(":");
      return `${hora[0]}:${hora[1]}`;
    },
    meetingShow(meeting) {
      (this.meetingDetail = meeting), (this.showDetail = true);
    },

    async getMeeting() {
      if (this.$route.name == "reuniaoAdm") {
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
          participacao.meeting.attendance = participacao.attendance;
          minhasReunioes.push(participacao.meeting);
        });
        this.reunioes = minhasReunioes;
        console.log(this.reunioes);
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

<style scoped>
v-snackbar {
  display: flex;
  text-align: center;
}
.dataTable:hover {
  cursor: pointer;
}
</style>
