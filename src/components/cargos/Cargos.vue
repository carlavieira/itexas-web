<template>
  <div>
    <v-row class="px-4 pb-3">
      <h2>Cargos</h2>
      <v-spacer></v-spacer>
      <v-btn
        @click="createPostDialog = true"
        title="Cadastrar novo Cargo"
        small
        color="secondary"
        fab
      >
        <v-icon>mdi-plus</v-icon>
      </v-btn>

      <v-dialog v-model="createPostDialog" persistent max-width="700" min-h>
        <v-card>
          <v-card-title
            class="title-table pt-3 py-4 pb-0 headline"
            style="font-size: 16px !important"
            >Cadastro do Cargo</v-card-title
          >
          <v-card-actions>
            <v-spacer></v-spacer>
            <template>
              <v-container fluid>
                <v-row>
                  <v-col class="d-flex" cols="12" sm="6">
                    <v-text-field
                      v-model="abbreviation"
                      label="Sigla"
                      prepend-inner-icon="mdi-account"
                      dense
                      outlined
                    ></v-text-field>
                  </v-col>
                  <v-col class="d-flex" cols="12" sm="6">
                    <v-text-field
                      v-model="postName"
                      label="Nome"
                      prepend-inner-icon="mdi-account"
                      dense
                      outlined
                    ></v-text-field>
                  </v-col>
                </v-row>
                <v-col class="d-flex" cols="12" sm="6">
                  <v-btn
                    color="green darken-1"
                    text
                    @click="
                      createPostDialog = false;
                      submit();
                    "
                    >Cadastrar</v-btn
                  >

                  <v-btn
                    color="red darken-1"
                    text
                    @click="createPostDialog = false"
                    >Cancelar</v-btn
                  >
                </v-col>
              </v-container>
            </template>
          </v-card-actions>
        </v-card>
      </v-dialog>

      <v-dialog v-model="editPostDialog" persistent max-width="600" min-h>
        <v-card style="background-color: #f5f5f5">
          <v-container>
            <v-row class="px-4 py-2">
              <h3 class="headline font-weight-bold subtitle-1">
                Edição do Cargo
              </h3>
              <v-spacer></v-spacer>
              <v-btn @click="editPostDialog = false" title="Fechar" icon>
                <v-icon color="grey">mdi-close</v-icon>
              </v-btn>
            </v-row>
          </v-container>
          <v-card-actions>
            <v-spacer></v-spacer>
            <template>
              <v-container fluid class="py-0">
                <v-row>
                  <v-col class="d-flex" cols="12" sm="6">
                    <v-text-field
                      v-model="abbreviation"
                      label="Sigla"
                      prepend-inner-icon="mdi-account"
                      dense
                      outlined
                    ></v-text-field>
                  </v-col>
                  <v-col class="d-flex" cols="12" sm="6">
                    <v-text-field
                      v-model="postName"
                      label="Nome"
                      prepend-inner-icon="mdi-account"
                      dense
                      outlined
                    ></v-text-field>
                  </v-col>
                </v-row>

                <template>
                  <v-card>
                    <v-card-title class="title-table pt-3 py-4 pb-0">
                      Membros
                    </v-card-title>
                    <v-data-table
                      v-model="selected"
                      :headers="headers"
                      :items="membersInTable"
                      item-key="name"
                      class="elevation-1"
                      :hide-default-footer="true"
                      :footer-props="{
                        itemsPerPageOptions: [-1],
                      }"
                    >
                      <template v-slot:item.name="{ item }">
                        <span> {{ getFullName(item) }} </span>
                      </template>
                      <template v-slot:item.leader="{ item }">
                        <span> {{ getFullNameLeader(item.leader) }} </span>
                      </template>
                    </v-data-table>
                  </v-card>
                </template>

                <v-col class="d-flex" cols="12" sm="6">
                  <v-btn
                    color="green darken-1"
                    text
                    @click="
                      editPostDialog = false;
                      sendPutRequest();
                    "
                    >Editar</v-btn
                  >

                  <v-btn
                    color="red darken-1"
                    text
                    @click="editPostDialog = false"
                    >Cancelar</v-btn
                  >
                </v-col>
              </v-container>
            </template>
          </v-card-actions>
        </v-card>
      </v-dialog>
      <v-dialog v-model="deletePostDialog" persistent max-width="500" min-h>
        <v-card>
          <v-card-title style="font-size: 16px !important" class="headline">
            <p>Deseja realmente deletar esta cargo?</p>
            <span style="font-size: 14px" class=" font-weight-light">
              Isso fará com que todos integrantes da {{ deletedItem }} fiquem
              sem cargo.
            </span>
          </v-card-title>
          <v-card-actions>
            <v-spacer></v-spacer>

            <v-btn
              color="red darken-1"
              text
              @click="
                deletePostDialog = false;
                deleteItem();
              "
            >
              DELETAR CARGO
            </v-btn>

            <v-btn text @click="deletePostDialog = false">
              Voltar
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>

    <v-data-table
      class="elevation-1 tabela"
      :headers="header"
      :items="posts"
      :single-expand="singleExpand"
      :expanded.sync="expanded"
      :hide-default-footer="true"
      item-key="id"
      show-expand
    >
      <template v-slot:item.actions="{ item }">
        <v-icon small @click="edit(item)">mdi-pencil</v-icon>
        <v-icon class="pl-3" small @click="deletePost(item)">mdi-delete</v-icon>
      </template>
      <template v-slot:expanded-item="{ item }">
        <td :colspan="5">
          <v-simple-table>
            <template v-slot:default>
              <thead>
                <tr class="headerTable">
                  <th>Nome</th>
                  <th>Líder</th>
                  <th>Area</th>
                  <th>Data de Entrada</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="member in membersInPost[item.id]" :key="member.id">
                  <td>{{ member.first_name }}</td>
                  <td>{{ member.leader.first_name }}</td>
                  <td>{{ member.department.abbreviation }}</td>
                  <td>{{ member.date_joined }}</td>
                </tr>
              </tbody>
            </template>
          </v-simple-table>
        </td>
      </template>
    </v-data-table>
  </div>
