<template>
  <v-container>
    <v-row class="px-4">
      <h2>Membros</h2>
      <v-spacer></v-spacer>
      <v-btn
        @click="btnMembro = true"
        title="Cadastrar novo membro"
        small
        color="secondary"
        fab
      >
        <v-icon>mdi-plus</v-icon>
      </v-btn>
    </v-row>
    <v-row class="px-4 pt-3">
      <v-flex>
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
          </v-card-title>
          <v-data-table
            no-data-text="Nenhum membro cadastrado"
            no-results-text="Nenhum membro encontrado"
            :headers="headersMembros"
            :items="membros"
            :search="search"
          >
            <template v-slot:item.actions="{ item }">
              <v-icon small @click="memberShow(item)"
                >mdi-account-details</v-icon
              >
            </template>
          </v-data-table>
        </v-card>
      </v-flex>
    </v-row>
    <NovoMembro :show="btnMembro" @close="btnMembro = false"></NovoMembro>
    <modalDetail
      v-if="showDetail"
      :show="showDetail"
      :member="userDetail"
      @close="showDetail = false"
    ></modalDetail>
  </v-container>
</template>

<script>
import NovoMembro from "./CadastrarMembro.vue";
import memberController from "../../controllers/MemberController";
/* Ajeitar futuramente para os imports irem no main.js */
import axios from "axios";
import Vue from "vue";
import modalDetail from "./ModalDetail.vue";

Vue.prototype.$http = axios;

export default {
  components: {
    NovoMembro,
    modalDetail,
  },

  async created() {
    let res = await this.memberController.getAllMembers(axios);
    this.membros = res;
  },

  data() {
    return {
      btnMembro: false,
      memberController,
      search: "",
      headersMembros: [
        {
          text: "Nome",
          align: "start",
          value: "first_name",
        },
        { text: "Cargo", value: "post" },
        { text: "Área", value: "department" },
        { text: "Líder", value: "leader" },
        { text: "Detalhes", value: "actions", sortable: false },
      ],
      membros: [
        {
          first_name: "Otavio",
          post: "Leader",
          leader: "Daniel",
        },
        {
          first_name: "Otavio",
          post: "Leader",
          leader: "Daniel",
        },
        {
          first_name: "Otavio",
          post: "Leader",
          leader: "Daniel",
        },
        {
          first_name: "Otavio",
          post: "Leader",
          leader: "Daniel",
        },
      ],
      userDetail: null,
      showDetail: false,
    };
  },

  methods: {
    memberShow(user) {
      this.userDetail = user;
      this.showDetail = true;
    },
  },
};
</script>
