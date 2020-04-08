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
    <NovaReuniao :show="btnReuniao" @close="btnReuniao = false"></NovaReuniao>
  </v-container>
</template>

<script>
import NovaReuniao from "./CadastrarReuniao.vue";
import meetingController from "../../controllers/MeetingController";
import moment from "moment";

export default {
  components: {
    NovaReuniao,
  },

  async created() {
    let res = await this.meetingController.getAllMeeting(this.$api);
    this.reunioes = res.data;
  },

  methods: {
    formatDate(date) {
      return moment(date).format("MM/DD/YYYY");
    },
    formatTime(time) {
      return moment(time).format("HH:MM");
    },
  },

  data() {
    return {
      btnReuniao: false,
      search: "",
      data: null,
      meetingController,
      headersReuniao: [
        {
          text: "Tipo",
          align: "center",
          value: "type",
        },
        { text: "Líder", value: "member" },
        { text: "Data", value: "date" },
        { text: "Hora", value: "time" },
      ],
      reunioes: [],
    };
  },
};
</script>
