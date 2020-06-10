<template>
  <v-dialog max-width="700px" persistent v-model="show">
    <v-card class="pa-5 pl-10 modal">
      <v-layout row class="px-3">
        <v-btn
          v-if="
            (imLeader && !editMeeting) ||
              ($route.name == 'reuniaoAdm' && !editMeeting)
          "
          color="black"
          @click="editMeeting = true"
          title="Editar"
          small
        >
          <v-icon color="white">mdi-account-edit</v-icon>
        </v-btn>

        <v-tooltip v-model="showMessage" top>
          <template v-slot:activator="{ on }">
            <v-btn
              v-on="on"
              v-if="!imLeader && $route.name != 'reuniaoAdm'"
              color="grey lighten-1"
              @click="showMessage = !showMessage"
              small
            >
              <v-icon color="grey darken-2">mdi-account-edit</v-icon>
            </v-btn>
          </template>
          <span>Você não tem permissão para editar essa reunião.</span>
        </v-tooltip>

        <v-btn
          v-if="imLeader || $route.name == 'reuniaoAdm'"
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

        <v-dialog v-model="confirmDialog" persistent max-width="400">
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              v-if="!editMeeting"
              @click="$emit('close')"
              title="Fechar"
              icon
            >
              <v-icon color="grey">mdi-close</v-icon>
            </v-btn>
            <v-btn v-else title="Fechar" icon v-bind="attrs" v-on="on">
              <v-icon color="grey">mdi-close</v-icon>
            </v-btn>
          </template>
          <v-card>
            <v-card-title class="headline"
              >Sair da edição da reunião?</v-card-title
            >
            <v-card-text
              >Ao sair da edição sem salvar, quaisquer alterações que você tenha
              realizado serão perdidas.</v-card-text
            >
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="green darken-1" text @click="confirmDialog = false"
                >Continuar editando</v-btn
              >
              <v-btn
                color="red darken-1"
                text
                @click="
                  confirmDialog = false;
                  $emit('close');
                "
                >Sair</v-btn
              >
            </v-card-actions>
          </v-card>
        </v-dialog>
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
            item-text="display_name"
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
          <v-select
            label="Líder"
            outlined
            dense
            prepend-inner-icon="mdi-account-star"
            v-model="meeting.member"
            :items="leaders"
            item-text="full_name"
            item-value="id"
            hide-details
          ></v-select>
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
          :typeEvent="'meeting'"
          :objForm="meeting"
          v-if="editMeeting"
        ></tabelaParticipante>

        <tabelaParticipanteView
          :typeEvent="'meeting'"
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
    imLeader: "",
    participationController,
    memberById: null,
    participantes: [],
    showMessage: false,
    leader: "",
    leaders: [],
    confirmDialog: false,
    snackbarDetail: {
      color: "",
      text: "",
    },
    hostName: "",
    participantesToDelete: [],
    types: [],
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
    this.populaSelectLider();
    this.getTypeMeetings();
    this.checkImLeader();
    this.date = this.meeting.date;
    this.time = this.meeting.time;
    this.hostName =
      this.meeting.member.first_name + " " + this.meeting.member.last_name;
  },

  watch: {
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

    async populaSelectLider() {
      this.leaders = this.ordenaOrdemCrescente(
        await this.memberController.getAllMembers(this.$api)
      );
      this.leaders = this.setFullName(this.leaders);
    },

    setFullName(array) {
      const newArray = new Array();
      array.map((item) => {
        item.full_name = `${item.first_name} ${item.last_name}`;
        newArray.push(item);
      });

      return newArray;
    },

    ordenaOrdemCrescente(array) {
      array.sort(function(item1, item2) {
        if (item1.first_name && item2.first_name) {
          return item1.first_name < item2.first_name ? -1 : 1;
        } else {
          return item1.full_name < item2.full_name ? -1 : 1;
        }
      });
      return array;
    },
    async sendEdit() {
      /* Edit Meeting */
      let meetingEdit = this.meeting;
      meetingEdit.date = this.date;
      meetingEdit.time = this.time;
      meetingEdit.memberID = this.meeting.member;
      /*Verifica se memberID é um objeto membro, caso seja, receberá o id do Membro*/
      if (meetingEdit.memberID === Object(meetingEdit.memberID)) {
        meetingEdit.memberID = meetingEdit.memberID.id;
      }
      await this.meetingController
        .editMeeting(this.$api, meetingEdit)
        .then((res) => {
          console.log(res);
          this.$emit("getAllMeeting");
          this.snackbarDetail.text = "Reunião editada com sucesso";
          this.snackbarDetail.color = "warning";

          setTimeout(() => {
            this.$emit("close");
            this.$emit("showSnackbar", this.snackbarDetail);
          }, 1000);
        })
        .catch(function(error) {
          console.log(error);
        });

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
          participante.meeting = participante.meeting.id;
          participante.member = participante.member.id;
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
    ListaParticipantes(participantes) {
      this.participantes = [];
      this.participantes = participantes.participantesWithName;
      this.participantesToDelete = participantes.participantesDeleted;
    },
    async deleteMeeting() {
      return await this.meetingController
        .deleteMeeting(this.$api, this.meeting.id)
        .then((res) => {
          console.log(res);
          this.$emit("getAllMeeting");

          setTimeout(() => {
            this.$emit("close");
            this.$emit("showSnackbar", this.snackbarDetail);
          }, 1000);
        });
    },
    async getTypeMeetings() {
      this.types = await meetingController.getMeetingTypes(this.$api);
    },
    checkImLeader() {
      const myID = localStorage.getItem("user_id");
      const idLeader = this.meeting.member.id;

      this.imLeader = myID == idLeader;
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
