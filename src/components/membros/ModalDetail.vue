<template>
  <v-dialog max-width="800px" persistent v-model="show">
    <v-card class="pa-5">
      <v-layout row class="px-3">
        <v-btn
          v-if="this.$route.name == 'membersAdm'"
          color="red"
          @click.stop="dialog = true"
          title="Excluir"
          class="ma-2"
        >
          <v-icon color="white">mdi-delete</v-icon>
        </v-btn>

        <v-btn
          v-if="!editMember && (this.$route.name == 'membersAdm')"
          color="black"
          class="ma-2"
          @click="editMember = true"
          title="Editar"
        >
          <v-icon color="white">mdi-account-edit</v-icon>
        </v-btn>

        <v-dialog v-model="dialog" max-width="500" min-h>
          <v-card>
            <v-card-title style="font-size: 16px !important" class="headline">
              Deseja realmente deletar {{ member.first_name }}
              {{ member.last_name }}?
            </v-card-title>
            <v-card-actions>
              <v-spacer></v-spacer>

              <v-btn
                color="green darken-1"
                text
                @click="
                  dialog = false;
                  deleteMember();
                "
              >Sim</v-btn>

              <v-btn color="red darken-1" text @click="dialog = false">Não</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>

        <v-spacer></v-spacer>
        <v-btn @click="$emit('close')" title="Fechar" icon>
          <v-icon color="grey">mdi-close</v-icon>
        </v-btn>
      </v-layout>
      <v-layout column mx-2 justify-center align-center>
        <v-avatar size="130px" class="avatar">
          <v-layout size="130px" class="shadow-avatar" v-if="editMember">
            <v-btn icon class="float" v-if="editMember">
              <v-icon>mdi-camera</v-icon>
            </v-btn>
          </v-layout>
        </v-avatar>
        <span
          v-if="!editMember"
          class="title font-weight-medium mt-3"
        >{{ member.first_name }} {{ member.last_name }}</span>
        <span v-if="!editMember" class="subheading font-weight-regular">( {{ member.nickname }} )</span>
        <v-layout row mt-3 justify-space-around style="width: 100%;">
          <v-layout justify-left col-xs-12 col-sm-6 v-if="editMember">
            <v-text-field
              label="Nome"
              outlined
              prepend-inner-icon="mdi-alpha-n"
              v-model="member.first_name"
              hide-details
            ></v-text-field>
          </v-layout>
          <v-layout justify-left col-xs-12 col-sm-6 v-if="editMember">
            <v-text-field
              label="Sobrenome"
              outlined
              prepend-inner-icon="mdi-alpha-s"
              v-model="member.last_name"
              hide-details
            ></v-text-field>
          </v-layout>
          <v-layout justify-left col-xs-12 col-sm-6 v-if="editMember">
            <v-text-field
              label="Apelido"
              outlined
              prepend-inner-icon="mdi-account-heart"
              v-model="member.nickname"
              hide-details
            ></v-text-field>
          </v-layout>
          <v-layout justify-left col-xs-12 col-sm-6>
            <v-text-field
              outlined
              prepend-inner-icon="mdi-email"
              v-model="member.email"
              :disabled="!editMember"
              hide-details
            ></v-text-field>
          </v-layout>
          <v-layout justify-left col-xs-12 col-sm-6>
            <v-text-field
              outlined
              prepend-inner-icon="mdi-slack"
              v-model="member.slack"
              :disabled="!editMember"
              hide-details
            ></v-text-field>
          </v-layout>
          <v-layout justify-left col-xs-12 col-sm-6>
            <v-text-field
              outlined
              prepend-inner-icon="mdi-phone"
              v-model="member.phone"
              :disabled="!editMember"
              hide-details
            ></v-text-field>
          </v-layout>
          <v-layout justify-left col-xs-12 col-sm-6>
            <v-text-field
              outlined
              v-if="!editMember"
              prepend-inner-icon="mdi-briefcase"
              v-model="member.post.abbreviation"
              :disabled="!editMember"
              label="Cargo"
              hide-details
            ></v-text-field>
            <v-select
              v-if="editMember"
              item-text="full_name"
              item-value="id"
              v-model="member.post.id"
              label="Cargo"
              name="post"
              outlined
              prepend-inner-icon="mdi-briefcase"
              :items="posts"
              required
              hide-details
              no-data-text="Sem cargos cadastrados"
            ></v-select>
          </v-layout>
          <v-layout justify-left col-xs-12 col-sm-6>
            <v-text-field
              v-if="!editMember"
              outlined
              prepend-inner-icon="mdi-border-none-variant"
              v-model="member.department.abbreviation"
              label="Area"
              :disabled="!editMember"
              hide-details
            ></v-text-field>
            <v-select
              v-if="editMember"
              item-text="abbreviation"
              item-value="id"
              v-model="member.department.id"
              label="Área"
              name="department"
              prepend-inner-icon="mdi-border-none-variant"
              :items="departments"
              required
              outlined
              no-data-text="Sem áreas cadastradas"
              hide-details
            ></v-select>
          </v-layout>
          <v-layout justify-left col-xs-12 col-sm-6>
            <v-text-field
              outlined
              v-if="!editMember"
              prepend-inner-icon="mdi-account-star"
              label="Líder"
              v-model="member.leader.first_name"
              :disabled="!editMember"
              hide-details
            ></v-text-field>
            <v-select
              v-if="editMember"
              :item-text="leader_full_name"
              item-value="id"
              :items="leaders"
              v-model="member.leader.id"
              outlined
              label="Líder"
              name="member"
              prepend-inner-icon="mdi-account-star"
              no-data-text="Sem líderes cadastrados"
              hide-details
            ></v-select>
          </v-layout>

          <v-layout justify-left col-xs-12 col-sm-6>
            <v-text-field
              outlined
              v-if="!editMember"
              prepend-inner-icon="mdi-calendar"
              label="Data de Entrada"
              v-model="date"
              :disabled="!editMember"
              hide-details
            ></v-text-field>
            <v-menu
              v-if="editMember"
              v-model="menuData"
              :close-on-content-click="false"
              :nudge-right="40"
              transition="scale-transition"
              offset-y
              min-width="290px"
            >
              <template v-slot:activator="{ on }">
                <v-text-field
                  v-model="member.date_joined"
                  outlined
                  label="Data de Entrada"
                  prepend-inner-icon="mdi-calendar"
                  readonly
                  hide-details
                  v-on="on"
                ></v-text-field>
              </template>
              <v-date-picker locale="pt-br" v-model="member.date_joined" @input="menuData = false"></v-date-picker>
            </v-menu>
          </v-layout>

          <v-layout justify-left col-xs-12 col-sm-6>
            <v-switch
              v-if="editMember"
              v-model="member.is_staff"
              color="tertiary"
              label="Administrador"
            ></v-switch>
            <v-switch
              :disabled="!editMember"
              v-if="!editMember"
              v-model="member.is_staff"
              color="tertiary"
              label="Administrador"
            ></v-switch>
            <v-spacer></v-spacer>

            <v-switch v-if="editMember" v-model="member.is_active" color="tertiary" label="Ativo"></v-switch>
            <v-switch
              :disabled="!editMember"
              v-if="!editMember"
              v-model="member.is_active"
              color="tertiary"
              label="Ativo"
            ></v-switch>
          </v-layout>
        </v-layout>

        <v-layout row align-center v-if="editMember">
          <v-btn class="ma-2" @click="sendEdit()" depressed color="success">Salvar</v-btn>
        </v-layout>
      </v-layout>
    </v-card>
  </v-dialog>
