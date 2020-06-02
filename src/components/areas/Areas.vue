<template>
  <div>
    <v-row class="px-4 pb-3">
      <v-snackbar top v-model="snackbar" :color="color" :timeout="timeout">
        {{ text }}</v-snackbar
      >
      <h2>Áreas</h2>
      <v-spacer></v-spacer>
      <v-btn
        @click="createDepartmentDialog = true"
        title="Cadastrar nova área"
        small
        color="secondary"
        fab
      >
        <v-icon>mdi-plus</v-icon>
      </v-btn>

      <v-dialog v-model="createDepartmentDialog" max-width="700" min-h>
        <v-form ref="form">
          <v-card>
            <v-card-title
              class="title-table pt-3 py-4 pb-0 headline"
              style="font-size: 16px !important"
              >Cadastro do Áreas</v-card-title
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
                        :rules="[rules.abbreviationRequired]"
                      ></v-text-field>
                    </v-col>
                    <v-col class="d-flex" cols="12" sm="11">
                      <v-text-field
                        v-model="departmentName"
                        label="Nome"
                        :rules="[rules.nameRequired]"
                        prepend-inner-icon="mdi-account"
                        dense
                        outlined
                      ></v-text-field>
                    </v-col>
                  </v-row>
                  <v-col class="d-flex" cols="12" sm="6">
                    <v-btn color="green darken-1" text @click="submit()"
                      >Cadastrar</v-btn
                    >

                    <v-btn
                      color="red darken-1"
                      text
                      @click="createDepartmentDialog = false"
                      >Cancelar</v-btn
                    >
                  </v-col>
                </v-container>
              </template>
            </v-card-actions>
          </v-card>
        </v-form>
      </v-dialog>

      <v-dialog v-model="editDepartmentDialog" max-width="600" min-h>
        <v-card style="background-color: #f5f5f5">
          <v-container>
            <v-row class="px-4 py-2">
              <h3 class="headline font-weight-bold subtitle-1">
                Edição da Área
              </h3>
              <v-spacer></v-spacer>
              <v-btn @click="editDepartmentDialog = false" title="Fechar" icon>
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
                      :rules="[rules.abbreviationRequired]"
                      label="Sigla"
                      prepend-inner-icon="mdi-account"
                      dense
                      outlined
                    ></v-text-field>
                  </v-col>
                  <v-col class="d-flex" cols="12" sm="6">
                    <v-text-field
                      v-model="departmentName"
                      :rules="[rules.nameRequired]"
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
                  <v-btn color="green darken-1" text @click="sendPutRequest()"
                    >Editar</v-btn
                  >

                  <v-btn
                    color="red darken-1"
                    text
                    @click="editDepartmentDialog = false"
                    >Cancelar</v-btn
                  >
                </v-col>
              </v-container>
            </template>
          </v-card-actions>
        </v-card>
      </v-dialog>
      <v-dialog
        v-model="deleteDepartmentDialog"
        persistent
        max-width="500"
        min-h
      >
        <v-card>
          <v-card-title style="font-size: 16px !important" class="headline">
            <p>Deseja realmente deletar esta área?</p>
            <span style="font-size: 14px" class=" font-weight-light">
              Isso fará com que todos integrantes da {{ deletedItem }} fiquem
              sem área.
            </span>
          </v-card-title>
          <v-card-actions>
            <v-spacer></v-spacer>

            <v-btn
              color="red darken-1"
              text
              @click="
                deleteDepartmentDialog = false;
                deleteItem();
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
    </v-row>

    <v-data-table
      class="elevation-1 tabela"
      :headers="header"
      :items="departments"
      :single-expand="singleExpand"
      :expanded.sync="expanded"
      :hide-default-footer="true"
      item-key="id"
      :footer-props="{
        itemsPerPageOptions: [-1],
      }"
      show-expand
    >
      <template v-slot:item.actions="{ item }">
        <v-icon small @click="edit(item)">mdi-pencil</v-icon>
        <v-icon class="pl-3" small @click="deleteDepartment(item)"
          >mdi-delete</v-icon
        >
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
                <tr
                  v-for="member in membersInDepartment[item.id]"
                  :key="member.id"
                >
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
import departmentController from "../../controllers/DepartmentsController";
import memberController from "../../controllers/MemberController";

