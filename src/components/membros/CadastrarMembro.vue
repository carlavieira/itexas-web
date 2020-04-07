<template>
  <v-dialog max-width="800px" persistent v-model="show">
    <v-card class="pa-5">
      <v-layout row class="px-3" justify-space-between>
        <h2>Cadastro de Membro</h2>
        <v-btn @click="$emit('close')" title="Fechar" icon>
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
              name="first-name"
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
              name="last-name"
              required
              no-gutters
            ></v-text-field>
          </v-col>

          <v-col class="col-12" sm="6" md="6" lg="6">
            <v-text-field
              :counter="40"
              label="Apelido"
              name="nick-name"
              prepend-icon="mdi-account-heart"
              no-gutters
            ></v-text-field>
          </v-col>

          <v-col class="col-12" sm="6" md="6" lg="6">
            <v-text-field
              v-model="email"
              :rules="emailRules"
              label="E-mail"
              autocomplete="off"
              name="email"
              value=""
              prepend-icon="mdi-email"
              required
              no-gutters
            ></v-text-field>
          </v-col>

          <v-col class="col-12" sm="6" md="6" lg="6">
            <v-text-field
              v-model="password"
              :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
              :rules="[rulesPassword.required, rulesPassword.min]"
              :type="show1 ? 'text' : 'password'"
              prepend-icon="mdi-key"
              name="Senha"
              label="Senha"
              hint="At least 8 characters"
              counter
              @click:append="show1 = !show1"
            ></v-text-field>
          </v-col>

          <v-col class="col-12" sm="6" md="6" lg="6">
            <v-text-field
              v-model="confirmaPassword"
              :append-icon="show2 ? 'mdi-eye' : 'mdi-eye-off'"
              prepend-icon="mdi-key"
              :rules="[rulesPassword.required, passwordConfirmationRule]"
              :type="show2 ? 'text' : 'password'"
              name="Senha2"
              label="Confirme a senha"
              hint="At least 8 characters"
              @click:append="show2 = !show2"
            ></v-text-field>
          </v-col>

          <v-col class="col-12" sm="6" md="6" lg="6">
            <v-select
              label="Cargo"
              name="post"
              prepend-icon="mdi-briefcase"
              required
            ></v-select>
          </v-col>
          <v-col class="col-12" sm="6" md="6" lg="6">
            <v-select
              label="Área"
              name="departament"
              prepend-icon="mdi-border-none-variant"
              required
            ></v-select>
          </v-col>
          <v-col class="col-12" sm="6" md="6" lg="6">
            <v-select
              label="Líder"
              name="leader"
              prepend-icon="mdi-account-star"
            ></v-select>
          </v-col>
          <v-col class="col-12" sm="6" md="6" lg="6">
            <v-text-field
              label="Slack"
              name="slack"
              prepend-icon="mdi-slack"
              no-gutters
            ></v-text-field>
          </v-col>
          <v-col class="col-12" sm="6" md="6" lg="6">
            <v-text-field
              name="phone"
              label="Celular (xx) xxxxx-xxxx"
              type="number"
              prepend-icon="mdi-cellphone-iphone"
              no-gutters
            ></v-text-field>
          </v-col>
          <v-col class="col-12" sm="6" md="6" lg="6">
            <v-file-input
              name="profile-picture"
              accept="image/png, image/jpeg, image/bmp"
              placeholder="Selecionar Foto"
              prepend-icon="mdi-camera"
              label="Avatar"
            ></v-file-input>
          </v-col>

          <!-- Data de Entrada (Calendário) -->
          <v-col md="6" offset-md="3">
            <v-dialog
              ref="dialog2"
              v-model="modal1"
              :return-value.sync="date"
              persistent
              width="290px"
            >
              <template v-slot:activator="{ on }">
                <v-text-field
                  v-model="date"
                  label="Data de entrada na AIESEC"
                  prepend-icon="mdi-calendar"
                  readonly
                  v-on="on"
                ></v-text-field>
              </template>
              <v-date-picker
                v-model="date"
                color="red lighten-1"
                locale="pt-br"
                scrollable
              >
                <v-spacer></v-spacer>
                <v-btn text color="primary" @click="modal1 = false"
                  >Voltar</v-btn
                >
                <v-btn text color="primary" @click="$refs.dialog2.save(date)"
                  >OK</v-btn
                >
              </v-date-picker>
            </v-dialog>
          </v-col>
        </v-row>
        <v-row>
          <v-col
            class="col-12 offset-md-4 offset-lg-3 offset-sm-3 column-button"
            sm="6"
            md="4"
            lg="6"
          >
            <v-btn
              class="ma-2"
              v-on:click.native="submit()"
              depressed
              color="success"
              >Cadastrar</v-btn
            >
            <v-btn class="ma-2" v-on:click.native="clear()" outlined
              >Limpar Campos</v-btn
            >
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
        (v) => !!v || "Campo obrigatório",
        (v) => (v && v.length <= 10) || "Name must be less than 10 characters",
      ],
      email: "",
      password: "",
      confirmaPassword: "",
      emailRules: [
        (v) => !!v || "E-mail is required",
        (v) => /.+@.+\..+/.test(v) || "E-mail inválido",
      ],
      rulesPassword: {
        required: (value) => !!value || "Required.",
        min: (v) => v.length >= 8 || "Min 8 characters",
      },

      select: null,
      date: new Date().toISOString().substr(0, 10),
      modal1: false,
      trip: {
        name: "",
        location: null,
        start: null,
        end: null,
      },
      show1: false,
      show2: false,
    };
  },

  props: {
    show: Boolean,
  },

  methods: {
    clear() {
      this.$refs.form.reset();
      this.celular = "";
    },
    submit() {
      const memberDetails = new Object();

      memberDetails.username = "";
      memberDetails.email = this.email;
      memberDetails.first_name = this.first - name;
      memberDetails.last_name = this.last - name;
      memberDetails.post = this.post;
      memberDetails.departament = this.departament;
      memberDetails.leader = this.leader;
      memberDetails.slack = this.slack;
      memberDetails.phone = this.phone;
      memberDetails.photo = null;
      memberDetails.date_joined = "2020-04-03T22:49:56.874Z";
    },
  },
  computed: {
    passwordConfirmationRule() {
      return () =>
        this.password === this.confirmaPassword || "Password must match";
    },
  },
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
  color: #777777;
}
</style>
