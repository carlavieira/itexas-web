<template>
  <v-container>
    <v-row class="px-4">
      <h2>Eventos</h2>
      <v-spacer></v-spacer>
      <v-btn @click="btnMembro = true" title="Marcar Evento" small color="secondary" fab>
        <v-icon>mdi-plus</v-icon>
      </v-btn>
    </v-row>
    <CadastrarEvento></CadastrarEvento>
  </v-container>
</template>

<script>
import CadastrarEvento from "./CadastrarEvento.vue";

export default {
  components: {
      CadastrarEvento
  },
}
</script>