<template>
  <v-container>
    <v-row class="px-4 pb-3">
      <h2>Office Hours</h2>
      <v-spacer></v-spacer>
      <v-btn
        @click="add()"
        title="Cadastrar novo membro"
        small
        color="secondary"
        fab
      >
        <v-icon>mdi-plus</v-icon>
      </v-btn>
    </v-row>

    <v-dialog v-model="dialog" max-width="500" min-h>
      <v-card>
        <v-card-title style="font-size: 16px !important" class="headline"
          >Deseja realmente deletar a office hour?</v-card-title
        >
        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn color="red darken-1" text @click="dialog = false">Não</v-btn>
          <v-btn
            color="green darken-1"
            text
            @click="
              dialog = false;
              deleteItem(deletedItem);
            "
            >Sim</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-divider class="pb-3"></v-divider>
    <v-card class="w-100">
      <v-data-table
        :sort-by="['date', 'checkin_time']"
        :sort-desc="[true, true]"
        no-data-text="Nenhuma office hour cadastrada"
        no-results-text="Sem resultados para a busca"
        :headers="header"
        :items="officeHours"
      >
        <template v-slot:item.date="{ item }">{{
          formatDate(item.date)
        }}</template>
        <template v-slot:item.checkin_time="{ item }">{{
          format(item.checkin_time)
        }}</template>
        <template v-slot:item.checkout_time="{ item }">
          <span v-if="item.checkout_time">{{
            format(item.checkout_time)
          }}</span>
        </template>
        <template v-slot:item.duration="{ item }">
          <span v-if="item.duration">{{ formatDuration(item.duration) }}</span>
        </template>
        <template v-slot:item.actions="{ item }">
          <v-icon small @click="edit(item)">mdi-pencil</v-icon>
          <v-icon
            class="pl-3"
            small
            @click="(dialog = true), (deletedItem = item)"
            >mdi-delete</v-icon
          >
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
    modalOfficeHours,
  },

  data() {
    return {
      officeHoursController,
      header: [
        { text: "Data", value: "date" },
        { text: "Check-in", value: "checkin_time" },
        { text: "Check-out", value: "checkout_time" },
        { text: "Duração", value: "duration" },
        { text: "Ações", value: "actions", sortable: false },
      ],
      officeHours: [],
      type: null,
      showModal: false,
      oh: {},
      dialog: false,
      deletedItem: "",
    };
  },

  async created() {
    await this.getOfficeHours();
  },

  methods: {
    async getOfficeHours() {
      this.$emit("reload");
      await this.officeHoursController
        .getOfficeHours(this.$api)
        .then((res) => {
          this.officeHours = res.data;
        })
        .catch((err) => {
          console.log(err);
        });
    },

    add() {
      this.type = "add";
      this.showModal = true;
      this.oh = {
        date: null,
        checkin_time: null,
        checkout_time: null,
      };
    },

    edit(item) {
      this.type = "edit";
      this.showModal = true;
      this.oh = item;
    },

    async deleteItem(item) {
      await this.officeHoursController
        .deleteOfficeHour(this.$api, item)
        .then((res) => {
          console.log(res);
          this.getOfficeHours();
        })
        .catch((e) => {
          console.log(e);
        });
    },

    format(item) {
      return moment(item).format("HH:mm:ss");
    },

    formatDate(item) {
      return moment(item).format("DD/MM/YYYY");
    },
    formatDuration(item) {
      const timeSplit = item.split(":");
      const secondsSplit = timeSplit[2].split(".");
      return `${timeSplit[0]}:${timeSplit[0]}:${secondsSplit[0]}`;
    },
  },
};
</script>
