<template>
  <v-container>
    <v-snackbar top v-model="snackbar" :color="color" :timeout="timeout">{{
      text
    }}</v-snackbar>

    <v-row class="px-4">
      <h2>Membros</h2>
      <v-spacer></v-spacer>
      <v-btn
        v-if="$route.name == 'membersAdm'"
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
            @click:row="memberShow"
            class="dataTable"
          >
            <template v-slot:item.name="{ item }">
              <span class="font-weight-medium"
                >{{ item.first_name }} {{ item.last_name }}
              </span>
              <span class="font-italic font-weight-light">
                {{ showNickName(item) }}
              </span>
            </template>
            <template v-slot:item.leader="{ item }">
              <span v-if="item.leader"> {{ item.leader.first_name }} </span>
              <span v-else> - </span>
            </template>
          </v-data-table>
        </v-card>
      </v-flex>
    </v-row>
    <NovoMembro
      :show="btnMembro"
      v-if="btnMembro"
      @close="(btnMembro = false), reload('reload')"
      @getMembers="reload('create')"
    ></NovoMembro>
    <modalDetail
      v-if="showDetail"
      :show="showDetail"
      :Member="userDetail"
      @getMembers="reload('edit')"
      @close="(showDetail = false), reload('reload')"
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
      showNickName: (membro) => {
        if (membro.nickname) {
          return `(${membro.nickname})`;
        }
      },
      memberController,
      search: "",
      headersMembros: [
        {
          text: "Nome",
          align: "start",
          value: "name",
        },
        { text: "Cargo", value: "post.abbreviation" },
        { text: "Área", value: "department.abbreviation" },
        { text: "Líder", value: "leader" },
      ],
      membros: [],
      userDetail: null,
      showDetail: false,
      snackbar: false,
      text: "",
      timeout: 3000,
      color: "",
    };
  },

  methods: {
    memberShow(user) {
      this.userDetail = user;
      this.showDetail = true;
    },

    setSnackbar(text, color) {
      this.text = text;
      this.color = color;
      this.snackbar = true;
    },

    async reload(status) {
      if (status == "create")
        this.setSnackbar("Membro cadastrado com sucesso", "success");
      if (status == "edit")
        this.setSnackbar("Membro editado com sucesso", "success");
      this.membros = this.setFullName(await this.getMembers());
    },

    async getMembers() {
      const members = await this.memberController.getAllMembers(this.$api);
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

<style scoped>
.dataTable:hover {
  cursor: pointer;
}
</style>
