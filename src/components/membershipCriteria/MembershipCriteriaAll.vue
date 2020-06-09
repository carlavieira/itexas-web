<template>
  <v-container>
    <v-row class="px-4 pb-3">
      <h2>Critério de Membresia</h2>
      <v-spacer></v-spacer>
    </v-row>
    <v-divider class="pb-3"></v-divider>
    <v-card class="w-100">
      <v-row class="px-4 pt-3">
        <v-flex>
          <v-card-title>
            <v-text-field
              style="max-width: 300px;"
              v-model="search"
              append-icon="mdi-magnify"
              label="Pesquisar"
              single-line
              hide-details
            ></v-text-field>
            <v-spacer></v-spacer>
            <download-excel
              :fields="json_fields"
              :data="membresia"
              name="Criterio de Membresia Geral.xls"
            >
              <v-btn icon>
                <v-icon>mdi-file-excel</v-icon>
              </v-btn>
            </download-excel>
          </v-card-title>
        </v-flex>
      </v-row>
      <v-data-table
        no-data-text="Nenhum resultado até o momento"
        no-results-text="Nenhum resultado até o momento"
        :headers="header"
        :items="membresia"
        :search="search"
        :sort-by="['full_name', 'dayMonth']"
        :sort-desc="[false, false]"
        :loading="showBar"
        loading-text="Carregando..."
      >
        >
        <template v-slot:item.member="{ item }">{{
          item.member + " " + item.member.last_name
        }}</template>
        <template v-slot:item.member.leader="{ item }">
          <span v-if="item.member.leader">
            {{ item.member.leader.first_name }}
          </span>
          <span v-else> - </span>
        </template>
        <template v-slot:item.dayMonth="{ item }">
          <span v-if="item.dayMonth">{{ formatDate(item.dayMonth) }}</span>
        </template>
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
            v-if="item.status == 'RISCO'"
            class="ma-2"
            color="red"
            text-color="white"
            small
          >
            Risco
          </v-chip>
          <v-chip v-else class="ma-2" color="green" small text-color="white">
            Ideal
          </v-chip>
        </template>
      </v-data-table>
    </v-card>
  </v-container>
</template>

<script>
import MembershipCriteriaController from "../../controllers/MembershipCriteriaController";
import moment from "moment";

export default {
  data() {
    return {
      MembershipCriteriaController,
      showBar: true,
      header: [
        { text: "Nome", value: "full_name", align: "start" },
        {
          text: "Área",
          value: "member.department.abbreviation",
          align: "center",
        },
        { text: "Líder", value: "member.leader", align: "center" },
        { text: "Referência", value: "dayMonth", align: "center" },
        { text: "Office Hours", value: "officeHoursCriteria", align: "center" },
        { text: "Reuniões", value: "meetingsCriteria", align: "center" },
        { text: "Eventos", value: "eventsCriteria", align: "center" },
        { text: "Status", value: "status", align: "center" },
      ],
      search: "",
      membresia: [],
      showModal: false,
      json_fields: {
        Nome: {
          callback: (value) => {
            return `${value.member.first_name} ${value.member.last_name}`;
          },
        },
        Cargo: "member.post.abbreviation",
        Area: "member.department.abbreviation",
        Líder: {
          callback: (value) => {
            return `${value.member.leader.first_name} ${value.member.leader.last_name}`;
          },
        },
        Referência: {
          callback: (value) => {
            return moment(value.dayMonth).format("MM/YYYY");
          },
        },
        "Office Hours": {
          callback: (value) => {
            return `${value.officeHoursCriteria} %`;
          },
        },
        Reuniões: {
          callback: (value) => {
            return `${value.meetingsCriteria} %`;
          },
        },
        Eventos: {
          callback: (value) => {
            return `${value.eventsCriteria} %`;
          },
        },
        Status: "status",
      },
    };
  },

  watch: {
    membresia() {
      this.progressBar = false;
    },
  },

  async created() {
    await this.listMembershipCriteria();
  },

  methods: {
    async listMembershipCriteria() {
      await this.MembershipCriteriaController.listMembershipCriteria(this.$api)
        .then((res) => {
          console.log(res);
          this.membresia = this.setFullName(res.data);
          this.showBar = false;
        })
        .catch((err) => {
          console.log(err);
        });
    },

    formatPercentage(item) {
      if (item > 100) {
        return 100 + " %";
      } else return item + " %";
    },

    formatDate(item) {
      return moment(item).format("MM/YYYY");
    },
    setFullName(array) {
      const newArray = new Array();
      array.map((item) => {
        item.full_name = `${item.member.first_name} ${item.member.last_name}`;
        newArray.push(item);
      });
      return newArray;
    },
  },
};
</script>
