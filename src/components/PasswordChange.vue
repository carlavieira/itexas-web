<template>
  <v-dialog persistent max-width="630px" v-model="show">
    <v-card class="pa-3">
      <v-layout row class="px-6 py-2" justify-space-between>
        <h2>Alteração de senha</h2>
        <v-btn @click="$emit('close')" title="Fechar" icon>
          <v-icon color="grey">mdi-close</v-icon>
        </v-btn>
      </v-layout>
      <v-form ref="form">
        <v-layout text-center wrap>
          <v-flex xs12></v-flex>
          <v-flex xs12 mb-4>
            <!-- <h1 class="title font-weight-medium mb-3">Mudar minha senha</h1> -->
          </v-flex>
          <v-flex class="container-text-field" cols="12" sm="6">
            <v-text-field
              style="width: 400px"
              v-model="new_password1"
              :append-icon="showPWD1 ? 'mdi-eye' : 'mdi-eye-off'"
              :rules="[rules.required, rules.min]"
              :type="showPWD1 ? 'text' : 'password'"
              name="password"
              label="Entre com a nova senha"
              counter
              outlined
              dense
              @click:append="showPWD1 = !showPWD1"
            ></v-text-field>

            <v-text-field
              style="width: 400px"
              v-model="new_password2"
              :append-icon="showPWD2 ? 'mdi-eye' : 'mdi-eye-off'"
              :rules="[rules.required, rules.min, passwordConfirmationRule]"
              :type="showPWD2 ? 'text' : 'password'"
              name="input-10-1"
              label="Repita a senha"
              hint=""
              counter
              outlined
              dense
              @click:append="showPWD2 = !showPWD2"
            ></v-text-field>
          </v-flex>
          <v-col class="d-flex" cols="12" sm="6">
            <v-btn color="green darken-1" text @click="passwordChange()"
              >Enviar</v-btn
            >

            <v-btn color="red darken-1" text @click="$emit('close')"
              >Cancelar</v-btn
            >
          </v-col>
        </v-layout>
      </v-form>
    </v-card>
  </v-dialog>
</template>

<script>
import AuthController from "../controllers/AuthController.js";
export default {
  data() {
    return {
      AuthController,
      showPWD1: false,
      showPWD2: false,
      new_password1: "",
      new_password2: "",
      rules: {
        required: (value) => !!value || "Você deve preencher os dois campos!",
        min: (v) =>
          v.length >= 8 || "A senha deve ter no mínimo de 8 caracteres",
      },
    };
  },
  computed: {
    passwordConfirmationRule() {
      return (
        this.new_password1 === this.new_password2 || "Senhas devem ser iguais"
      );
    },
  },
  props: {
    show: Boolean,
    email: String,
  },
  methods: {
    async passwordChange() {
      const passwords = {
        new_password1: this.new_password1,
        new_password2: this.new_password2,
      };
      if (this.validarFormularioPasswordChange()) {
        await this.AuthController.passwordChange(this.$api, passwords)
          .then((res) => {
            console.log(res);
            // if(res.status === 200) {
            //   this.$emit("close")
            // }
          })
          .catch((err) => {
            console.log(err);
          });
      }
    },
    validarFormularioPasswordChange() {
      return this.$refs.form.validate();
    },
  },
};
</script>
<style scoped>
.container-text-field {
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
