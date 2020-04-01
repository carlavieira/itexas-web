<template>
  <v-dialog max-width="800px" persistent v-model="show">
    <v-card class="pa-5">
      <v-layout row class="px-3" justify-space-between>
        <h2>Marcação de Reunião</h2>
        <v-btn @click="$emit('close')" title="Fechar" icon>
          <v-icon color="grey">mdi-close</v-icon>
        </v-btn>
      </v-layout>
      <v-form ref="form" v-model="valid" lazy-validation>
        <v-row>
          <v-col class="col-12" sm="6" md="6" lg="6">
            <v-text-field
              label="Nome do Evento"
              prepend-icon="mdi-account-group"
              required
              no-gutters
            ></v-text-field>
          </v-col>

          <v-col class="col-12" sm="6" md="6" lg="6">
            <v-select label="Líder responsável" prepend-icon="mdi-account-star"></v-select>
          </v-col>

          <v-row justify="space-around">
            <v-col class="col-12 column" sm="6" md="6" lg="6">
              <span class="span-title">Data do Evento</span>
              <v-date-picker class="w-290" color="red lighten-1" locale="pt-br" v-model="picker"></v-date-picker>
            </v-col>
            <v-col class="col-12 column" sm="6" md="6" lg="6">
              <span class="span-title">Hora do Evento</span>
              <v-time-picker class="w-290" v-model="e7" color="red lighten-1" format="24hr"></v-time-picker>
            </v-col>
          </v-row>
            <v-col
              class="col-12 offset-md-4 offset-lg-4 offset-sm-3 column-button"
              sm="6"
              md="6"
              lg="6"
            >
              <v-btn class="ma-2" v-on:click.native="submit()" depressed color="success">Cadastrar</v-btn>
              <v-btn class="ma-2" v-on:click.native="clear()" outlined>Limpar Campos</v-btn>
            </v-col>
        </v-row>
      </v-form>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  data() {
    return {
      picker: new Date().toISOString().substr(0, 10),
      e7: null,
      select: null,
      valid: true,
    }
  },
  props: {
    show: Boolean
  }
}
</script>

<style scoped>
  .w-290 {
    max-width: 290px;
  }

  .span-title {
    color: #777777;
  }

  .column {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .column-button {
  display: flex;
    }
</style>