<template>
  <v-container>
    <v-row class="px-4 pb-3">
      <h2>Critério de Membresia</h2>
      <v-spacer></v-spacer>
    </v-row>
    <v-divider class="pb-3"></v-divider>
    <v-data-table
            no-data-text="Nenhum resultado até o momento"
            no-results-text="Nenhum resultado até o momento"
            :headers="header"
            :items="membresia"
          >
      <template v-slot:item.member="{ item }">{{ item.member.first_name + " " + item.member.last_name }}</template>
      <template v-slot:item.member.leader="{ item }">
        <span v-if="item.member.leader"> {{ item.member.leader.first_name }} </span>
        <span v-else> - </span>
      </template>
      <template v-slot:item.dayMonth="{ item }">
        <span v-if="item.dayMonth">{{ formatDate(item.dayMonth) }}</span>
      </template>
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

import MembershipCriteriaController from "../../controllers/MembershipCriteriaController";
import moment from 'moment';

export default {

  data() {
    return {
      MembershipCriteriaController,
      header: [
        { text: "Nome", value: "member" },
        { text: "Área", value: "member.department.name"},
        { text: "Líder", value: "member.leader"},
        { text: "Referência", value: "dayMonth" },
        { text: "Office Hours", value: "officeHoursCriteria" },
        { text: "Reuniões", value: "meetingsCriteria" },
        { text: "Eventos", value: "eventsCriteria" },
        { text: "Status", value: "status" }
      ],
      membresia: [],
      showModal: false,
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
      if(item > 100) {
        return 100 + ' %';
      } 
      else
        return item + ' %';
    },
    
    formatDate(item){
      return moment(item).format('MM/YYYY')
    }
  }
};
</script>