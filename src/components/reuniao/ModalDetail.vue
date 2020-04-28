<template>
  <v-dialog max-width="700px" persistent v-model="show">
    <v-card class="pa-5 pl-10 modal">
      <v-layout row class="px-3">
        <v-btn
          v-if="!editMeeting"
          color="black"
          @click="editMeeting = true"
          title="Editar"
          small
        >
          <v-icon color="white">mdi-account-edit</v-icon>
        </v-btn>

        <v-btn
          color="red"
          @click.stop="dialog = true"
          class="ml-2"
          title="Excluir"
          small
        >
          <v-icon color="white">mdi-delete</v-icon>
        </v-btn>

        <v-dialog v-model="dialog" max-width="500" min-h>
          <v-card>
            <v-card-title style="font-size: 16px !important" class="headline"
              >Deseja realmente deletar a reunião?</v-card-title
            >
            <v-card-actions>
              <v-spacer></v-spacer>

              <v-btn
                color="green darken-1"
                text
                @click="
                  dialog = false;
                  deleteMeeting();
                "
              >
                Sim
              </v-btn>

              <v-btn color="red darken-1" text @click="dialog = false">
                Não
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>

        <v-spacer></v-spacer>
        <v-btn @click="$emit('close')" title="Fechar" icon>
          <v-icon color="grey">mdi-close</v-icon>
        </v-btn>
      </v-layout>

      <v-layout column mx-2 justify-center align-center>
        <span v-if="!editMeeting" class="titulo font-weight-medium mt-3">
          {{ this.formatTypeMeeting(meeting.type) }}
        </span>

        <span v-if="!editMeeting" class="subheading font-weight-regular"
          >(Responsável: {{ hostName }} )</span
        >
      </v-layout>

      <v-layout row mt-3 justify-space-around style="width: 100%;">
        <v-layout justify-left col-xs-12 col-sm-6 v-if="editMeeting">
          <v-select
            v-model="meeting.type"
            :items="types"
            item-text="name"
            item-value="value"
            label="Tipo da Reunião"
            prepend-inner-icon="mdi-account-group"
            required
            no-gutters
            outlined
            dense
          ></v-select>
        </v-layout>

        <v-layout justify-left col-xs-12 col-sm-6 v-if="editMeeting">
          <v-text-field
            label="Líder"
            outlined
            dense
            prepend-inner-icon="mdi-account-star"
            v-model="meeting.member"
            hide-details
          ></v-text-field>
        </v-layout>

        <v-layout justify-left col-xs-12 col-sm-6>
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
                label="Data da Reunião"
                persistent-hint
                prepend-inner-icon="mdi-calendar"
                v-on="on"
                dense
                outlined
                :disabled="!editMeeting"
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
        </v-layout>

        <v-layout justify-left col-xs-12 col-sm-6>
          <v-dialog
            ref="dialog"
            v-model="modal"
            :return-value.sync="time"
            persistent
            width="290px"
          >
            <template v-slot:activator="{ on }">
              <v-text-field
                v-model="time"
                label="Hora da Reunião"
                prepend-inner-icon="mdi-clock-outline"
                readonly
                outlined
                dense
                v-on="on"
                :disabled="!editMeeting"
              ></v-text-field>
            </template>
            <v-time-picker
              v-if="modal"
              v-model="time"
              color="red lighten-1"
              format="24hr"
              full-width
            >
              <v-spacer></v-spacer>
              <v-btn text color="primary" @click="modal = false">Cancel</v-btn>
              <v-btn text color="primary" @click="$refs.dialog.save(time)"
                >OK</v-btn
              >
            </v-time-picker>
          </v-dialog>
        </v-layout>

        <tabelaParticipante
          v-on:enviarParticipantesPai="ListaParticipantes"
          :objForm="meeting"
          v-if="editMeeting"
        ></tabelaParticipante>
        <tabelaParticipanteView
          :objForm="meeting"
          v-if="!editMeeting"
        ></tabelaParticipanteView>
        <v-layout col-xs-12 col-sm-6 row justify-center v-if="editMeeting">
          <v-btn class="ma-2 mt-4" @click="sendEdit()" depressed color="success"
            >Salvar</v-btn
          >
        </v-layout>
      </v-layout>
    </v-card>
  </v-dialog>
