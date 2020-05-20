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
            <v-select
              item-text="full_name"
              item-value="id"
              v-model="memberDetails.post"
              label="Cargo"
              name="post"
              prepend-icon="mdi-briefcase"
              :items="posts"
              required
              no-data-text="Sem cargos cadastrados"
            ></v-select>
          </v-col>
          <v-col class="col-12" sm="6" md="6" lg="6">
            <v-select
              item-text="abbreviation"
              item-value="id"
              v-model="memberDetails.department"
              label="Área"
              name="department"
              prepend-icon="mdi-border-none-variant"
              :items="departments"
              required
              no-data-text="Sem áreas cadastradas"
            ></v-select>
          </v-col>
          <v-col class="col-12" sm="6" md="6" lg="6">
            <v-select
              item-text="full_name"
              item-value="id"
              v-model="memberDetails.leader"
              label="Líder"
              name="member"
              prepend-icon="mdi-account-star"
              :items="leaders"
              no-data-text="Sem líderes cadastrados"
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
            <div
              data-v-4a0240ab
              class="v-input v-input--is-label-active v-input--is-dirty theme--light v-text-field v-text-field--is-booted"
            >
              <div class="v-input__prepend-outer">
                <div class="v-input__icon v-input__icon--prepend">
                  <i
                    aria-hidden="true"
                    class="v-icon notranslate mdi mdi-cellphone-iphone theme--light"
                  ></i>
                </div>
              </div>
              <div class="v-input__control">
                <div class="v-input__slot">
                  <div class="v-text-field__slot">
                    <label
                      for="input-248"
                      class="v-label v-label--active theme--light"
                      style="left: 0px; right: auto; position: absolute;"
                    >Celular</label>
                    <the-mask
                      v-model="memberDetails.phone"
                      for="phone"
                      no-gutters
                      id="input-248"
                      name="phoneInput"
                      :mask="'(##)#####-####'"
                    />
                  </div>
                </div>
                <div class="v-text-field__details">
                  <div class="v-messages theme--light">
                    <div class="v-messages__wrapper"></div>
                  </div>
                </div>
              </div>
            </div>
          </v-col>


          <v-col class="col-12" sm="6" md="6" lg="6">
            <div
              data-v-4a0240ab
              class="v-input v-input--is-label-active v-input--is-dirty theme--light v-text-field v-text-field--is-booted"
            >
              <div class="v-input__prepend-outer">
                <div class="v-input__icon v-input__icon--prepend">
                  <i
                    aria-hidden="true"
                    class="v-icon notranslate mdi mdi-calendar theme--light"
                  ></i>
                </div>
              </div>
              <div class="v-input__control">
                <div class="v-input__slot">
                  <div class="v-text-field__slot">
                    <label
                      for="input-188"
                      class="v-label v-label--active theme--light"
                      style="left: 0px; right: auto; position: absolute;"
                    >Data de Entrada</label>
                    <the-mask
                      v-model="memberDetails.dataEntrada"
                      no-gutters
                      id="input-188"
                      name="dateInput"
                      :mask="'##/##/####'"
                    />
                  </div>
                </div>
                <div class="v-text-field__details">
                  <div class="v-messages theme--light">
                    <div class="v-messages__wrapper"></div>
                  </div>
                </div>
              </div>
            </div>
          </v-col>

          

          <v-col class="col-12" sm="6" md="6" lg="6">
            <v-switch v-model="memberDetails.is_staff" color="tertiary" label="Administrador"></v-switch>
          </v-col>
        </v-row>

        <v-layout row align-center justify-end>
          <v-btn
            class="ma-2"
            @click="submit()"
            depressed
            :disabled="!valid"
            color="success"
          >Cadastrar</v-btn>
        </v-layout>
      </v-form>
    </v-card>
  </v-dialog>
</template>

<script>
import memberController from "../../controllers/MemberController";
import postController from "../../controllers/PostController";
import departmentController from "../../controllers/DepartmentsController";
import getAllLeaders from "../../functions/getAllLeaders"

export default {
  data() {
    return {
      name: "",
      memberController,
      postController,
      departmentController,
      getAllLeaders,
      valid: true,
      nameRules: [
        v => !!v || "Campo obrigatório",
        v => (v && v.length <= 20) || "Nome deve ter até 20 caracteres"
      ],
      emailRules: [
        v => !!v || "Campo Obrigatótio",
        v => /.+@.+\..+/.test(v) || "E-mail inválido"
      ],
      select: null,
      date: new Date().toISOString().substr(0, 10),
      modal1: false,
      show1: false,
      show2: false,
      posts: [],
      departments: [],
      leaders: [],
      memberDetails: {
        first_name: "",
        last_name: "",
        nickname: "",
        email: "",
        post: "",
        department: "",
        leader: "",
        slack: "",
        photo: null,
        phone: "",
        dataEntrada: "",
        is_active: true,
        is_staff: false,
      }
    };
  },

  created() {
    this.getDepartments();
    this.getPosts();
    this.getLeaders();
    this.leaders = this.setFullName(this.leaders);
  },

  props: {
    show: Boolean
  },

  methods: {
    async getPosts() {
      await this.postController
        .getPosts(this.$api)
        .then(res => {
          this.posts = res.data;
        })
        .catch(e => {
          console.log(e);
        });
    },

    async getDepartments() {
      await this.departmentController
        .getDepartments(this.$api)
        .then(res => {
          this.departments = res.data;
        })
        .catch(e => {
          console.log(e);
        });
    },

    async getLeaders() {
    },

    async submit() {
      let date = this.memberDetails.dataEntrada.slice(4) + '-' + this.memberDetails.dataEntrada.slice(2, 4) + '-' + this.memberDetails.dataEntrada.slice(0, 2)

      await this.getAllLeaders.getAll(this.$api);

      await this.memberController
        .createMember(this.$api, this.memberDetails, date)
        .then(res => {
          console.log(res);
          
          this.memberDetails = {};
          this.$emit("close");
          this.$emit("getMembers");
        })
        .catch(err => {
          console.log(err);
        });
    },

    setFullName(array) {
      const newArray = new Array();
      array.map((item) => {
        item.full_name = `${item.first_name} ${item.last_name}`;
        newArray.push(item);
      });
      return newArray;
    },

    validate() {
      this.$refs.form.validate();
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
  color: #777777;
}
</style>
