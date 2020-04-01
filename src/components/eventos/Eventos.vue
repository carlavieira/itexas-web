

<template>
  <v-container>
    <v-row class="px-4">
      <h2>Eventos</h2>
      <v-spacer></v-spacer>
      <v-btn @click="btnEvento = true" title="Marcar Evento" small color="secondary" fab>
        <v-icon>mdi-plus</v-icon>
      </v-btn>
    </v-row>
    <v-row class="px-4 pt-3">
      <v-flex>
        <v-card class="w-100">
          <v-card-title>
            <v-text-field
              style="max-width: 300px"
              v-model="search"
              append-icon="mdi-magnify"
              label="Pesquisar"
              single-line
              hide-details
            ></v-text-field>
          </v-card-title>
          <v-data-table no-data-text="Nenhum evento cadastrado" no-results-text="Nenhum evento encontrado" :headers="headersEvento" :items="evento" :search="search"></v-data-table>
        </v-card>
      </v-flex>
    </v-row>
    <NovoEvento :show="btnEvento" @close="btnEvento = false"></NovoEvento>
  </v-container>
</template>

<script>
import NovoEvento from "./CadastrarEvento.vue";

export default {
  components: {
      NovoEvento
  },
  data() {
    return {
      btnEvento: false,
      search: "",
      headersEvento: [
        {
          text: "Nome",
          align: "start",
          value: "name",
        },
        { text: "Lider", value: "lider" },
        { text: "Data", value: "data" },
        { text: "Hora", value: "hora"}
      ],
      evento: [
        {
          name: "Evento 1",
          lider: "Mauro Rubbens",
          data: "22/01/2020",
          hora: "19:00"
        },
        {
          name: "Evento 2",
          lider: "Lucas Leandro",
          data: "30/07/2019",
          hora: "19:00"
        },
        {
          name: "Evento 3",
          lider: "Mauro Rubbens",
          data: "10/01/2020",
          hora: "20:00"
        },
        {
          name: "Evento 4",
          lider: "Carla Nolasco",
          data: "12/03/2020",
          hora: "12:00"
        },
        {
          name: "Evento 5",
          lider: "Lucas Leandro",
          data: "12/12/2019",
          hora: "18:00"
        },
        {
          name: "Evento 6",
          lider: "Mauro Rubens",
          data: "19/02/2020",
          hora: "13:00"
        },
      ]
    }
  }
}
</script>