</template>

<script>
import meetingController from "../../controllers/MeetingController";
import memberController from "../../controllers/MemberController";
import participationController from "../../controllers/ParticipationController";
import tabelaParticipante from "../tabelaParticipantes/TabelaDeParticipantes";
import tabelaParticipanteView from "../tabelaParticipantes/TabelaDeParticipantesView";

export default {
  data: (vm) => ({
    date: new Date().toISOString().substr(0, 10),
    dateFormatted: vm.formatDate(new Date().toISOString().substr(0, 10)),
    menu1: false,
    menu2: false,
    modal: false,
    time: "00:00",
    dialog: false,
    editMeeting: false,
    meetingDetails: {},
    meetingController,
    memberController,
    participationController,
    memberById: null,
    participantes: [],
    participantesToDelete: [],
    hostName: "",
    types: [
      { name: "REB", value: "REB" },
      { name: "Reunião de Área", value: "RA" },
      { name: "Reunião de Time", value: "RT" },
      { name: "Reunião de LR", value: "LR" },
      { name: "Reunião de Corner", value: "CN" },
    ],
  }),

  computed: {
    computedDateFormatted() {
      return this.formatDate(this.date);
    },
  },

  components: {
    tabelaParticipante,
    tabelaParticipanteView,
  },

  created() {
    this.getMemberById(this.meeting.member);
    this.date = this.meeting.date;
    this.time = this.meeting.time;
  },

  watch: {
    /* caso de erro, colocar o parametro date(val) */
    date() {
      this.dateFormatted = this.formatDate(this.date);
    },
  },

  props: {
    show: Boolean,
    meeting: Object,
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
    formatTypeMeeting(sigla) {
      if (sigla == "REB") return "REB";
      else if (sigla == "RA") return "Reunião de Área";
      else if (sigla == "RT") return "Reunião de Time";
      else if (sigla == "LR") return "Reunião de LR";
      else if (sigla == "CN") return "Reunião de Corner";
    },
    async deleteMeeting() {
      console.log("Fazer request delete");
    },
    async sendEdit() {
      console.log(this.participantesToDelete);

      /* Edit Meeting */
      this.meeting.date = this.date;
      this.meeting.time = this.time;
      await this.meetingController.editMeeting(this.$api, this.meeting);

      /* Edit Participation */
      this.participantes.forEach(async (participante) => {
        if (participante.is_active) {
          let part = new Object();
          part.meeting = this.meeting.id;
          part.member = participante.id;
          part.attendance = participante.attendance;
          await this.participationController.createParticipationMeeting(
            this.$api,
            part
          );
        } else {
          await this.participationController.editParticipationMeeting(
            this.$api,
            participante
          );
        }
      });

      /* Delete Participation */
      if (this.participantesToDelete.length !== 0) {
        this.participantesToDelete.forEach(async (participante) => {
          await this.participationController.deleteParticipationMeeting(
            this.$api,
            participante.id
          );
        });
      }
    },
    async getMemberById(idMember) {
      this.memberById = await this.memberController.getMemberById(
        this.$api,
        idMember
      );

      this.hostName =
        this.memberById.first_name + " " + this.memberById.last_name;
    },
    ListaParticipantes(participantes) {
      this.participantes = [];
      this.participantes = participantes.participantesWithName;
      this.participantesToDelete = participantes.participantesDeleted;
    },
  },
};
</script>

<style scoped>
.modal {
  background-color: rgb(248, 248, 248);
}
.titulo {
  font-size: 1.85rem !important;
}
</style>
