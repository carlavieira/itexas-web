<template>
  <v-container>
    <v-row class="px-4">
      <h2>Membros</h2>
      <v-spacer></v-spacer>
      <v-btn
        v-if="$route.name == 'members'"
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
            :sort-by="'full_name'"
            :sort-desc="false"
          >
            <template v-slot:item.member="{ item }">{{
              item.full_name
            }}</template>
            <template v-slot:item.leader="{ item }">
              <span v-if="item.leader"> {{ item.leader.first_name }} </span>
              <span v-else> - </span>
            </template>
            <template v-slot:item.actions="{ item }">
              <v-icon small @click="memberShow(item)"
                >mdi-account-details</v-icon
              >
            </template>
          </v-data-table>
        </v-card>
      </v-flex>
    </v-row>
    <NovoMembro
      :show="btnMembro"
      @close="btnMembro = false"
      @getMembers="getMembers()"
    ></NovoMembro>
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
import modalDetail from "./ModalDetail.vue";

export default {
  components: {
    NovoMembro,
    modalDetail,
  },

  async created() {
    //this.membros = await this.getMembers()
    this.membros = this.setFullName(await this.getMembers());
    //this.membros = this.setFullName(this.membros);
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
          value: "full_name",
        },
        { text: "Cargo", value: "post.name" },
        { text: "Área", value: "department.name" },
        { text: "Líder", value: "leader" },
        { text: "Detalhes", value: "actions", sortable: false },
      ],
      membros: [],
      userDetail: null,
      showDetail: false,
    };
  },

  methods: {
    memberShow(user) {
      console.log(user);
      this.userDetail = user;
      this.showDetail = true;
    },
    async getMembers() {
      const members = await this.memberController.getAllMembers(this.$api);
      console.log(members);
      members.forEach((member) => {
        if (!member.leader) {
          member.leader = { first_name: "-" };
        }
      });

      return members;
    },
    setFullName(array) {
      const newArray = new Array();
      array.map((item) => {
        item.full_name = `${item.first_name} ${item.last_name}`;
        newArray.push(item);
      });

      return newArray;
    },
  },
};
</script>
