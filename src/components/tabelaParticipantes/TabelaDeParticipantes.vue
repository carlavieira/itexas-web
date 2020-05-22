<template>
  <v-data-table
    :headers="headers"
    :items="participantesWithName"
    :sort-by="'full_name'"
    :sort-desc="false"
    class="elevation-1"
  >
    <template v-slot:item.participante="{ item }">{{
      item.full_name
    }}</template>

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
                      :items="participantesDiferent"
                      item-text="full_name"
                      item-value="select_box"
                      placeholder="Nome"
                      outlined
                      hint="Será mostrado apenas participantes que já não fazem parte do evento."
                      persistent-hint
                    >
                      <template v-slot:no-data>
                        <span pa-2
                          >Todos os participantes já estão no evento</span
                        >
                      </template>
                    </v-select>
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
      <v-icon small @click="deleteItem(item)">mdi-delete</v-icon>
    </template>
    <template v-slot:no-data>
      <span>Não há participantes neste evento.</span>
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
    membrosFullName: [],
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
    participantesDiferent: [],
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
    typeEvent: String,
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
      if (this.form == "create") this.initializeLiderandosTable();
      else {
        this.initializeAttendanceAlreadySent(this.objForm.id);
      }
      this.initializeMembersInput();
    },
    ordenaOrdemCrescente(array) {
      array.sort(function(item1, item2) {
        if (item1.first_name && item2.first_name) {
          return item1.first_name < item2.first_name ? -1 : 1;
        } else {
          return item1.full_name < item2.full_name ? -1 : 1;
        }
      });
      return array;
    },
    findWithAttr(array, attr, value) {
      for (var i = 0; i < array.length; i += 1) {
        if (array[i][attr] === value) return i;
      }
      return -1;
    },
    async initializeMembersInput() {
      this.membros = await this.memberController.getAllMembers(this.$api);
      this.participantesDiferent = [];
      this.membros.forEach((item) => {
        (item.full_name = `${item.first_name} ${item.last_name}`),
          this.participantesDiferent.push(item);
      });
      /*this.setFullName(this.membros);*/

      setTimeout(() => {
        for (let key1 in this.participantesWithName) {
          for (let key2 in this.membros) {
            if (
              this.participantesWithName[key1].full_name ==
              this.membros[key2].full_name
            ) {
              /* Caso nomes iguais, pega o index do obj em r2 que possui o nome */
              const indexOfSameNames = this.findWithAttr(
                this.membros,
                "full_name",
                this.membros[key2].full_name
              );
              /* Se nome iguais, então != -1. Então, "substitui" aquele obj de r3 para 'null' */
              if (indexOfSameNames != -1) {
                this.participantesDiferent.splice(indexOfSameNames, 1, null);
              }
            }
          }
        }
        this.participantesDiferent = this.participantesDiferent.filter(function(
          val
        ) {
          return val != null;
        });
      }, 2000);
    },
    setFullName(array) {
      const newArray = new Array();
      array.map((item) => {
        item.full_name = `${item.first_name} ${item.last_name}`;
        newArray.push(item);
      });

      return newArray;
    },
    async initializeLiderandosTable() {
      this.participantes = await this.memberController.getAllLiderandos(
        this.$api,
        localStorage.getItem("user_id")
      );
      this.participantesWithName = this.ordenaOrdemCrescente(
        this.participantes
      );

      this.setFullName(this.participantesWithName);
      this.enviaParticipantesParaPai();
    },
    async initializeAttendanceAlreadySent(eventId) {
      if (this.typeEvent == "meeting") {
        this.participantes = await this.participationController.getParticipantsInMeeting(
          this.$api,
          eventId
        );
        console.log(this.participantes);
      } else if (this.typeEvent == "event") {
        this.participantes = await this.participationController.getParticipantsInEvent(
          this.$api,
          eventId
        );
      }

      /* REMOVER ESSE GETMEMBERBY ID */
      this.participantes.forEach(async (item) => {
        const member = await this.memberController.getMemberById(
          this.$api,
          item.member.id
        );
        item.full_name = member.first_name + " " + member.last_name;
        this.participantesWithName.push(item);
      });
      this.participantesWithName = this.ordenaOrdemCrescente(
        this.participantesWithName
      );

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

      this.initializeMembersInput();
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
      this.participantesWithName = this.ordenaOrdemCrescente(
        this.participantesWithName
      );
      this.enviaParticipantesParaPai();
      this.initializeMembersInput();
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
