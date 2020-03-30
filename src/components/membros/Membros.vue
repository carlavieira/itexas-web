<template>
  <v-container>
    <v-row class="px-4">
        <h2>Membros</h2>
        <v-spacer></v-spacer>
        <v-btn @click="btnMembro = true" small color="secondary" fab>
          <v-icon>mdi-plus</v-icon>
        </v-btn>
    </v-row>
    <NovoMembro :show="btnMembro" @close="btnMembro = false"></NovoMembro>
  </v-container>
</template>

<script>
import NovoMembro from "./CadastrarMembro.vue"

export default {
    components: {
        NovoMembro
    },
    data(){
        return{
            btnMembro: false
        }
    }
};
</script>