</template>
<script>
import postController from "../../controllers/PostController";
import memberController from "../../controllers/MemberController";

export default {
  data() {
    return {
      expanded: [],
      singleExpand: false,
      postController,
      memberController,
      header: [
        { text: "Sigla", value: "abbreviation" },
        { text: "Título", value: "full_name" },
        { text: "Ações", value: "actions", sortable: false },
      ],
      membersInPost: {},
      membersInTable: [],
      createPostDialog: false,
      editPostDialog: false,
      deletePostDialog: false,
      postName: "",
      abbreviation: "",
      posts: [],
      postDetail: null,
      type: null,
      showModal: false,
      tablePosts: {},
      deletedItem: "",
      selected: [],
      headers: [
        {
          text: "Nome",
          align: "left",
          sortable: false,
          value: "name",
        },
        { text: "Líder", value: "leader" },
      ],
    };
  },
  async created() {
    await this.getPosts();
  },
  methods: {
    async getPosts() {
      await this.postController
        .getPosts(this.$api)
        .then((res) => {
          const allPosts = res.data;
          this.posts = res.data;

          allPosts.forEach((post) => {
            this.memberController
              .getMembersInPost(this.$api, post.id)
              .then((res) => {
                this.membersInPost[post.id] = res;
              });
          });
          console.log(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getFullName: (membro) => `${membro.first_name} ${membro.last_name}`,
    getFullNameLeader: (leader) => `${leader.first_name} ${leader.last_name}`,

    async submit() {
      const post = {
        full_name: this.postName,
        abbreviation: this.abbreviation,
      };
      await this.postController.createPost(this.$api, post).then(this.getPosts);
      this.showModal = true;
    },

    async edit(item) {
      this.postName = item.full_name;
      this.abbreviation = item.abbreviation;
      this.editPostDialog = true;
      this.postDetail = {
        id: item.id,
        full_name: this.postName,
        abbreviation: this.abbreviation,
      };
      this.membersInTable = this.membersInPost[item.id];
    },

    async deletePost(item) {
      this.deletePostDialog = true;
      this.deletedItem = item.full_name;
      this.postName = item.full_name;
      this.postDetail = {
        id: item.id,
      };
    },

    async sendPutRequest() {
      this.postDetail.full_name = this.postName;
      this.postDetail.abbreviation = this.abbreviation;
      await this.postController
        .editPost(this.$api, this.postDetail)
        .then(this.getPosts);
    },

    async deleteItem() {
      await this.postController
        .deletePost(this.$api, this.postDetail.id)
        .then(this.getPosts);
    },
  },
};
</script>
<style scoped>
th {
  background-color: rgb(48, 48, 48);
  color: white !important;
}
.v-data-table th {
  height: 34px !important;
}
.v-data-table td {
  height: 34px !important;
}
.title-table {
  padding: 8px, 16px, 0 !important;
}
</style>
