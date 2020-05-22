<template>
  <v-container>
    <v-layout row mx-4>
      <v-btn v-if="!editMember" icon @click="editMember = true" title="Editar">
        <v-icon color="black">mdi-account-edit</v-icon>
      </v-btn>
      <v-spacer></v-spacer>
      <v-btn outlined class="tertiary--text" @click="passwordDialog=true">
        <span class="caption">
          Mudar minha senha
        </span>
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
      <span v-if="!editMember" class="title font-weight-medium mt-3"
        >{{ member.first_name }} {{ member.last_name }}</span>
      <span v-if="!editMember" class="subheading font-weight-regular"
        >( {{ member.nickname }} )</span>
      <v-layout row mt-3 justify-space-around style="width: 100%;">
        <PasswordChange v-if="passwordDialog" :show="passwordDialog" @close="passwordDialog=false">

        </PasswordChange>
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
            v-if="member.post"
            prepend-inner-icon="mdi-briefcase"
            v-model="member.post.full_name"
            :disabled="!editMember"
            label="Cargo"
            hide-details
          ></v-text-field>
        </v-layout>
        <v-layout justify-left col-xs-12 col-sm-6>
          <v-text-field
            v-if="member.department"
            outlined
            prepend-inner-icon="mdi-border-none-variant"
            v-model="member.department.abbreviation"
            label="Area"
            :disabled="!editMember"
            hide-details
          ></v-text-field>
        </v-layout>
        <v-layout justify-left col-xs-12 col-sm-6>
          <v-text-field
            outlined
            v-if="member.leader"
            prepend-inner-icon="mdi-account-star"
            label="Líder"
            v-model="member.leader.first_name"
            :disabled="!editMember"
            hide-details
          ></v-text-field>
        </v-layout>

        <v-layout justify-left col-xs-12 col-sm-6>
          <v-menu
            ref="menu1"
            v-model="menu1"
            :close-on-content-click="false"
            transition="scale-transition"
            offset-y
          >
            <template v-slot:activator="{ on }">
              <v-text-field
                v-model="date"
                label="Data de entrada na AIESEC"
                persistent-hint
                prepend-inner-icon="mdi-calendar"
                v-on="on"
                outlined
                :disabled="!editMember"
                hide-details
              ></v-text-field>
            </template>
            <v-date-picker
              v-model="this.member.date_joined"
              no-title
              @input="menu1 = false"
            ></v-date-picker>
          </v-menu>
        </v-layout>
      </v-layout>

      <v-layout row align-center v-if="editMember">
        <v-btn class="ma-2" @click="sendEdit()" depressed color="success"
          >Salvar</v-btn
        >
      </v-layout>
    </v-layout>
  </v-container>
</template>

<script></script>

<script>
import memberController from "../controllers/MemberController";
import PasswordChange from "../components/PasswordChange.vue";
import moment from 'moment';
export default {

  components: {
    PasswordChange
  },

  data(){
    return {
    menu1: false,
    menu2: false,
    editMember: false,
    memberController,
    dialog: false,
    passwordDialog: false,
    member: {},
    date: ""
    }
  },

  created() {
    this.getMember();
  },

  methods: {
    formatData(data){
      console.log(data)
    },

    async getMember() {
      this.member = await this.memberController.getMemberById(
        this.$api,
        localStorage.getItem("user_id")
      );
      this.member.date_joined = moment(this.member.date_joined).format('DD/MM/YYYY')
      this.date = this.member.date_joined
    },

    async sendEdit() {
      delete this.member.post;
      delete this.member.department;
      delete this.member.leader;
      delete this.member.photo;

      await this.memberController
        .editMember(this.$api, this.member)
        .then((res) => {
          this.editMember = false;
          this.getMember();
        })
        .catch((err) => {
          console.log(err);
        });
    },
    async deleteMember() {
      await this.memberController
        .deleteMember(this.$api, this.member)
        .then((res) => {
          console.log(res);
          this.member = {};
          this.$emit("close");
          this.$emit("getMembers");
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
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
