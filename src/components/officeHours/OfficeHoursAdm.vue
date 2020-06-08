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
          :items="departments"
          item-text="abbreviation"
          hide-details
          no-data-text="Sem áreas cadastradas"
          style="max-width: 300px;"
          class="pl-2"
          label="Áreas"
          v-model="search"
        ></v-select>
        <v-spacer></v-spacer>
             <download-excel :fields="json_fields" :data="officeHours" name="OfficeHours.xls">
               <v-btn icon>
              <v-icon>mdi-file-excel</v-icon>
            </v-btn>
             </download-excel>

      </v-card-title>

      <v-dialog v-model="dialog" max-width="500" min-h>
        <v-card>
          <v-card-title style="font-size: 16px !important" class="headline"
            >Deseja realmente deletar a office hour?</v-card-title
          >
          <v-card-actions>
            <v-spacer></v-spacer>

            <v-btn
              color="green darken-1"
              text
              @click="
                dialog = false;
                deleteItem(deletedItem);
              "
            >
              Sim
            </v-btn>

            <v-btn color="red darken-1" text @click="dialog = false">
              Não
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>

      <v-data-table
        :search="search"
        :sort-by="['date', 'checkin_time', 'member.first_name']"
        :sort-desc="[true, true, false]"
        no-data-text="Nenhuma office hour cadastrada"
        no-results-text="Sem resultados para a busca"
        :headers="header"
        :items="officeHours"
      >
        <template v-slot:item.member.first_name="{ item }"
          >{{ item.member.first_name }} {{ item.member.last_name }}</template
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
import memberController from "../../controllers/MemberController";

export default {
  components: {
    modalOfficeHours,
  },

  data() {
    return {
      memberController,
      officeHoursController,
      header: [
        { text: "Nome", value: "member.first_name" },
        { text: "Área", value: "member.department.abbreviation" },
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
      search: "",
      search1: "",
      departments: [],
      dialog: false,
      deletedItem: "",
      json_fields: {
        "Nome": "member.first_name",
        "Sobrenome": "member.last_name",
        "Cargo": "member.post.abbreviation",
        "Area": "member.department.abbreviation",
        "Check-in": "checkin_time",
        "Check-out": "checkout_time",
        "Duração": "duration"
      }
    };
  },

  async created() {
    await this.getOfficeHours();
    await this.getAllDepartments();
  },

  methods: {
    async getAllDepartments() {
      await this.memberController
        .getAllDepartments(this.$api)
        .then((res) => {
          console.log(res);
          this.departments = res.data;
        })
        .catch((e) => {
          console.log(e);
        });
    },

    async getOfficeHours() {
      await this.officeHoursController
        .listOfficeHour(this.$api)
        .then((res) => {
          this.officeHours = res.data;
          console.log(this.officeHours);
        })
        .catch((err) => {
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