</template>

<script></script>

<script>
import memberController from "../../controllers/MemberController";
import postController from "../../controllers/PostController";
import departmentController from "../../controllers/DepartmentsController";
import getAllLeaders from "../../functions/getAllLeaders";
import moment from "moment";

export default {
  data() {
    return {
      editMember: false,
      memberController,
      postController,
      departmentController,
      getAllLeaders,
      dialog: false,
      posts: [],
      departments: [],
      leaders: [],
      member: null,
      date: null,
      menuData: false,
      dateEdit: null
    };
  },

  props: {
    show: Boolean,
    Member: Object
  },

  async created() {
    this.member = this.Member;
    console.log(this.member);
    this.date = moment(this.member.date_joined).format("DD/MM/YYYY");
    await this.getDepartments();
    await this.getPosts();
    await this.getLeaders();
  },

  methods: {
    leader_full_name: item => `${item.first_name} ${item.last_name}`,
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
      await this.memberController
        .getAllMembers(this.$api)
        .then(res => {
          this.leaders = res;
        })
        .catch(e => {
          console.log(e);
        });
    },

    async sendEdit() {
      let memberEdit = this.member;
      await this.memberController
        .editMember(this.$api, memberEdit)
        .then(res => {
          console.log(res);
          this.member = res;
          this.date = moment(this.member.date_joined).format("DD/MM/YYYY");
          this.setObjects();
          this.$emit("getMembers");
        })
        .catch(err => {
          console.log(err);
        });
    },

    setObjects() {
      this.posts.forEach(post => {
        if (post.id == this.member.post) this.member.post = post;
      });

      this.departments.forEach(department => {
        if (department.id == this.member.department)
          this.member.department = department;
      });

      this.leaders.forEach(leader => {
        if (leader.id == this.member.leader) this.member.leader = leader;
      });

      this.editMember = false;
    },

    async deleteMember() {
      await this.memberController
        .deleteMember(this.$api, this.member)
        .then(res => {
          console.log(res);
          this.$emit("close");
          this.$emit("getMembers");
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
};
</script>

<style scoped>
.float {
  width: 130px;
  height: 130px;
}

.float:hover i.v-icon.v-icon {
  color: white !important;
}

i.v-icon.v-icon {
  color: transparent;
}

.avatar {
  background-image: url(https://i.imgur.com/EvaCfem.png);
  background-position: center center;
  width: 130px;
  height: 130px;
  background-size: contain;
}

.shadow-avatar {
  width: 130px;
  height: 130px;
}

.shadow-avatar:hover {
  background-color: rgba(0, 0, 0, 0.2);
  -webkit-transition: background-color 300ms linear;
  -ms-transition: background-color 200ms linear;
  transition: background-color 200ms linear;
  cursor: pointer;
}
</style>
