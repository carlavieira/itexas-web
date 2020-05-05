<template>
  <v-dialog max-width="700px" persistent v-model="show">
    <v-card class="pa-5 pl-10 modal">
      <v-layout row class="px-3">
        <v-btn
          v-if="!editEvent"
          color="black"
          @click="editEvent = true"
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
                  deleteEvent();
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
        <span v-if="!editEvent" class="titulo font-weight-medium mt-3">
          {{ this.formatTypeEvent(event.type) }}
        </span>

        <span v-if="!editEvent" class="subheading font-weight-regular"
          >(Responsável: {{ this.hostName }} )</span
        >
      </v-layout>

      <v-layout row mt-3 justify-space-around style="width: 100%;">
        <v-layout justify-left col-xs-12 col-sm-6 v-if="editEvent">
          <v-select
            v-model="event.type"
            :items="types"
            item-text="name"
            item-value="value"
            label="Tipo do Evento"
            prepend-inner-icon="mdi-account-group"
            required
            no-gutters
            outlined
            dense
            hide-details
          ></v-select>
        </v-layout>

        <v-layout justify-left col-xs-12 col-sm-6 v-if="editEvent">
          <v-select
            label="Líder"
            no-gutters
            outlined
            dense
            prepend-inner-icon="mdi-account-star"
            v-model="event.member"
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
                label="Data da Evento"
                persistent-hint
                prepend-inner-icon="mdi-calendar"
                v-on="on"
                dense
                outlined
                :disabled="!editEvent"
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
                label="Hora do evento"
                prepend-inner-icon="mdi-clock-outline"
                readonly
                outlined
                dense
                v-on="on"
                :disabled="!editEvent"
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
      </v-layout>
    </v-card>
  </v-dialog>
</template>

<script>
import memberController from "../../controllers/MemberController";
export default {
  data: (vm) => ({
    editEvent: false,
    memberController,
    eventDetails: {},
    hostName: "-",
    dialog: false,
    date: new Date().toISOString().substr(0, 10),
    dateFormatted: vm.formatDate(new Date().toISOString().substr(0, 10)),
    menu1: false,
    menu2: false,
    modal: false,
    leader: "",
    leaders: [],
    time: "00:00",
    types: [
      { name: "Reunião Geral", value: "RG" },
      { name: "Assembléia", value: "AS" },
      { name: "Conferência", value: "CF" },
      { name: "Outros", value: "OU" },
    ],
  }),

  created() {
    this.hostName = `${this.event.member.first_name} ${this.event.member.last_name}`;
    this.populaSelectLider();
  },

  props: {
    show: Boolean,
    event: Object,
  },

  watch: {
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
    formatTypeEvent(sigla) {
      if (sigla == "RG") return "Reunião Geral";
      else if (sigla == "AS") return "Assembléia";
      else if (sigla == "CF") return "Conferência";
      else if (sigla == "OU") return "Outros";
    },
    async populaSelectLider() {
      this.leaders = this.ordenaOrdemCrescente(
        await this.memberController.getAllMembers(this.$api)
      );
      this.leaders = this.setFullName(this.leaders);
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
    setFullName(array) {
      const newArray = new Array();
      array.map((item) => {
        item.full_name = `${item.first_name} ${item.last_name}`;
        newArray.push(item);
      });

      return newArray;
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
