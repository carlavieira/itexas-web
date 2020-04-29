<template>
  <v-container>
    <v-row class="px-4 pb-3">
      <h2>Critério de Membresia</h2>
      <v-spacer></v-spacer>
    </v-row>
    <v-divider class="pb-3"></v-divider>
    <v-data-table no-data-text="Nan" no-results-text="Nan" :headers="header" :items="membresia">
      <template v-slot:item.officeHoursCriteria="{ item }">
        {{ formatPercentage(item.officeHoursCriteria) }}
      </template>
      <template v-slot:item.meetingsCriteria="{ item }">
        {{ formatPercentage(item.meetingsCriteria) }}
      </template>
      <template v-slot:item.eventsCriteria="{ item }">
        {{ formatPercentage(item.eventsCriteria) }}
      </template>
      
      <template v-slot:item.actions="{ item }">
        <v-icon small @click="edit(item)">mdi-pencil</v-icon>
        <v-icon class="pl-3" small @click="deleteItem(item)">mdi-delete</v-icon>
      </template>
    </v-data-table>
  </v-container>
</template>

<script>

import MembershipCriteriaController from "../../controllers/MembershipCriteriaController"
// import memberController from "../../controllers/MemberController";

export default {

  data() {
    return {
      MembershipCriteriaController,
      header: [
        { text: "Membro", value: "member" },
        { text: "Office Hours", value: "officeHoursCriteria" },
        { text: "Reuniões", value: "meetingsCriteria" },
        { text: "Eventos", value: "eventsCriteria" },
        { text: "Status", value: "status" }
      ],
      membresia: [],
      type: null,
      showModal: false,
      oh: {}
    };
  },

  async created(){
    await this.listMembershipCriteria();
  },

  methods: {
    async listMembershipCriteria(){
      await this.MembershipCriteriaController.listMembershipCriteria(this.$api)
      .then(res => {
        this.membresia = res.data
      }).catch(err => {
        console.log(err)
      })
    },

    formatPercentage(item){
      return item + ' %';
    }
  }
};
</script>