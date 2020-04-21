<template>
  <v-data-table :headers="headers" :items="participantes" class="elevation-1">
    <template v-slot:item.participante="{ item }">
      <v-span v-model="item.first_name">{{
        item.participante.first_name
      }}</v-span>
    </template>

    <template v-slot:item.presente="{ item }">
      <v-simple-checkbox v-model="item.presente" disabled></v-simple-checkbox>
    </template>

    <template v-slot:top>
      <v-toolbar flat color="white">
        <v-toolbar-title>Participantes</v-toolbar-title>
        <v-divider class="mx-4" inset vertical></v-divider>
        <v-spacer></v-spacer>
        <v-dialog v-model="dialog" max-width="500px">
          <template v-slot:activator="{ on }">
            <v-btn
              class="mx-2"
              title="Adicionar Participante"
              v-on="on"
              fab
              dark
              x-small
              color="success"
            >
              <v-icon dark>mdi-plus</v-icon>
            </v-btn>
          </template>
          <v-card>
            <v-card-title>
              <span class="headline">{{ formTitle }}</span>
            </v-card-title>

            <template>
              <v-container px-6 style="height: 85px">
                <v-row>
                  <v-col cols="12" sm="9" md="9">
                    <v-select
                      return-object
                      v-model="editedItem.participante"
                      label="Participante"
                      :items="membros"
                      item-text="first_name"
                      placeholder="Nome"
                      outlined
                    ></v-select>
                  </v-col>
                  <v-col class="campo-presenca" cols="12" sm="3" md="3">
                    <span>Presença</span>
                    <v-simple-checkbox
                      v-model="editedItem.presente"
                      label="Presença"
                    ></v-simple-checkbox>
                  </v-col>
                </v-row>
              </v-container>
            </template>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="close">Cancelar</v-btn>
              <v-btn
                color="blue darken-1"
                text
                @click="save"
                v-on:click="enviaParticipantesParaCadastro"
                >Salvar</v-btn
              >
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-toolbar>
    </template>
    <template v-slot:item.actions="{ item }">
      <v-icon small class="mr-2" @click="editItem(item)">
        mdi-pencil
      </v-icon>
      <v-icon small @click="deleteItem(item)">
        mdi-delete
      </v-icon>
    </template>
    <template v-slot:no-data>
      <span>Não há participantes nesta reunião.</span>
    </template>
  </v-data-table>
</template>

<script>
import { Ripple } from "vuetify/lib/directives";
import memberController from "../../controllers/MemberController";

export default {
  data: () => ({
    dialog: false,
    membros: [],
    memberController,
    headers: [
      { text: "Participante", value: "participante", align: "start" },
      { text: "Presença", value: "presente", align: "center" },
      { value: "actions", sortable: false, align: "end" },
    ],
    participantes: [],
    editedIndex: -1,
    editedItem: {
      participante: "",
      presente: false,
    },
    defaultItem: {
      participante: "",
      presente: false,
    },
  }),

  directives: {
    Ripple,
  },

  computed: {
    formTitle() {
      return this.editedIndex === -1
        ? "Novo Participante"
        : "Editar Participante";
    },
  },
  watch: {
    dialog(val) {
      val || this.close();
    },
  },

  created() {
    this.initialize();
  },

  methods: {
    async initialize() {
      let res = await this.memberController.getAllMembers(this.$api);
      this.membros = res;
    },
    editItem(item) {
      this.editedIndex = this.participantes.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },
    deleteItem(item) {
      const index = this.participantes.indexOf(item);
      confirm("Você deseja realmente deletar este participante?") &&
        this.participantes.splice(index, 1);
    },
    close() {
      this.dialog = false;
      setTimeout(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      }, 300);
    },
    save() {
      if (this.editedIndex > -1) {
        Object.assign(this.participantes[this.editedIndex], this.editedItem);
      } else {
        this.participantes.push(this.editedItem);
      }
      this.close();
    },
    enviaParticipantesParaCadastro() {
      this.$emit(
        "enviarParticipantesCadastro",
        JSON.parse(JSON.stringify(this.participantes))
      );
    },
  },
};
</script>

<style>
.campo-presenca {
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
