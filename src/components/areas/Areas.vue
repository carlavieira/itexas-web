<template>
  <v-container>
    <v-row class="px-4 pb-3">
      <h2>Áreas</h2>
      <v-spacer></v-spacer>
      <v-btn @click="createDepartmentDialog=true" title="Cadastrar nova área" small color="secondary" fab>
        <v-icon>mdi-plus</v-icon>
      </v-btn>
      
      <v-dialog v-model="createDepartmentDialog" max-width="500" min-h>
      <v-card>
        <v-card-title
          style="font-size: 16px !important"
          class="headline"
        >Cadastro de Área</v-card-title>
        <v-card-actions>
          <v-spacer></v-spacer>
          <template>
            <v-container fluid>
              <v-row align="left">
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
                    v-model="departmentName"
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
                  @click="createDepartmentDialog = false; submit()"
                >Cadastrar</v-btn>

          <v-btn color="red darken-1" text @click="createDepartmentDialog = false">Cancelar</v-btn>
              </v-col>
            </v-container>
          </template>
        </v-card-actions>
        </v-card>
      </v-dialog>
      
      <v-dialog v-model="editDepartmentDialog" max-width="700" min-h>
      <v-card>
        <v-card-title
          style="font-size: 16px !important"
          class="headline"
        >Edição da Área</v-card-title>
        <v-card-actions>
           <v-spacer></v-spacer>
          <template>
            <v-container fluid>
              <v-row align="left">
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
                    v-model="departmentName"
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
                  editDepartmentDialog = false;
                  sendPutRequest()
                "
          >Editar</v-btn>

          <v-btn color="red darken-1" text @click="editDepartmentDialog = false">Cancelar</v-btn>
              </v-col>
            </v-container>
          </template>
        </v-card-actions>
        </v-card>
      </v-dialog>

    </v-row>
    <v-divider class="pb-3"></v-divider>
    <v-card class="w-100">
    <v-data-table :sort-by="['name']" :sort-desc="[true, true]" 
    no-data-text="Nenhuma área adicionada" 
    no-results-text="Sem resultados para a busca" :headers="header" :items="departments">
      <template v-slot:item.actions="{ item }">
        <v-icon small @click="edit(item)">mdi-pencil</v-icon>
        <v-icon class="pl-3" small @click="deleteDepartment(item)">mdi-delete</v-icon>
      </template> 
    </v-data-table>
    </v-card>

    <v-dialog v-model="deleteDepartmentDialog" max-width="500" min-h>
          <v-card>
            <v-card-title style="font-size: 16px !important" class="headline">
              Deseja realmente deletar esta área? <br>
              Isso fará com que todos integrantes da {{ deletedItem }} fiquem sem área!
              </v-card-title>
            <v-card-actions>
              <v-spacer></v-spacer>

              <v-btn
                color="red darken-1"
                text
                @click="deleteDepartmentDialog = false; deleteItem();
                "
              >
                DELETAR ÁREA
              </v-btn>

              <v-btn text @click="deleteDepartmentDialog = false">
                Voltar
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
    
  </v-container>
</template>

<script>
import departmentController from "../../controllers/DepartmentsController"

export default {
  components: {
    
  },

  data() {
    return {
      departmentController,
      header: [
        { text: "Sigla", value: "abbreviation" },
        { text: "Nome", value: "full_name" },
        { text: "Ações", value: "actions", sortable: false }
      ],
      createDepartmentDialog: false,
      editDepartmentDialog: false,
      deleteDepartmentDialog: false,
      departmentName: "",
      abbreviation: "",
      departments: [],
      departmentDetail: null,
      type: null,
      showModal: false,
      tableDepartments: {},
      search: "",
      deletedItem: ""
    };
  },

  async created(){
    await this.getDepartments()
  },
  methods: {

    async getDepartments() {

      await this.departmentController.getDepartments(this.$api)
      .then(res => {
        this.departments = res.data
      }).catch(err => {
        console.log(err)
      })
    },

    async submit(){
      const department = {
        full_name: this.departmentName,
        abbreviation: this.abbreviation
      }
      await this.departmentController.createDepartment(this.$api, department).then(this.getDepartments)
      this.showModal = true
    },

    async edit(item) {
      console.log(item)
      this.departmentName = item.full_name
      this.abbreviation = item.abbreviation
      this.editDepartmentDialog = true
      this.departmentDetail = {
        id: item.id,
        full_name: item.full_name,
        abbreviation: item.abbreviation

      }
    },

     async deleteDepartment(item) {
      this.deletedItem=item.abbreviation
      this.departmentName=item.full_name
      this.deleteDepartmentDialog=true
      this.departmentDetail = {
        id: item.id,
      }
    },

    async sendPutRequest() {
      this.departmentDetail.full_name = this.departmentName;
      this.departmentDetail.abbreviation = this.abbreviation;
      await this.departmentController.editDepartment(this.$api, this.departmentDetail)
        .then(this.getDepartments)
    },

    async deleteItem() {
      await this.departmentController.deleteDepartment(this.$api, this.departmentDetail.id)
        .then(this.getDepartments)
    }
  }
};
</script>