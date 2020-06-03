<template>
  <v-container>
    <h2>Dashboard</h2>
    <h3 class="mt-4">
      Meu critério do mês {{ formatDate(membresia.dayMonth) }}:
    </h3>
    <v-card>
      <v-data-table
        no-data-text="Nenhum resultado até o momento"
        no-results-text="Nenhum resultado até o momento"
        :headers="header"
        :items="membresia"
        :hide-default-footer="true"
        :footer-props="{
          itemsPerPageOptions: [-1],
        }"
      >
        <template v-slot:item.officeHoursCriteria="{ item }">
          <v-chip
            v-if="item.officeHoursCriteria == 100.0"
            class="ma-2"
            color="white"
            text-color="green"
            >{{ formatPercentage(item.officeHoursCriteria) }}</v-chip
          >
          <v-chip
            v-else-if="item.officeHoursCriteria < 80.0"
            class="ma-2"
            color="white"
            text-color="red"
            >{{ formatPercentage(item.officeHoursCriteria) }}</v-chip
          >
          <v-chip v-else class="ma-2" color="white" text-color="black">{{
            formatPercentage(item.officeHoursCriteria)
          }}</v-chip>
        </template>
        <template v-slot:item.meetingsCriteria="{ item }">
          <v-chip
            v-if="item.meetingsCriteria == 100.0"
            class="ma-2"
            color="white"
            text-color="green"
            >{{ formatPercentage(item.meetingsCriteria) }}</v-chip
          >
          <v-chip
            v-else-if="item.meetingsCriteria < 75.0"
            class="ma-2"
            color="white"
            text-color="red"
            >{{ formatPercentage(item.meetingsCriteria) }}</v-chip
          >
          <v-chip v-else class="ma-2" color="white" text-color="black">{{
            formatPercentage(item.meetingsCriteria)
          }}</v-chip>
        </template>
        <template v-slot:item.eventsCriteria="{ item }">
          <v-chip
            v-if="item.eventsCriteria == 100.0"
            class="ma-2"
            color="white"
            text-color="green"
            >{{ formatPercentage(item.eventsCriteria) }}</v-chip
          >
          <v-chip
            v-else-if="item.eventsCriteria < 50.0"
            class="ma-2"
            color="white"
            text-color="red"
            >{{ formatPercentage(item.eventsCriteria) }}</v-chip
          >
          <v-chip v-else class="ma-2" color="white" text-color="black">{{
            formatPercentage(item.eventsCriteria)
          }}</v-chip>
        </template>

        <template v-slot:item.status="{ item }">
          <v-chip
            v-if="(item.status = 'Risco')"
            class="ma-2"
            color="red"
            text-color="white"
            small
            >{{ item.status }}</v-chip
          >
          <v-chip v-else class="ma-2" color="white" text-color="black">
            {{ item.status }}
          </v-chip>
        </template>
      </v-data-table>
    </v-card>
  </v-container>
</template>

<script>
import eventController from "../controllers/EventController";
import membershipCriteriaController from "../controllers/MembershipCriteriaController";
import moment from "moment";

export default {
  data() {
    return {
      eventController,
      membershipCriteriaController,
      moment,
      header: [
        { text: "Office Hours", value: "officeHoursCriteria" },
        { text: "Reuniões", value: "meetingsCriteria" },
        { text: "Eventos", value: "eventsCriteria" },
        { text: "Status", value: "status" },
      ],
      membresia: [],
    };
  },
  async created() {
    await this.getEventsMonth();
    await this.getCurrentMonthCriteria();
  },
  methods: {
    async getEventsMonth() {
      const eventsMonth = await this.eventController.getEventsInMonth(
        this.$api
      );
      console.log(eventsMonth);
    },
    async getCurrentMonthCriteria() {
      await this.membershipCriteriaController
        .listCurrentMonthCriteria(this.$api)
        .then((res) => {
          this.membresia = res.data;
        })
        .catch((err) => {
          console.log(err);
        });

      console.log(this.membresia);
    },
    formatPercentage(item) {
      console.log(item);
      if (item > 100) {
        return 100 + " %";
      } else return item + " %";
    },

    formatDate(item) {
      return moment(item).format("MM/YYYY");
    },
  },
};
</script>

<style lang="scss" scoped></style>
