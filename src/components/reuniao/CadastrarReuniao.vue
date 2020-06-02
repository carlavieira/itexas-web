<template>
  <v-dialog max-width="800px" persistent v-model="show">
    <v-card class="pa-5 modal">
      <v-layout row class="px-3" justify-space-between>
        <h2>Marcação de Reunião</h2>
        <v-btn @click="$emit('close')" title="Fechar" icon>
          <v-icon color="grey">mdi-close</v-icon>
        </v-btn>
      </v-layout>
      <v-form ref="form" v-model="valid" lazy-validation>
        <v-row class="mt-6">
          <v-col class="col-12" sm="6" md="6" lg="6">
            <v-select
              v-model="type"
              :items="types"
              item-text="display_name"
              item-value="value"
              :rules="rules.type"
              label="Tipo da Reunião"
              prepend-inner-icon="mdi-account-group"
              outlined
              dense
              required
              no-gutters
            ></v-select>
          </v-col>

          <v-col class="col-12" sm="6" md="6" lg="6">
            <v-select
              v-model="leader"
              :items="leaders"
              item-text="full_name"
              item-value="id"
              label="Líder responsável"
              prepend-inner-icon="mdi-account-star"
              :rules="rules.leader"
              outlined
              dense
              required
            ></v-select>
          </v-col>
          <v-col class="col-12" sm="6" md="6" lg="6">
            <v-dialog
              ref="dialog2"
              v-model="modal1"
              :return-value.sync="date"
              persistent
              width="290px"
            >
              <template v-slot:activator="{ on }">
                <v-text-field
                  v-model="dateFormatted"
                  label="Data do Evento"
                  prepend-inner-icon="mdi-calendar"
                  outlined
                  dense
                  readonly
                  v-on="on"
                ></v-text-field>
              </template>
              <v-date-picker
                v-model="date"
                color="red lighten-1"
                locale="pt-br"
                scrollable
              >
                <v-spacer></v-spacer>
                <v-btn text color="primary" @click="modal1 = false"
                  >Voltar</v-btn
                >
                <v-btn text color="primary" @click="$refs.dialog2.save(date)"
                  >OK</v-btn
                >
              </v-date-picker>
            </v-dialog>
          </v-col>

          <v-col class="col-12" sm="6" md="6" lg="6">
            <v-dialog
              ref="dialog"
              v-model="modal2"
              :return-value.sync="time"
              persistent
              width="290px"
            >
              <template v-slot:activator="{ on }">
                <v-text-field
                  v-model="time"
                  label="Hora do Evento"
                  prepend-inner-icon="mdi-clock-outline"
                  dense
                  outlined
                  readonly
                  v-on="on"
                ></v-text-field>
              </template>
              <v-time-picker
                v-if="modal2"
                v-model="time"
                color="red lighten-1"
                format="24hr"
                full-width
              >
                <v-spacer></v-spacer>
                <v-btn text color="primary" @click="modal2 = false"
                  >Cancel</v-btn
                >
                <v-btn text color="primary" @click="$refs.dialog.save(time)"
                  >OK</v-btn
                >
              </v-time-picker>
            </v-dialog>
          </v-col>
          <v-col style="justify-content: center ;display: flex">
            <tabelaParticipante
              :form="'create'"
              v-on:enviarParticipantesPai="ListaParticipantes"
              style="max-width: 550px"
            ></tabelaParticipante>
          </v-col>
        </v-row>
        <v-layout row align-center justify-center>
          <v-btn
            class="ma-2"
            style="float: left"
            v-on:click.native="
              submit();
              defaultLeader();
            "
            depressed
            color="success"
            >Cadastrar</v-btn
          >
        </v-layout>
      </v-form>
    </v-card>
  </v-dialog>
</template>

<script>
import meetingController from "../../controllers/MeetingController";
import tabelaParticipante from "../tabelaParticipantes/TabelaDeParticipantes";
import memberController from "../../controllers/MemberController";

export default {
  data: (vm) => ({
    meetingController,
    valid: true,
    types: [],
    rules: {
      type: [(v) => !!v || "Selecione um tipo de reunião"],
      leader: [(v) => !!v || "Selecione o líder na reunião."],
    },
    date: new Date().toISOString().substr(0, 10),
    dateFormatted: vm.formatDate(new Date().toISOString().substr(0, 10)),
    modal1: false,
    modal2: false,
    time: "00:00",
    e7: null,
    select: null,
    leader: null,
    leaders: [],
    memberController,
    snackbarDetail: {
      color: "success",
      text: "Reunião cadastrada com sucesso",
    },
    type: "",
    participantes: [],
  }),

  components: {
    tabelaParticipante,
  },

  async created() {
    await this.populaSelectLider();
    await this.defaultLeader();
    await this.getTypeMeetings();
  },

  computed: {
    computedDateFormatted() {
      return this.formatDate(this.date);
    },
  },

  watch: {
    /* caso de erro, colocar o parametro date(val) */
    date() {
      this.dateFormatted = this.formatDate(this.date);
    },
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
    async submit() {
      const meetingDetails = new Object();
      meetingDetails.date = this.date;
      meetingDetails.time = this.time;
      meetingDetails.type = this.type;
      meetingDetails.member = this.leader;

      /*Verifica se memberID é um objeto membro, caso seja, receberá o id do Membro*/
      if (meetingDetails.member === Object(meetingDetails.member)) {
        meetingDetails.member = meetingDetails.member.id;
      }

      meetingDetails.participantes = JSON.parse(
        JSON.stringify(this.participantes)
      );
      console.log(meetingDetails);
      if (this.validate()) {
        return await this.meetingController
          .createMeeting(this.$api, meetingDetails)
          .then((res) => {
            console.log(res);
            this.$emit("getAllMeeting");

            setTimeout(() => {
              this.$emit("close");
              this.$emit("showSnackbar", this.snackbarDetail);
            }, 1000);
          })
          .catch((err) => {
            console.log(err);
          });
      }
    },

    setFullName(array) {
      const newArray = new Array();
      array.map((item) => {
        item.full_name = `${item.first_name} ${item.last_name}`;
        newArray.push(item);
      });

      return newArray;
    },
    async getTypeMeetings() {
      this.types = await meetingController.getMeetingTypes(this.$api);
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

    validate() {
      return this.$refs.form.validate();
    },

    async populaSelectLider() {
      this.leaders = await this.memberController.getAllMembers(this.$api);
      this.leaders = this.ordenaOrdemCrescente(
        await this.memberController.getAllMembers(this.$api)
      );
      this.leaders = this.setFullName(this.leaders);
      this.leader;
    },

    async defaultLeader() {
      this.leader = await this.memberController.getMemberById(
        this.$api,
        localStorage.getItem("user_id")
      );
    },

    ListaParticipantes(participantes) {
      this.participantes = [];
      this.participantes = participantes;
    },
  },

  props: {
    show: Boolean,
  },
};
</script>

<style scoped>
.modal {
  background-color: #f1f1f1;
}
.w-290 {
  max-width: 290px;
}

.span-title {
  color: #777777;
}

.column {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.column-button {
  display: flex;
}
</style>
