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
      :headers="headers"
      :items="desserts"
      :single-expand="singleExpand"
      :expanded.sync="expanded"
      item-key="name"
      show-expand
      class="elevation-1"
    >
      <template v-slot:top>
        <v-toolbar flat color="white">
          <v-toolbar-title>Expandable Table</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-switch v-model="singleExpand" label="Single expand" class="mt-2"></v-switch>
        </v-toolbar>
      </template>
      <template v-slot:expanded-item="{ headers }">
        <td :colspan="headers.length">
          <v-simple-table>
            <template v-slot:default>
              <thead>
                <tr>
                  <th>Nome</th>
                  <th>Líder</th>
                  <th>Area</th>
                  <th>Data de Entrada</th>
                  <th>Detalhes</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="dessert in desserts" :key="dessert.name">
                  <td>{{ dessert.name }}</td>
                  <td>{{ dessert.calories * 4 }}</td>
                  <td>{{ dessert.fat * 4 }}</td>
                  <td>{{ dessert.carbs * 4 }}</td>
                  <td>{{ dessert.carbs * 4 }}</td>
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

export default {
  data() {
    return {
      expanded: [],
      singleExpand: false,
      headers: [
        {
          text: "Dessert (100g serving)",
          align: "left",
          sortable: false,
          value: "name"
        },
        { text: "Calories", value: "calories" },
        { text: "Fat (g)", value: "fat" },
        { text: "Carbs (g)", value: "carbs" },
        { text: "Protein (g)", value: "protein" },
        { text: "Iron (%)", value: "iron" },
        { text: "", value: "data-table-expand" }
      ],
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
        },
        {
          name: "Cupcake",
          calories: 305,
          fat: 3.7,
          carbs: 67,
          protein: 4.3,
          iron: "8%"
        },
        {
          name: "Gingerbread",
          calories: 356,
          fat: 16.0,
          carbs: 49,
          protein: 3.9,
          iron: "16%"
        },
        {
          name: "Jelly bean",
          calories: 375,
          fat: 0.0,
          carbs: 94,
          protein: 0.0,
          iron: "0%"
        },
        {
          name: "Lollipop",
          calories: 392,
          fat: 0.2,
          carbs: 98,
          protein: 0,
          iron: "2%"
        },
        {
          name: "Honeycomb",
          calories: 408,
          fat: 3.2,
          carbs: 87,
          protein: 6.5,
          iron: "45%"
        },
        {
          name: "Donut",
          calories: 452,
          fat: 25.0,
          carbs: 51,
          protein: 4.9,
          iron: "22%"
        },
        {
          name: "KitKat",
          calories: 518,
          fat: 26.0,
          carbs: 65,
          protein: 7,
          iron: "6%"
        }
      ],

      postController,
      header: [
        { text: "Sigla", value: "abbreviation" },
        { text: "Título", value: "full_name" },
        { text: "Ações", value: "actions", sortable: false }
      ],
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
          this.posts = res.data;
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
  
