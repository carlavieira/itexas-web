<template>
  <v-container>
    <v-row class="px-4">
      <h2>Reunião</h2>
      <v-spacer></v-spacer>
      <v-btn @click="btnMembro = true" title="Marcar Reunião" small color="secondary" fab>
        <v-icon>mdi-plus</v-icon>
      </v-btn>
    </v-row>
    <CadastrarReuniao></CadastrarReuniao>
  </v-container>
</template>

<script>
import CadastrarReuniao from "./CadastrarReuniao.vue";

export default {
  components: {
      CadastrarReuniao
  },
}
</script>