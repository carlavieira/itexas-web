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
            :items="membresia">
        <template v-slot:item.officeHoursCriteria="{ item }">
            {{ formatPercentage(item.officeHoursCriteria) }}
        </template>
        <template v-slot:item.meetingsCriteria="{ item }">
            {{ formatPercentage(item.meetingsCriteria) }}
        </template>
        <template v-slot:item.eventsCriteria="{ item }">
            {{ formatPercentage(item.eventsCriteria) }}
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
    await this.getMembershipCriteria();
  },

  methods: {
    async getMembershipCriteria() {
      this.membresia = await this.MembershipCriteriaCrontroller.getMyMembershipCriteria(
        this.$api,
        localStorage.getItem("user_id")
      );
      console.log(this.member);
    },

    formatPercentage(item){
    //   if(item > 100) {
    //     return 100 + ' %';
    //   } 
    //  else
        return item + ' %';
    },
    
    formatDate(item){
      return moment(item).format('MM/YYYY')
    }
  }
};
</script>