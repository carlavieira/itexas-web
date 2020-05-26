<template>
  <v-dialog max-width="800px" persistent v-model="show">
    <v-card class="py-5 pr-4 pl-8">
      <v-layout row class="px-3" justify-space-between>
        <h2>Marcação de Evento</h2>
        <v-btn @click="$emit('close')" title="Fechar" icon>
          <v-icon color="grey">mdi-close</v-icon>
        </v-btn>
      </v-layout>
      <v-form ref="form" v-model="valid" lazy-validation>
        <v-row>
          <v-col class="col-12" sm="6" md="6" lg="6">
            <v-select
              v-model="type"
              :items="types"
              item-text="name"
              item-value="value"
              :rules="rules.type"
              label="Nome do Evento"
              prepend-inner-icon="mdi-account-group"
              required
              no-gutters
              outlined
              dense
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
                  readonly
                  v-on="on"
                  outlined
                  dense
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
                  outlined
                  dense
                  v-model="time"
                  label="Hora do Evento"
                  prepend-inner-icon="mdi-clock-outline"
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
          <v-col
            class="mt-6 col-12 offset-md-4 offset-lg-4 offset-sm-3 column-button"
            sm="6"
            md="6"
            lg="6"
          >
            <v-btn class="ma-2" @click="submit()" depressed color="success"
              >Cadastrar</v-btn
            >
            <v-btn class="ma-2" @click="clear()" outlined>Limpar Campos</v-btn>
          </v-col>
        </v-row>
      </v-form>
    </v-card>
  </v-dialog>
</template>

<script>
import eventController from "../../controllers/EventController";
import memberController from "../../controllers/MemberController";
//import moment from "moment";

export default {
  data: (vm) => ({
    eventController,
    memberController,
    date: new Date().toISOString().substr(0, 10),
    dateFormatted: vm.formatDate(new Date().toISOString().substr(0, 10)),
    modal1: false,
    modal2: false,
    rules: {
      type: [(v) => !!v || "Selecione um tipo de evento"],
      leader: [(v) => !!v || "Selecione o líder na evento."],
    },
    time: null,
    e7: null,
    select: null,
    valid: true,
    type: null,
    leader: null,
    leaders: [],
    snackbarDetail: {
      color: "success",
      text: "Evento cadastrado com sucesso",
    },
    types: [
      { name: "Reunião Geral", value: "RG" },
      { name: "Assembléia", value: "AS" },
      { name: "Conferência", value: "CF" },
      { name: "Outros", value: "OU" },
    ],
    participantes: [],
  }),

  props: {
    show: Boolean,
  },

  async created() {
    await this.populaSelectLider();
    this.defaultLeader();
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
    async defaultLeader() {
      this.leader = await this.memberController.getMemberById(
        this.$api,
        localStorage.getItem("user_id")
      );
    },
    async submit() {
      const eventDetails = new Object();

      eventDetails.date = this.date;
      eventDetails.time = this.time;
      eventDetails.type = this.type;
      eventDetails.member = this.leader;

      /*Verifica se memberID é um objeto membro, caso seja, receberá o id do Membro*/
      if (eventDetails.member === Object(eventDetails.member)) {
        eventDetails.member = eventDetails.member.id;
      }

      console.log(eventDetails);
      if (this.validate()) {
        return await this.eventController
          .createEvent(this.$api, eventDetails)
          .then((res) => {
            console.log(res);
            this.$emit("getAllEvents");

            setTimeout(() => {
              this.$emit("close");
              this.$emit("showSnackbar", this.snackbarDetail);
              this.leader = [];
            }, 1000);
          })
          .catch((err) => {
            console.log(err);
          });
      }
    },
    validate() {
      return this.$refs.form.validate();
    },

    ListaParticipantes(participantes) {
      this.participantes = [];
      this.participantes = participantes;
    },
    async populaSelectLider() {
      this.leaders = await this.memberController.getAllMembers(this.$api);
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
  },
};
</script>

<style scoped>
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
