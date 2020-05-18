<template>
  <div>
    <v-row class="px-4 pb-3">
      <h2>Cargos</h2>
      <v-spacer></v-spacer>
      <v-btn
        @click="createPostDialog=true"
        title="Cadastrar novo Cargo"
        small
        color="secondary"
        fab
      >
        <v-icon>mdi-plus</v-icon>
      </v-btn>

      <v-dialog v-model="createPostDialog" max-width="700" min-h>
        <v-card>
          <v-card-title style="font-size: 16px !important" class="headline">Cadastro do Cargo</v-card-title>
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
                  <v-col class="d-flex" cols="12" sm="11">
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
                    @click="createPostDialog = false; submit()"
                  >Cadastrar</v-btn>

                  <v-btn color="red darken-1" text @click="createPostDialog = false">Cancelar</v-btn>
                </v-col>
              </v-container>
            </template>
          </v-card-actions>
        </v-card>
      </v-dialog>

      <v-dialog v-model="editPostDialog" max-width="500" min-h>
        <v-card>
          <v-card-title style="font-size: 16px !important" class="headline">Edição do Cargo</v-card-title>
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
                  <v-col class="d-flex" cols="12" sm="11">
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
                  editPostDialog = false;
                  sendPutRequest()
                "
                  >Editar</v-btn>

                  <v-btn color="red darken-1" text @click="editPostDialog = false">Cancelar</v-btn>
                </v-col>
              </v-container>
            </template>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>

    <v-data-table
      :headers="header"
      :items="posts"
      :single-expand="singleExpand"
      :expanded.sync="expanded"
      item-key="id"
      show-expand
      class="elevation-1"
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
                <tr>
                  <th>Nome</th>
                  <th>Líder</th>
                  <th>Area</th>
                  <th>Data de Entrada</th>
                  <th>Detalhes</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="member in membersInPost[item.id]" :key="member.id">
                  <td>{{ member.first_name }}</td>
                  <td>{{ member.leader.first_name }}</td>
                  <td>{{ member.department.abbreviation }}</td>
                  <td>{{ member.date_joined}}</td>
                  <td>
                    <v-icon small>mdi-account-details</v-icon>
                  </td>
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
      singleExpand: true,
      desserts: [
        {
          name: "Frozen Yogurt",
          calories: 159,
          fat: 6.0,
          carbs: 24,
          protein: 4.0,
          iron: "1%"
        },
        {
          name: "Ice cream sandwich",
          calories: 237,
          fat: 9.0,
          carbs: 37,
          protein: 4.3,
          iron: "1%"
        },
        {
          name: "Eclair",
          calories: 262,
          fat: 16.0,
          carbs: 23,
          protein: 6.0,
          iron: "7%"
        }
      ],
      postController,
      memberController,
      header: [
        { text: "Sigla", value: "abbreviation" },
        { text: "Título", value: "full_name" },
        { text: "Ações", value: "actions", sortable: false }
      ],
      membersInPost: {},
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
      search: "",
      deletedItem: ""
    };
  },
  async created() {
    await this.getPosts();
  },
  methods: {
    async getPosts() {
      await this.postController
        .getPosts(this.$api)
        .then(res => {
          const allPosts = res.data;
          this.posts = res.data;

          allPosts.forEach(post => {
            this.memberController
              .getMembersInPost(this.$api, post.id)
              .then(res => {
                this.membersInPost[post.id] = res;
                /*console.log(getMembersInPost); */
              });
          });
          console.log(this.membersInPost);
          console.log(res.data);
        })
        .catch(err => {
          console.log(err);
        });
    },

    async submit() {
      const post = {
        full_name: this.postName,
        abbreviation: this.abbreviation
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
        abbreviation: this.abbreviation
      };
    },

    async deletePost(item) {
      this.deletePostDialog = true;
      this.deletedItem = item.full_name;
      this.postName = item.full_name;
      this.postDetail = {
        id: item.id
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
    }
  }
};
</script>
  
