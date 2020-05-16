<template>
  <v-dialog max-width="800px" persistent v-model="show">
    <v-card class="pa-6">
      <v-layout row class="px-3" justify-space-between>
        <h2>Cadastro de Membro</h2>
        <v-btn @click="$emit('close')" title="Fechar" icon>
          <v-icon color="grey">mdi-close</v-icon>
        </v-btn>
      </v-layout>
      <v-form ref="form" autocomplete="off" v-model="valid" lazy-validation>
        <v-row>
          <v-col class="col-12" sm="6" md="6" lg="6">
            <v-text-field
              :counter="20"
              v-model="memberDetails.first_name"
              :rules="nameRules"
              label="Nome*"
              name="firstName"
              prepend-icon="mdi-card-account-details"
              required
            ></v-text-field>
          </v-col>

          <v-col class="col-12" sm="6" md="6" lg="6">
            <v-text-field
              v-model="memberDetails.last_name"
              :counter="20"
              :rules="nameRules"
              label="Sobrenome*"
              name="lastName"
              required
            ></v-text-field>
          </v-col>

          <v-col class="col-12" sm="6" md="6" lg="6">
            <v-text-field
              :counter="40"
              v-model="memberDetails.nickname"
              label="Apelido"
              name="nickname"
              prepend-icon="mdi-account-heart"
            ></v-text-field>
          </v-col>

          <v-col class="col-12" sm="6" md="6" lg="6">
            <v-text-field
              v-model="memberDetails.email"
              :rules="emailRules"
              label="E-mail*"
              name="email"
              prepend-icon="mdi-email"
              required
              no-gutters
            ></v-text-field>
          </v-col>

          <v-col class="col-12" sm="6" md="6" lg="6">
            <v-text-field
              v-model="memberDetails.password1"
              :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
              :rules="[rulesPassword.required, rulesPassword.min]"
              :type="show1 ? 'text' : 'password'"
              prepend-icon="mdi-key"
              name="password"
              label="Senha*"
              hint="At least 8 characters"
              counter
              required
              @click:append="show1 = !show1"
            ></v-text-field>
          </v-col>

          <v-col class="col-12" sm="6" md="6" lg="6">
            <v-text-field
              v-model="memberDetails.password2"
              :append-icon="show2 ? 'mdi-eye' : 'mdi-eye-off'"
              prepend-icon="mdi-key"
              :rules="[rulesPassword.required, passwordConfirmationRule]"
              :type="show2 ? 'text' : 'password'"
              name="password2"
              label="Confirme a senha"
              hint="At least 8 characters"
              required
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
              v-model="memberDetails.slack"
              label="Slack"
              name="slack"
              prepend-icon="mdi-slack"
              no-gutters
            ></v-text-field>
          </v-col>
          <v-col class="col-12" sm="6" md="6" lg="6">
            <v-text-field
              v-model="memberDetails.phone"
              name="phone"
              label="Celular (xx) xxxxx-xxxx"
              mask="(##)#####-####"
              return-masked-value
              prepend-icon="mdi-cellphone-iphone"
              no-gutters
            ></v-text-field>
          </v-col>
          <!--
          <v-col class="col-12" sm="6" md="6" lg="6">
            <v-file-input
              name="profile-picture"
              accept="image/png, image/jpeg, image/bmp"
              placeholder="Selecionar Foto"
              prepend-icon="mdi-camera"
              label="Avatar"
            ></v-file-input>
          </v-col>
          -->

          <!-- Data de Entrada (Calendário) -->
          <v-col class="col-12" sm="6" md="6" lg="6">
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
        <v-layout row align-center justify-end>
          <v-btn
            class="ma-2"
            @click="submit()"
            depressed
            :disabled="!valid"
            color="success"
            >Cadastrar</v-btn
          >
        </v-layout>
      </v-form>
    </v-card>
  </v-dialog>
</template>

<script>
import memberController from "../../controllers/MemberController";
export default {
  data() {
    return {
      name: "",
      memberController,
      valid: true,
      nameRules: [
        (v) => !!v || "Campo obrigatório",
        (v) => (v && v.length <= 20) || "Nome deve ter até 20 caracteres",
      ],
      emailRules: [
        (v) => !!v || "Campo Obrigatótio",
        (v) => /.+@.+\..+/.test(v) || "E-mail inválido",
      ],
      rulesPassword: {
        required: (value) => !!value || "Campo Obrigatório.",
        min: (v) => (v && v.length >= 8) || "Mínimo 8 caracteres",
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
      memberDetails: {
        first_name: null,
        last_name: null,
        nickname: null,
        email: null,
        password1: null,
        password2: null,
        slack: null,
        phone: null,
        date_joined: "2020-05-10",
      },
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

    async submit() {
      console.log(this.memberDetails);
      this.memberDetails.date_joined=this.date;
      await this.memberController
        .createMember(this.$api, this.memberDetails)
        .then((res) => {
          console.log(res);
          this.memberDetails = {};
          this.$emit("close");
          this.$emit("getMembers");
        })
        .catch((err) => {
          console.log(err);
        });
    },

    validate() {
      this.$refs.form.validate();
    },
  },

  computed: {
    passwordConfirmationRule() {
      return () =>
        this.memberDetails.password1 === this.memberDetails.password2 ||
        "As senhas devem coincidir";
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
