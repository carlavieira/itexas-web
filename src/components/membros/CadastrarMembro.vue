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
              label="Líder"
              name="leader"
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
            <v-text-field
              v-model="memberDetails.phone"
              name="phone"
              label="Celular (xx) xxxxx-xxxx"
              prepend-icon="mdi-cellphone-iphone"
              no-gutters
            ></v-text-field>
          </v-col>
          <v-col class="col-12" sm="6" md="6" lg="6">
            <v-text-field
              v-model="memberDetails.date_joined"
              name="date_joined"
              label="Data de entrada"
              prepend-icon="mdi-calendar"
              no-gutters
            ></v-text-field>
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

export default {
  data() {
    return {
      name: "",
      memberController,
      postController,
      departmentController,
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
        post: null,
        department: null,
        leader: null,
        slack: "",
        photo: null,
        phone: "",
        date_joined: "",
        is_active: true,
        is_staff: false
      }
    };
  },

  created() {
    this.getDepartments();
    this.getPosts();
    this.getLeaders();
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
          this.departments = res.data
          console.log(this.departments)
        })
        .catch(e => {
          console.log(e);
        });
    },

    async getLeaders() {},

    async submit() {
      console.log(this.memberDetails);
      await this.memberController
        .createMember(this.$api, this.memberDetails)
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
