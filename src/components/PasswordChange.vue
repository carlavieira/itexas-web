<template>
  <v-dialog v-model="show">
    <v-card class="pa-3">
      <v-layout row class="px-3" justify-space-between>
        <h2>Alteração de senha</h2>
        <v-btn @click="$emit('close')" title="Fechar" icon>
          <v-icon color="grey">mdi-close</v-icon>
        </v-btn>
      </v-layout>
      <v-form ref="form" v-model="valid">
        <v-layout text-center wrap>
          <v-flex xs12></v-flex>
          <v-flex xs12 mb-4>
            <!-- <h1 class="title font-weight-medium mb-3">Mudar minha senha</h1> -->
          </v-flex>
          <v-flex offset-md-3 xs6>
            <v-text-field
              :value="userPasswor"
              label="Entre com a nova senha"
              hint="Your password passed! Password rules are not meant to be broken!"
              :append-icon="value ? 'mdi-eye' : 'mdi-eye-off'"
              @click:append="() => (value = !value)"
              :type="value ? 'password' : 'text'"
              :rules="[rules.password]"
              @input="(_) => (userPassword = _)"
            ></v-text-field>
          </v-flex>
          <v-flex offset-md-3 xs6>
            <v-text-field
              :value="userPassword2"
              label="Repita a senha"
              hint="Your password passed! Password rules are not meant to be broken!"
              :append-icon="value ? 'mdi-eye' : 'mdi-eye-off'"
              @click:append="() => (value = !value)"
              :type="value ? 'password' : 'text'"
              :rules="[rules.password]"
              @input="(_) => (userPassword = _)"
            ></v-text-field>
          </v-flex>
        </v-layout>
      </v-form>
    </v-card>
  </v-dialog>
</template>

<script>
import AuthController from "../controllers/AuthController.js";
export default {
  data: () => ({
    AuthController,
    userPassword: "",
    userPassword2: "",
    valid: true,
    value: true,
    rules: {
      required: (value) => !!value || "Required.",
      password: (value) => {
        const pattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#%^&])(?=.{8,})/;
        return (
          pattern.test(value) ||
          "Min. 8 characters with at least one capital letter, a number and a special character."
        );
      },
    },
  }),
  props: {
    show: Boolean,
  },
};
</script>
