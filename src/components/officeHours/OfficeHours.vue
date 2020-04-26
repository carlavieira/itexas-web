<template>
  <v-container>
    <v-row class="px-4 pb-3">
      <h2>Office Hours</h2>
      <v-spacer></v-spacer>
      <v-btn @click="add()" title="Cadastrar novo membro" small color="secondary" fab>
        <v-icon>mdi-plus</v-icon>
      </v-btn>
    </v-row>
    <v-divider class="pb-3"></v-divider>
    <v-data-table no-data-text="Nan" no-results-text="Nan" :headers="header" :items="officeHours">
      <template v-slot:item.actions="{ item }">
        <v-icon small @click="edit(item)">mdi-pencil</v-icon>
        <v-icon class="pl-3" small @click="deleteItem(item)">mdi-delete</v-icon>
      </template>
    </v-data-table>

    <modalOfficeHours v-if="showModal" :show="showModal" :type="type" :officeHour="oh" @close="showModal = false" @reload="getOfficeHours()"></modalOfficeHours>

  </v-container>
</template>

<script>
import modalOfficeHours from "./ModalOfficeHours.vue";
import officeHoursController from "../../controllers/OfficeHoursController"

export default {
  components: {
    modalOfficeHours
  },

  data() {
    return {
      officeHoursController,
      header: [
        { text: "Data", value: "date" },
        { text: "Check-in", value: "checkin_time" },
        { text: "Check-out", value: "checkout_time" },
        { text: "Duração", value: "duration" },
        { text: "Ações", value: "actions", sortable: false }
      ],
      officeHours: [],
      type: null,
      showModal: false,
      oh: {}
    };
  },

  async created(){
    await this.getOfficeHours()
  },

  methods: {
    async getOfficeHours(){
      await this.officeHoursController.getOfficeHours(this.$api)
      .then(res => {
        this.officeHours = res.data
      }).catch(err => {
        console.log(err)
      })
    },

    add(){
      this.type = "add"
      this.showModal = true
      this.oh = {
        date: null,
        checkin_time: null,
        checkout_time: null
      }
    },

    edit(item) {
      this.type = "edit"
      this.showModal = true
      this.oh = item
    },

    deleteItem(item) {
      console.log(item);
    }
  }
};
</script>