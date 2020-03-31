<template>
  <v-container>
    <v-row class="px-4">
      <h2>Membros</h2>
      <v-spacer></v-spacer>
      <v-btn @click="btnMembro = true" small color="secondary" fab>
        <v-icon>mdi-plus</v-icon>
      </v-btn>
    </v-row>
    <v-row class="px-4 pt-3">
      <v-flex>
        <v-card class="w-100">
          <v-card-title>
            <v-text-field
              v-model="search"
              append-icon="mdi-magnify"
              label="Pesquisar"
              single-line
              hide-details
            ></v-text-field>
          </v-card-title>
          <v-data-table no-data-text="Nenhum membro cadastrado" no-results-text="Nenhum membro encontrado" :headers="headersMembros" :items="membros" :search="search"></v-data-table>
        </v-card>
      </v-flex>
    </v-row>
    <NovoMembro :show="btnMembro" @close="btnMembro = false"></NovoMembro>
  </v-container>
</template>

<script>
import NovoMembro from "./CadastrarMembro.vue";

export default {
  components: {
    NovoMembro
  },
  data() {
    return {
      btnMembro: false,
      search: "",
      headersMembros: [
        {
          text: "Nome",
          align: "start",
          value: "name"
        },
        { text: "Cargo", value: "cargo" },
        { text: "Área", value: "area" }
      ],
      membros: [
        {
          name: "Frozen Yogurt",
          cargo: 159,
          area: 6.0
        },
        {
          name: "Alex",
          cargo: "Presidente",
          area: "2"
        },
        {
          name: "Frozen Yogurt",
          cargo: 159,
          area: 6.0
        },
        {
          name: "Alex",
          cargo: "Presidente",
          area: "2"
        },
        {
          name: "Frozen Yogurt",
          cargo: 159,
          area: 6.0
        },
        {
          name: "Alex",
          cargo: "Presidente",
          area: "2"
        },
        {
          name: "Frozen Yogurt",
          cargo: 159,
          area: 6.0
        },
        {
          name: "Alex",
          cargo: "Presidente",
          area: "2"
        },
      ]
    };
  }
};
</script>