export default {
  data() {
    return {
      expanded: [],
      singleExpand: false,
      departmentController,
      memberController,
      header: [
        { text: "Sigla", value: "abbreviation" },
        { text: "Título", value: "full_name" },
        { text: "Ações", value: "actions", sortable: false },
      ],
      membersInDepartment: {},
      membersInTable: [],
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
      deletedItem: "",
      selected: [],
      snackbar: false,
      color: "",
      text: "",
      timeout: 3000,
      rules: {
        abbreviationRequired: (value) => !!value || "Escreve uma sigla.",
        nameRequired: (value) => !!value || "Escreve um nome.",
      },
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
    await this.getDepartment();
  },
  methods: {
    async getDepartment() {
      await this.departmentController
        .getDepartments(this.$api)
        .then((res) => {
          const allDepartment = res.data;
          this.departments = res.data;

          allDepartment.forEach((department) => {
            this.memberController
              .getMembersInDepartment(this.$api, department.id)
              .then((res) => {
                this.membersInDepartment[department.id] = res;
              });
          });
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getFullName: (membro) => `${membro.first_name} ${membro.last_name}`,
    getFullNameLeader: (leader) => `${leader.first_name} ${leader.last_name}`,
    setSnackbar(text, color) {
      this.text = text;
      this.color = color;
      this.snackbar = true;
    },

    async submit() {
      const department = {
        full_name: this.departmentName,
        abbreviation: this.abbreviation,
      };
      if (this.validarFormulario()) {
        await this.departmentController
          .createDepartment(this.$api, department)
          .then(() => {
            this.getDepartment(),
              (this.departmentName = ""),
              (this.abbreviation = "");
            this.setSnackbar("Área criada com sucesso.", "success");
            this.createDepartmentDialog = false;
          })
          .catch(() => {
            this.setSnackbar("Erro ao criar área.", "error");
          });
        this.showModal = true;
      }
    },

    async edit(item) {
      this.departmentName = item.full_name;
      this.abbreviation = item.abbreviation;
      this.editDepartmentDialog = true;
      this.departmentDetail = {
        id: item.id,
        full_name: this.departmentName,
        abbreviation: this.abbreviation,
      };
      this.membersInTable = this.membersInDepartment[item.id];
    },

    async deleteDepartment(item) {
      this.deleteDepartmentDialog = true;
      this.deletedItem = item.full_name;
      this.departmentName = item.full_name;
      this.departmentDetail = {
        id: item.id,
      };
    },

    async sendPutRequest() {
      this.departmentDetail.full_name = this.departmentName;
      this.departmentDetail.abbreviation = this.abbreviation;
      if (this.validarFormulario()) {
        await this.departmentController
          .editDepartment(this.$api, this.departmentDetail)
          .then(() => {
            this.getDepartment(),
              (this.departmentName = ""),
              (this.abbreviation = "");
            this.setSnackbar("Área editada com sucesso.", "warning");
            this.createDepartmentDialog = false;
          })
          .catch(() => {
            this.setSnackbar("Erro ao editar área.", "error");
          });
        this.showModal = true;
      }
    },

    async deleteItem() {
      await this.departmentController
        .deleteDepartment(this.$api, this.departmentDetail.id)
        .then(() => {
          this.getDepartment(),
            this.setSnackbar("Área deletada com sucesso.", "error");
        })
        .catch(() => {
          console.log("Teste"),
            this.setSnackbar("Erro ao deletar área.", "error");
        });
      this.showModal = true;
    },
    validarFormulario() {
      return this.$refs.form.validate();
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
