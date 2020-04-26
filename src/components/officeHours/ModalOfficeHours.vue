<template>
  <v-dialog max-width="800px" persistent v-model="show">
    <v-card class="pa-5 modal">
      <v-layout row class="px-3" justify-space-between>
        <h2>Marcação de Office Hours - </h2>
        <h2 v-if="type == 'add'">Novo</h2>
        <h2 v-if="type == 'edit'">Edição</h2>
        <v-btn @click="$emit('close'), $emit('reload')" title="Fechar" icon>
          <v-icon color="grey">mdi-close</v-icon>
        </v-btn>
      </v-layout>
      <v-row>
        <v-col class="col-12" sm="6" md="6" lg="6">
          <v-dialog
            ref="dialogData"
            v-model="modalData"
            :return-value.sync="officeHour.date"
            persistent
            width="290px"
          >
            <template v-slot:activator="{ on }">
              <v-text-field
                v-model="officeHour.date"
                label="Data"
                prepend-icon="mdi-calendar"
                readonly
                v-on="on"
              ></v-text-field>
            </template>
            <v-date-picker v-model="officeHour.date" color="red lighten-1" locale="pt-br" scrollable>
              <v-spacer></v-spacer>
              <v-btn text color="primary" @click="modalData = false">Voltar</v-btn>
              <v-btn text color="primary" @click="$refs.dialogData.save(officeHour.date)">OK</v-btn>
            </v-date-picker>
          </v-dialog>
        </v-col>

        <v-col class="col-12" sm="6" md="6" lg="6">
          <v-dialog
            ref="dialogCheckin"
            v-model="modalCheckin"
            :return-value.sync="officeHour.checkin_time"
            persistent
            width="290px"
          >
            <template v-slot:activator="{ on }">
              <v-text-field
                v-model="officeHour.checkin_time"
                label="Check-in"
                prepend-icon="mdi-clock-outline"
                readonly
                v-on="on"
              ></v-text-field>
            </template>
            <v-time-picker v-model="officeHour.checkin_time" color="red lighten-1" format="24hr" full-width>
              <v-spacer></v-spacer>
              <v-btn text color="primary" @click="modalCheckin = false">Cancel</v-btn>
              <v-btn text color="primary" @click="$refs.dialogCheckin.save(officeHour.checkin_time)">OK</v-btn>
            </v-time-picker>
          </v-dialog>
        </v-col>

        <v-col class="col-12" sm="6" md="6" lg="6">
          <v-dialog
            ref="dialogCheckout"
            v-model="modalCheckout"
            :return-value.sync="officeHour.checkout_time"
            persistent
            width="290px"
          >
            <template v-slot:activator="{ on }">
              <v-text-field
                v-model="officeHour.checkout_time"
                label="Check-out"
                prepend-icon="mdi-clock-outline"
                readonly
                v-on="on"
              ></v-text-field>
            </template>
            <v-time-picker v-model="officeHour.checkout_time" color="red lighten-1" format="24hr" full-width>
              <v-spacer></v-spacer>
              <v-btn text color="primary" @click="modalCheckout = false">Cancel</v-btn>
              <v-btn text color="primary" @click="$refs.dialogCheckout.save(officeHour.checkout_time)">OK</v-btn>
            </v-time-picker>
          </v-dialog>
        </v-col>
        <v-col class="col-12" sm="6" md="6" lg="6">
          <v-btn v-if="type == 'add'" class="ma-2" depressed color="success" @click="createOfficeHour()">Salvar</v-btn>
          <v-btn v-if="type == 'edit'" class="ma-2" depressed color="success" @click="editOfficeHour()">Salvar</v-btn>
        </v-col>
      </v-row>
    </v-card>
  </v-dialog>
</template>

<script>
import officeHourController from "../../controllers/OfficeHoursController"
import moment from "moment"

export default {
  data() {
    return {
      officeHourController,
      modalData: false,
      modalCheckin: false,
      modalCheckout: false
    };
  },

  created(){
    if(this.type == "edit"){
      this.officeHour.checkin_time = moment(this.officeHour.checkin_time).format('HH:mm:ss');
      if(this.officeHour.checkout_time)
        this.officeHour.checkout_time = moment(this.officeHour.checkout_time).format('HH:mm:ss');
    }
  },

  props: {
    show: Boolean,
    type: String,
    officeHour: Object
  },

  methods:{
    async createOfficeHour(){
      this.officeHour.checkin_time = this.officeHour.date + " " +  this.officeHour.checkin_time
      if(this.officeHour.checkout_time){
        this.officeHour.checkout_time = this.officeHour.date + " " +  this.officeHour.checkout_time
      }
      await officeHourController.createOfficeHour(this.$api, this.officeHour)
      .then(res => {
        this.$emit('close')
        this.$emit('reload')
        console.log(res)
      }).catch(err => {
        console.log(err)
      })
    },

    async editOfficeHour(){
      this.officeHour.checkin_time = this.officeHour.date + " " +  this.officeHour.checkin_time
      if(this.officeHour.checkout_time){
        this.officeHour.checkout_time = this.officeHour.date + " " +  this.officeHour.checkout_time
      }
      await officeHourController.editOfficeHour(this.$api, this.officeHour)
      .then(res => {
        this.$emit('close')
        this.$emit('reload')
        console.log(res)
      }).catch(err => {
        console.log(err)
      })
    }
  }
};
</script>