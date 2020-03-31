<template>
  <v-dialog max-width="800px" persistent v-model="show">
    <v-card class="pa-5">
      <v-layout row class="px-3" justify-space-between>
        <h2>Cadastro de Membro</h2>
        <v-btn @click="$emit('close')" icon>
          <v-icon color="grey">mdi-close</v-icon>
        </v-btn>
      </v-layout>
      <v-form ref="form" v-model="valid" lazy-validation>
        <v-row>
          <v-col class="col-12" sm="6" md="6" lg="6">
            <v-text-field
              :counter="20"
              :rules="nameRules"
              label="Nome"
              prepend-icon="mdi-card-account-details"
              required
              no-gutters
            ></v-text-field>
          </v-col>

          <v-col class="col-12" sm="6" md="6" lg="6">
            <v-text-field
              :counter="40"
              :rules="nameRules"
              label="Sobrenome"
              required
              no-gutters
            ></v-text-field>
          </v-col>

          <v-col class="col-12" sm="6" md="6" lg="6">
            <v-text-field
              :counter="40"
              label="Apelido"
              prepend-icon="mdi-account-heart"
              no-gutters
            ></v-text-field>
          </v-col>

          <v-col class="col-12" sm="6" md="6" lg="6">
            <v-text-field
              :rules="emailRules"
              label="E-mail"
              prepend-icon="mdi-email"
              required
              no-gutters
            ></v-text-field>
          </v-col>
          <v-col class="col-12" sm="6" md="6" lg="6">
            <v-select label="Cargo" prepend-icon="mdi-briefcase" required></v-select>
          </v-col>
          <v-col class="col-12" sm="6" md="6" lg="6">
            <v-select label="Área" prepend-icon="mdi-border-none-variant" required></v-select>
          </v-col>
          <v-col class="col-12" sm="6" md="6" lg="6">
            <v-select label="Líder" prepend-icon="mdi-account-star"></v-select>
          </v-col>
          <v-col class="col-12" sm="6" md="6" lg="6">
            <v-text-field label="Slack" prepend-icon="mdi-slack" no-gutters></v-text-field>
          </v-col>
          <v-col class="col-12" sm="6" md="6" lg="6">
            <v-text-field
              name="celular"
              label="Celular (xx) xxxxx-xxxx"
              type="number"
              prepend-icon="mdi-cellphone-iphone"
              no-gutters
            ></v-text-field>
          </v-col>
          <v-col class="col-12" sm="6" md="6" lg="6">
            <v-file-input
              accept="image/png, image/jpeg, image/bmp"
              placeholder="Selecionar Foto"
              prepend-icon="mdi-camera"
              label="Avatar"
            ></v-file-input>
          </v-col>

          <!-- Data de Entrada (Calendário) -->
          <v-row justify="space-around">
            <span class="span-title">Data de entrada na AIESEC</span>
          </v-row>
          <v-row style="margin-left: 2px" justify="space-around" class="col-12" sm="12" md="12" lg="12">

            <v-date-picker color="red lighten-1" locale="pt-br" v-model="picker"></v-date-picker>
          </v-row>

        </v-row>
        <v-row>
          <v-col
            class="col-12 offset-md-4 offset-lg-3 offset-sm-3 column-button"
            sm="6"
            md="4"
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
      name: "",
      valid: true,
      nameRules: [
        v => !!v || "Campo obrigatório",
        v => (v && v.length <= 10) || "Name must be less than 10 characters"
      ],
      email: "",
      emailRules: [
        v => !!v || "E-mail is required",
        v => /.+@.+\..+/.test(v) || "E-mail inválido"
      ],
      select: null,
      picker: new Date().toISOString().substr(0, 10),
      date: null,
      trip: {
        name: '',
        location: null,
        start: null,
        end: null,
      },
    };
  },

  props: {
    show: Boolean
  },

  methods: {
    clear() {
      this.$refs.form.reset();
      this.celular = "";
    },
    submit() {
      //let request = new Object();
    }
  }
};
</script>

<style scoped>
.radius {
  border-radius: 6px !important;
}

.container {
  padding: 30px 30px;
}

.column-button {
  display: flex;
}

.span-title {
  color: #8e8e8e;
}
</style>