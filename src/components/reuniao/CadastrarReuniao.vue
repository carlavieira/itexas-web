<template>
  <v-dialog max-width="800px" persistent v-model="show">
    <v-card class="pa-5">
      <v-layout row class="px-3" justify-space-between>
        <h2>Marcação de Reunião</h2>
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
              label="Tipo da Reunião"
              prepend-icon="mdi-account-group"
              required
              no-gutters
            ></v-select>
          </v-col>

          <v-col class="col-12" sm="6" md="6" lg="6">
            <v-select
              v-model="leader"
              label="Líder responsável"
              prepend-icon="mdi-account-star"
            ></v-select>
          </v-col>

          <v-row justify="space-around">
            <v-col cols="11" sm="5">
              <v-dialog
                ref="dialog2"
                v-model="modal1"
                :return-value.sync="date"
                persistent
                width="290px"
              >
                <template v-slot:activator="{ on }">
                  <v-text-field
                    v-model="date"
                    label="Data do Evento"
                    prepend-icon="mdi-calendar"
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

            <v-col cols="11" sm="5">
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
                    prepend-icon="mdi-clock-outline"
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
          </v-row>
          <v-col
            class="col-12 offset-md-4 offset-lg-4 offset-sm-3 column-button"
            sm="6"
            md="6"
            lg="6"
          >
            <v-btn
              class="ma-2"
              v-on:click.native="submit()"
              depressed
              color="success"
              >Cadastrar</v-btn
            >
            <v-btn class="ma-2" v-on:click.native="clear()" outlined
              >Limpar Campos</v-btn
            >
          </v-col>
        </v-row>
      </v-form>
    </v-card>
  </v-dialog>
</template>

<script>
import meetingController from "../../controllers/MeetingController";

export default {
  data() {
    return {
      meetingController,
      valid: true,
      types: [
        { name: "REB", value: "REB" },
        { name: "Reunião de Área", value: "RA" },
        { name: "Reunião de Time", value: "RT" },
        { name: "Reunião de LR", value: "LR" },
        { name: "Reunião de Corner", value: "CN" },
      ],
      date: new Date().toISOString().substr(0, 10),
      modal1: false,
      modal2: false,
      time: null,
      e7: null,
      select: null,
      leader: "",
      type: "",
    };
  },

  methods: {
    async submit() {
      const meetingDetails = new Object();

      let date = new Date(this.date);
      date.setDate(date.getDate() + 1);

      let time = this.time.split(":");

      meetingDetails.date = date;
      date.setHours(time[0], time[1]);
      date.setHours(date.getHours() - 3);
      meetingDetails.time = date;

      meetingDetails.type = this.type;
      meetingDetails.member = this.leader;

      console.log(meetingDetails);

      return await this.meetingController.createMeeting(
        this.$api,
        meetingDetails
      );
    },
  },

  props: {
    show: Boolean,
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