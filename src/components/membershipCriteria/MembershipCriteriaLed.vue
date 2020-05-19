<template>
  <v-container>
    <v-row class="px-4 pb-3">
      <h2>Critério de Membresia dos Meus Liderados</h2>
      <v-spacer></v-spacer>
    </v-row>
    <v-divider class="pb-3"></v-divider>
    <v-data-table
      no-data-text="Nenhum resultado até o momento"
      no-results-text="Nenhum resultado até o momento"
      :headers="header"
      :items="filterLed"
    >
      <template v-slot:item.member="{ item }">
        {{
        item.member.first_name + " " + item.member.last_name
        }}
      </template>
      <template v-slot:item.dayMonth="{ item }">
        <span v-if="item.dayMonth">{{ formatDate(item.dayMonth) }}</span>
      </template>

      <template v-slot:item.officeHoursCriteria="{ item }">
        <v-chip
          v-if="item.officeHoursCriteria == 100.00"
          class="ma-2"
          color="white"
          text-color="green"
        >{{formatPercentage(item.officeHoursCriteria)}}</v-chip>
        <v-chip
          v-if="item.officeHoursCriteria < 80.00"
          class="ma-2"
          color="white"
          text-color="red"
        >{{formatPercentage(item.officeHoursCriteria)}}</v-chip>
        <span
          v-else-if="item.officeHoursCriteria > 80.00 && officeHoursCriteria < 100.00"
        >{{formatPercentage(item.officeHoursCriteria)}}</span>
      </template>

      <template v-slot:item.meetingsCriteria="{ item }">
        <v-chip
          v-if="item.meetingsCriteria == 100.00"
          class="ma-2"
          color="white"
          text-color="green"
        >{{formatPercentage(item.meetingsCriteria)}}</v-chip>
        <v-chip
          v-else-if="item.meetingsCriteria < 75.00"
          class="ma-2"
          color="white"
          text-color="red"
        >{{formatPercentage(item.meetingsCriteria)}}</v-chip>
        <span
          v-else-if="item.meetingsCriteria > 75.00 && meetingsCriteria < 100.00"
        >{{formatPercentage(item.meetingsCriteria)}}</span>
      </template>

      <template v-slot:item.eventsCriteria="{ item }">
        <v-chip
          v-if="item.eventsCriteria == 100.00"
          class="ma-2"
          color="white"
          text-color="green"
        >{{formatPercentage(item.eventsCriteria)}}</v-chip>
        <v-chip
          v-else-if="item.eventsCriteria < 50.00"
          class="ma-2"
          color="white"
          text-color="red"
        >{{formatPercentage(item.eventsCriteria)}}</v-chip>
        <span
          v-else-if="item.eventsCriteria > 50.00 && eventsCriteria < 100.00"
        >{{formatPercentage(item.eventsCriteria)}}</span>
      </template>

      <template v-slot:item.status="{ item }">
        <v-chip
          v-if="item.status = 'Risco'"
          class="ma-2"
          color="red"
          text-color="white"
          small
        >{{item.status}}</v-chip>
        <span v-else>{{item.status}}</span>
      </template>
    </v-data-table>
  </v-container>
</template>

<script>
import MembershipCriteriaController from "../../controllers/MembershipCriteriaController";
import moment from "moment";

export default {
  data() {
    return {
      MembershipCriteriaController,
      header: [
        { text: "Nome", value: "member" },
        { text: "Referência", value: "dayMonth" },
        { text: "Office Hours", value: "officeHoursCriteria" },
        { text: "Reuniões", value: "meetingsCriteria" },
        { text: "Eventos", value: "eventsCriteria" },
        { text: "Status", value: "status" }
      ],
      filterLed: [],
      showModal: false
    };
  },

  async created() {
    await this.listMembershipCriteria();
  },

  methods: {
    async listMembershipCriteria() {
      await this.MembershipCriteriaController.listMembershipCriteria(this.$api)
        .then((res) => {
          this.membresia = res.data;
          this.filter()
        })
        .catch((err) => {
          console.log(err);
        });
    },

    filter(){
      this.membresia.forEach(criteria => { 
        if (criteria.member.leader){
          if (criteria.member.leader.id == localStorage.getItem("user_id")){
            this.filterLed.push(criteria)
          }
        }
      })
    },

    formatPercentage(item) {
      console.log(item);
      if (item > 100) {
        return 100 + " %";
      } else return item + " %";
    },

    formatDate(item) {
      return moment(item).format("MM/YYYY");
    }
  }
};
</script>
