<template>
  <v-container fluid>
    <v-row align="center">
      <v-col>
        <v-card flat color="branco" class="px-8 pt-5 pb-12 form mx-auto">
          <v-form ref="form">
            <v-img src="../assets/rrrrr.png" width="100px" class="mt-3 mb-5 mx-auto" />
            <v-form class="pt-6">
              <v-text-field
                id="emailLogin"
                type="text"
                name="email"
                v-model="email"
                required
                :rules="validacaoEmail"
                outlined
                color="tertiary"
                label="Email"
              />
              <v-text-field
                id="senha"
                type="password"
                name="senha"
                v-model="senha"
                required
                :rules="validacaoSenha"
                outlined
                color="tertiary"
                label="Senha"
              />
            </v-form>
            <v-row class="px-3">
              <!-- <router-link class="font-weight-regular body-2" to="/login">Cadastre-se</router-link> -->
              <v-btn
                :loading="logando"
                v-on:click="login()"
                small
                outlined
                color="tertiary"
                class="ml-auto"
              >
                <span>Login</span>
              </v-btn>
            </v-row>
          </v-form>
          <br />
          <v-alert
            :value="alertError"
            color="red"
            dark
            border="top"
            icon="mdi-alert"
            transition="scale-transition"
          >{{ errorMessage }}</v-alert>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import routes from "../router/index.js";

export default {
  name: "Login",
  data() {
    return {
      logando: false,
      email: "",
      senha: "",
      alertError: false,
      errorMessage: "",
      routes,
      validacaoEmail: [
        v => !!v || "E-mail é obrigatório",
        v => /.+@.+/.test(v) || "E-mail inválido"
      ],
      validacaoSenha: [
        v => v.length >= 6 || "A senha precisa ter no mínimo 6 caracteres"
      ]
    };
  },
  methods: {
    showErrorAlert(message) {
      this.alertError = true;
      this.errorMessage = message;
    },
    hideErrorAlert() {
      this.alertError = false;
    },
    validarFormularioLogin() {
      return this.$refs.form.validate();
    },
    login() {
      let request = new Object();

      request.username = "";
      request.email = this.email;
      request.password = this.senha;

      console.log(request);
      var url = "http://itexas.pythonanywhere.com/rest-auth/login/";

      this.$http
        .post(url, request)
        .then(function(res) {
          //let resultado = res.json();
          alert("sucess");
          console.log(res)
          return res;
        })
        .catch(function(err) {
          alert("fail");
          return console.log(err);
        });
    }
  }
};
</script>

<style scoped>
.container {
  height: 100%;
  background-color: #fbf9fc;
  /* padding-top: -10px;
  background-image: url("../assets/19185.jpg");
  background-repeat: no-repeat;
  background-size: cover; */
}
.form {
  width: 60%;
}
a {
  text-decoration: none;
  color: white !important;
}
a:hover {
  color: tertiary !important;
}
@media (max-width: 575px) {
  .form {
    width: 95%;
    margin-top: 7%;
  }
}
@media (min-width: 576px) {
  .form {
    width: 85%;
    margin-top: 5%;
  }
}
@media (min-width: 768px) {
  .form {
    width: 60%;
    margin-top: 2%;
  }
}
@media (min-width: 992px) {
  .form {
    width: 50%;
    margin-top: 2%;
  }
}
@media (min-width: 1200px) {
  .form {
    width: 50%;
    margin-top: 2%;
  }
}
@media (min-width: 1280px) {
  .form {
    width: 40%;
    margin-top: 2%;
  }
}
@media (min-width: 1920px) {
  .form {
    width: 40%;
    margin-top: 5%;
  }
}
</style>
