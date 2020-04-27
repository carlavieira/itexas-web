<template>
  <v-data-table
    :headers="headers"
    :items="participantesWithName"
    class="elevation-1"
  >
    <template v-slot:item.participante="{ item }">
      {{ item.first_name }}
    </template>

    <template v-slot:item.attendance="{ item }">
      <input
        type="checkbox"
        @click="enviaParticipantesParaPai()"
        v-model="item.attendance"
      />
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
              <v-container px-6>
                <v-row>
                  <v-col cols="12" sm="12" md="12">
                    <v-select
                      return-object
                      multiple
                      chips
                      dense
                      v-model="editedItem.participante"
                      label="Participante"
                      :items="membros"
                      item-text="first_name"
                      placeholder="Nome"
                      outlined
                    ></v-select>
                  </v-col>
                </v-row>
              </v-container>
            </template>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="close">Cancelar</v-btn>
              <v-btn color="blue darken-1" text @click="save">Salvar</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-toolbar>
    </template>
    <template v-slot:item.actions="{ item }">
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
import participationController from "../../controllers/ParticipationController";

export default {
  data: () => ({
    dialog: false,
    membros: [],
    memberController,
    participationController,
    headers: [
      { text: "Participante", value: "participante", align: "start" },
      { text: "Presença", value: "attendance", align: "center" },
      { value: "actions", sortable: false, align: "end" },
    ],
    participantes: [],
    participantesWithName: [],
    participantesDeleted: [],
    participantesForSend: {},
    editedIndex: -1,
    editedItem: {
      participante: "",
      attendance: false,
    },
    defaultItem: {
      participante: "",
      attendance: false,
    },
  }),

  props: {
    form: String,
    objForm: Object,
  },

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

  async created() {
    await this.initialize();
  },

  methods: {
    initialize() {
      this.initializeMembersInput();
      if (this.form == "create") this.initializeLiderandosTable();
      else {
        this.initializeAttendanceAlreadySent(this.objForm.id);
      }
    },
    async initializeMembersInput() {
      let res = await this.memberController.getAllMembers(this.$api);
      this.membros = res.sort(function(item1, item2) {
        return item1.first_name < item2.first_name ? -1 : 1;
      });
    },
    async initializeLiderandosTable() {
      /* Ao invés de utilizar id 8, dar get no localstorage userID */
      let res = await this.memberController.getAllLiderandos(this.$api, 8);
      this.participantes = res.sort(function(item1, item2) {
        return item1.first_name < item2.first_name ? -1 : 1;
      });
      this.participantesWithName = this.participantes;
      this.enviaParticipantesParaPai();
    },
    async initializeAttendanceAlreadySent(meetingId) {
      this.participantes = await this.participationController.getParticipantsInMeeting(
        this.$api,
        meetingId
      );

      this.participantes.forEach(async (item) => {
        const member = await this.memberController.getMemberById(
          this.$api,
          item.member
        );

        item.first_name = member.first_name;
        this.participantesWithName.push(item);
      });

      this.participantes = this.participantes.sort(function(item1, item2) {
        return item1.first_name < item2.first_name ? -1 : 1;
      });
      this.enviaParticipantesParaPai();
    },
    editItem(item) {
      this.editedIndex = this.participantes.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },
    saveAfterChanges() {
      if (this.editedIndex > -1) {
        Object.assign(this.participantes[this.editedIndex], this.editedItem);
      } else {
        this.participantes.push(this.editedItem);
      }
    },
    deleteItem(item) {
      const index = this.participantesWithName.indexOf(item);
      let checkItem = (item) => {
        if (!item.email) {
          this.participantesDeleted.push(item);
          this.enviaParticipantesParaPai();
        }
      };
      confirm("Você deseja realmente deletar este participante?") &&
        this.participantesWithName.splice(index, 1) &&
        checkItem(item) &&
        this.enviaParticipantesParaPai();
    },
    close() {
      this.dialog = false;
      setTimeout(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      }, 300);
    },
    save() {
      this.editedItem.participante.map((participante) => {
        if (!participante.attendance) {
          participante.attendance = true;
        }
        this.participantesWithName.push(participante);
      });
      this.enviaParticipantesParaPai();

      this.close();
    },
    enviaParticipantesParaPai() {
      this.participantesForSend.participantesWithName = this.participantesWithName;
      this.participantesForSend.participantesDeleted = this.participantesDeleted;
      setTimeout(() => {
        this.$emit(
          "enviarParticipantesPai",
          JSON.parse(JSON.stringify(this.participantesForSend))
        );
      }, 300);
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
input[type="checkbox"] {
  width: 15px;
  height: 15px;
  margin-top: -10;
  margin-top: 7px;
  margin-right: 12px;
}
</style>
