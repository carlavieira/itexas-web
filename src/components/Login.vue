<template>
  <v-container fluid>
    <v-row align="center">
      <v-col>
        <v-snackbar top v-model="snackbar" :color="color" :timeout="timeout">
          {{ text }}</v-snackbar
        >
        <v-card flat color="transparent" class="px-8 pt-5 pb-12 form mx-auto">
          <v-form ref="form" v-if="loginPage">
            <v-img
              src="../assets/rrrrr.png"
              width="100px"
              class="mt-3 mb-5 mx-auto"
            />
            <v-form class="pt-6">
              <v-text-field
                id="emailLogin"
                type="text"
                name="email"
                v-model="email"
                placeholder="Digite seu email"
                required
                :rules="validacaoEmail"
                outlined
                color="tertiary"
                label="Email"
                v-on:keyup.enter="login()"
              />
              <v-text-field
                id="senha"
                type="password"
                name="senha"
                v-model="senha"
                placeholder="Digite sua senha"
                required
                outlined
                color="tertiary"
                label="Senha"
                v-on:keyup.enter="login()"
              />
            </v-form>
            <v-row class="px-3">
              <a @click="loginPage = false" class="a-small"
                >Esqueci minha senha</a
              >
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

          <v-form ref="form" v-if="!loginPage">
            <v-img
              src="../assets/rrrrr.png"
              width="100px"
              class="mt-3 mb-5 mx-auto"
            />
            <v-form class="pt-6">
              <v-text-field
                id="emailRedefinir"
                type="text"
                name="emailRedefinir"
                v-model="emailRedefinir"
                required
                outlined
                color="tertiary"
                label="Digite o email para redefinir a senha"
              />
            </v-form>
            <v-row class="px-3">
              <a @click="loginPage = true" class="a-small">Voltar pro Login</a>
              <v-btn
                @click="sendEmail(emailRedefinir)"
                small
                outlined
                color="tertiary"
                class="ml-auto"
              >
                <span>Enviar Email</span>
              </v-btn>
            </v-row>
          </v-form>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import routes from "../router/index.js";
import authController from "../controllers/AuthController";

export default {
  name: "Login",
  data() {
    return {
      logando: false,
      loginPage: true,
      email: "",
      senha: "",
      emailRedefinir: "",
      alertError: false,
      errorMessage: "",
      routes,
      authController,
      validacaoEmail: [
        (v) => !!v || "E-mail é obrigatório",
        (v) => /.+@.+/.test(v) || "E-mail inválido",
      ],
      validacaoSenha: [
        (v) => v.length >= 6 || "A senha precisa ter no mínimo 6 caracteres",
      ],
      snackbar: false,
      text: "",
      timeout: 3000,
      color: "",
    };
  },
  methods: {
    async sendEmail(email) {
      await this.authController
        .sendEmail(this.$http, email)
        .then(() => {
          this.loginPage = true;
          this.setSnackbar("Email enviado com sucesso", "success");
        })
        .catch(() => {
          this.setSnackbar("Erro ao enviar email", "error");
        });
    },

    setSnackbar(text, color) {
      this.text = text;
      this.color = color;
      this.snackbar = true;
    },

    validarFormularioLogin() {
      return this.$refs.form.validate();
    },

    async login() {
      await this.authController
        .login(this.$http, this.email, this.senha)
        .then(() => {
          this.setSnackbar("Login efetuado", "success");
          this.$router.push("/membro/dashboard");
          location.reload(true);

        })
        .catch(() => {
          this.setSnackbar("Erro ao efetuar login", "error");
        });
    },
  },
};
</script>

<style scoped>
.container {
  height: 100%;
  background-color: white;
  background-image: url("../assets/graphic.png");
  background-position: bottom;
}
.form {
  width: 60%;
}
a {
  text-decoration: none;
  color: #ff3535 !important;
  font-size: 13px;
}

a:hover {
  color: #9c0f0c !important;
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
