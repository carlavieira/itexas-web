<template>
  <v-container>
    <v-row class="px-4 pb-3">
      <h2>Office Hours</h2>
      <v-spacer></v-spacer>
    </v-row>
    <v-card class="w-100">
      <v-card-title>
        <v-text-field
          style="max-width: 300px;"
          v-model="search"
          append-icon="mdi-magnify"
          label="Pesquisar"
          single-line
          hide-details
        ></v-text-field>
        <v-select
          :items="cargos"
          hide-details
          style="max-width: 300px;"
          class="pl-2"
          label="Cargo"
          v-model="search"
        ></v-select>
      </v-card-title>

      <v-data-table
        :search="search"
        :sort-by="['date', 'checkin_time', 'member.first_name']"
        :sort-desc="[true, true, false]"
        no-data-text="Nenhuma office hour cadastrada"
        no-results-text="Sem resultados para a busca"
        :headers="header"
        :items="officeHours"
      >
        <template
          v-slot:item.member.first_name="{ item }"
        >{{ item.member.first_name }} {{ item.member.last_name }}</template>
        <template v-slot:item.date="{ item }">{{ formatDate(item.date) }}</template>
        <template v-slot:item.checkin_time="{ item }">{{ format(item.checkin_time) }}</template>
        <template v-slot:item.checkout_time="{ item }">
          <span v-if="item.checkout_time">{{ format(item.checkout_time) }}</span>
        </template>
        <template v-slot:item.actions="{ item }">
          <v-icon small @click="edit(item)">mdi-pencil</v-icon>
          <v-icon class="pl-3" small @click="deleteItem(item)">mdi-delete</v-icon>
        </template>
      </v-data-table>
    </v-card>

    <modalOfficeHours
      v-if="showModal"
      :show="showModal"
      :type="type"
      :officeHour="oh"
      @close="showModal = false"
      @reload="getOfficeHours()"
    ></modalOfficeHours>
  </v-container>
</template>

<script>
import modalOfficeHours from "./ModalOfficeHours.vue";
import officeHoursController from "../../controllers/OfficeHoursController";
import moment from "moment";

export default {
  components: {
    modalOfficeHours
  },

  data() {
    return {
      officeHoursController,
      header: [
        { text: "Nome", value: "member.first_name" },
        { text: "Cargo", value: "member.post" },
        { text: "Data", value: "date" },
        { text: "Check-in", value: "checkin_time" },
        { text: "Check-out", value: "checkout_time" },
        { text: "Duração", value: "duration" },
        { text: "Ações", value: "actions", sortable: false }
      ],
      officeHours: [],
      type: null,
      showModal: false,
      oh: {},
      search: "",
      search1: "",
      cargos: [ "teste", "teste1", ""]
    };
  },

  async created() {
    await this.getOfficeHours();
  },

  methods: {
    async getOfficeHours() {
      await this.officeHoursController
        .listOfficeHour(this.$api)
        .then(res => {
          this.officeHours = res.data;
          console.log(this.officeHours);
        })
        .catch(err => {
          console.log(err);
        });
    },

    edit(item) {
      this.type = "edit";
      this.showModal = true;
      this.oh = item;
    },

    async deleteItem(item) {
      await this.officeHoursController
        .deleteOfficeHour(this.$api, item)
        .then(res => {
          console.log(res);
          this.getOfficeHours();
        })
        .catch(e => {
          console.log(e);
        });
    },

    format(item) {
      return moment(item).format("HH:mm:ss");
    },

    formatDate(item) {
      return moment(item).format("DD/MM/YYYY");
    }
  }
};
</script>