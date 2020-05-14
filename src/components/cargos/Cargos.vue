<template>
  <v-container>
    <v-row class="px-4 pb-3">
      <h2>Cargos</h2>
      <v-spacer></v-spacer>
      <v-btn @click="createPostDialog=true" title="Cadastrar novo Cargo" small color="secondary" fab>
        <v-icon>mdi-plus</v-icon>
      </v-btn>
      
      <v-dialog v-model="createPostDialog" max-width="500" min-h>
      <v-card>
        <v-card-title
          style="font-size: 16px !important"
          class="headline"
        >Cadastro do Cargo</v-card-title>
        <v-card-actions>
          <v-spacer></v-spacer>
          <template class="col-12" sm="10" md="10" lg="10">
            <v-text-field
              v-model="postName"
              label="Nome do Cargo"
              prepend-inner-icon="mdi-account"
              dense
              outlined
            ></v-text-field>
          </template>
         
              
          <v-btn
            color="green darken-1"
            text
            @click="
                  createPostDialog = false;
                  submit()
                "
          >Cadastrar</v-btn>

          <v-btn color="red darken-1" text @click="createPostDialog = false">Cancelar</v-btn>
        </v-card-actions>
        </v-card>
      </v-dialog>
      
      <v-dialog v-model="editPostDialog" max-width="500" min-h>
      <v-card>
        <v-card-title
          style="font-size: 16px !important"
          class="headline"
        >Edição do Cargo</v-card-title>
        <v-card-actions>
          <v-spacer></v-spacer>
          <template class="col-12" sm="10" md="10" lg="10">
            <v-text-field
              v-model="postName"
              label="Nome do Cargo"
              prepend-inner-icon="mdi-account"
              dense
              outlined
            ></v-text-field>
          </template>
         
              
          <v-btn
            color="green darken-1"
            text
            @click="
                  editPostDialog = false;
                  sendRequest()
                "
          >Editar</v-btn>

          <v-btn color="red darken-1" text @click="editPostDialog = false">Cancelar</v-btn>
        </v-card-actions>
        </v-card>
      </v-dialog>

    </v-row>
    <v-divider class="pb-3"></v-divider>
    <v-card class="w-100">
    <v-data-table :sort-by="['name']" :sort-desc="[true, true]" 
    no-data-text="Nenhum cargo adicionado" 
    no-results-text="Sem resultados para a busca" :headers="header" :items="posts">
      <template v-slot:item.actions="{ item }">
        <v-icon small @click="edit(item)">mdi-pencil</v-icon>
        <v-icon class="pl-3" small @click="deleteItem(item)">mdi-delete</v-icon>
      </template> 
    </v-data-table>
    </v-card>
    
  </v-container>
</template>

<script>
import postController from "../../controllers/PostController"


export default {
  components: {

  },

  data() {
    return {
      postController,
      header: [
        { text: "Título", value: "name" },
        { text: "Ações", value: "actions", sortable: false }
      ],
      createPostDialog: false,
      editPostDialog: false,
      postName: "",
      posts: [],
      postDetail: null,
      type: null,
      showModal: false,
      tablePosts: {},
      search: "",
      deletedItem: ""
    };
  },

  async created(){
    await this.getPosts()
  },

  methods: {
    async getPosts(){
      await this.postController.getPosts(this.$api)
      .then(res => {
        this.posts = res.data
      }).catch(err => {
        console.log(err)
      })
    },

    async submit(){
      const postName = {
        name: this.postName,
      }
      console.log(postName)
      await this.postController.createPost(this.$api, postName) 
      this.showModal = true
    },

    async edit(item) {
      console.log(item)
      this.postName=item.name
      this.editPostDialog=true
      this.postDetail = {
        id: item.id,
        name: this.postName,
      }
      
    },
    
    async sendRequest() {
      await this.postController.editPost(this.$api, this.postDetails)
    }
    
  }
};
</script>