<template>
  <v-container v-if="member">
    <v-layout row mx-4>
      <v-btn v-if="!editMember && !editHist" icon @click="editMember = true" title="Editar">
        <v-icon color="black">mdi-account-edit</v-icon>
      </v-btn>
      <v-btn
        v-if="editMember && !editHist"
        icon
        class="ma-2"
        @click="editMember = false"
        title="Voltar"
      >
        <v-icon color="grey">mdi-arrow-left</v-icon>
      </v-btn>

      <v-btn
        v-if="!editMember && editHist"
        icon
        class="ma-2"
        @click="editHist = false"
        title="Voltar"
      >
        <v-icon color="grey">mdi-arrow-left</v-icon>
      </v-btn>
      <v-spacer></v-spacer>
      <v-btn outlined class="tertiary--text" @click="passwordDialog=true">
        <span class="caption">Mudar minha senha</span>
      </v-btn>
    </v-layout>

    <v-snackbar top v-model="snackbar" :color="color" :timeout="timeout">
      {{
      text
      }}
    </v-snackbar>

    <v-dialog v-model="deleteB" max-width="500" min-h>
      <v-card>
        <v-card-title
          style="font-size: 16px !important"
          class="headline"
        >Deseja realmente deletar o histórico?</v-card-title>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="red darken-1" text @click="deleteB = false">Não</v-btn>
          <v-btn
            color="green darken-1"
            text
            @click="
                  deleteB = false;
                  deleteBack();
                "
          >Sim</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-layout column mx-2 justify-center align-center v-if="!editHist">
      <v-avatar size="130px" class="avatar" color="indigo">
        <img v-if="showImage" :src="showImage" class="adjust" />
        <span v-if="!showImage" class="white--text headline">{{ abb }}</span>

        <v-btn icon class="float" v-if="editMember">
          <label for="changeImage">
            <v-icon>mdi-camera</v-icon>
          </label>
        </v-btn>

        <input
          id="changeImage"
          type="file"
          style="display:none;"
          accept="image/*"
          @change="onChangeImage"
        />
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

        <v-layout justify-left col-xs-12 col-sm-6 v-if="member.leader">
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

    <v-divider v-if="!editHist && !editMember" class="ma-3"></v-divider>

    <v-layout v-if="!editMember" column>
      <v-layout row class="mx-3" align-center>
        <span class="title font-weight-medium">Histórico</span>
        <span
          v-if="editHist"
          class="title font-weight-medium pl-1"
        >- {{ member.first_name }} {{ member.last_name }}</span>
        <v-spacer></v-spacer>

        <v-btn
          v-if="!editHist"
          icon
          class="ma-2"
          @click="editHist = true, textBtnHist = 'Adicionar'"
          title="Editar"
        >
          <v-icon color="black">mdi-account-edit</v-icon>
        </v-btn>
      </v-layout>

      <v-layout row mx-2 mb-4 mt-3 v-if="editHist">
        <v-layout col-xs-6 col-sm-4 pa-1>
          <v-select
            label="Cargo"
            name="post"
            outlined
            prepend-inner-icon="mdi-briefcase"
            :items="posts"
            v-model="histNewObj.post"
            item-text="abbreviation"
            item-value="id"
            required
            hide-details
            no-data-text="Sem cargos cadastrados"
          ></v-select>
        </v-layout>
        <v-layout col-xs-6 col-sm-4 pa-1>
          <v-select
            label="Área"
            name="department"
            v-model="histNewObj.department"
            outlined
            item-text="abbreviation"
            item-value="id"
            prepend-inner-icon="mdi-briefcase"
            :items="departments"
            required
            hide-details
            no-data-text="Sem áreas cadastrados"
          ></v-select>
        </v-layout>
        <v-layout col-xs-6 col-sm-4 pa-1>
          <v-menu
            v-model="menuDataInicio"
            :close-on-content-click="false"
            :nudge-right="40"
            transition="scale-transition"
            offset-y
            min-width="290px"
          >
            <template v-slot:activator="{ on }">
              <v-text-field
                outlined
                v-model="histNewObj.start_date"
                label="Data de Início"
                prepend-inner-icon="mdi-calendar"
                readonly
                hide-details
                v-on="on"
              ></v-text-field>
            </template>
            <v-date-picker
              v-model="histNewObj.start_date"
              locale="pt-br"
              @input="menuDataInicio = false"
            ></v-date-picker>
          </v-menu>
        </v-layout>

        <v-layout col-xs-6 col-sm-4 pa-1>
          <v-menu
            v-model="menuDataFim"
            :close-on-content-click="false"
            :nudge-right="40"
            transition="scale-transition"
            offset-y
            min-width="290px"
          >
            <template v-slot:activator="{ on }">
              <v-text-field
                outlined
                label="Data de Término"
                prepend-inner-icon="mdi-calendar"
                readonly
                hide-details
                v-model="histNewObj.end_date"
                v-on="on"
              ></v-text-field>
            </template>
            <v-date-picker
              v-model="histNewObj.end_date"
              locale="pt-br"
              @input="menuDataFim = false"
            ></v-date-picker>
          </v-menu>
        </v-layout>

        <v-layout col-xs-6 col-sm-4 pa-1>
          <v-text-field v-model="histNewObj.description" outlined label="Descrição" hide-details></v-text-field>
        </v-layout>

        <v-layout col-xs-6 col-sm-4 pa-1 align-end justify-end>
          <v-btn class="success dark" @click="changeHist()">
            <span>{{ textBtnHist }}</span>
          </v-btn>
        </v-layout>
      </v-layout>

      <v-card class="mx-3 mb-3">
        <v-data-table
          no-data-text="Membro não possui histórico cadastrado"
          :headers="headersHist"
          :items="hist"
          hide-default-footer
        >
          <template v-slot:item.start_date="{ item }">
            <span>{{ formatDate(item.start_date) }}</span>
          </template>
          <template v-slot:item.end_date="{ item }">
            <span>{{ formatDate(item.end_date) }}</span>
          </template>
          <template v-slot:item.actions="{ item }" v-if="editHist">
            <v-icon small @click="editBackPrepare(item)">mdi-pencil</v-icon>
            <v-icon class="pl-3" small @click="deleteB = true, itemToDelete = item.id">mdi-delete</v-icon>
          </template>
        </v-data-table>
      </v-card>
    </v-layout>
    <PasswordChange
      v-if="passwordDialog"
      :show="passwordDialog"
      @close="passwordDialog=false"
      :email="member.email"
    ></PasswordChange>
  </v-container>
</template>

<script></script>

<script>
import memberController from "../controllers/MemberController";
import postController from "../controllers/PostController";
import departmentController from "../controllers/DepartmentsController";
import getAllLeaders from "../functions/getAllLeaders";
import backgroundController from "../controllers/BackgroundController";
import moment from "moment";
import PasswordChange from "./PasswordChange.vue";

export default {
  components: {
    PasswordChange
  },

  data() {
    return {
      editMember: false,
      memberController,
      postController,
      departmentController,
      getAllLeaders,
      backgroundController,
      dialog: false,
      posts: [],
      departments: [],
      leaders: [],
      member: null,
      date: null,
      menuData: false,
      dateEdit: null,
      abb: null,
      showImage: null,
      headersHist: [
        {
          text: "Cargo",
          align: "start",
          value: "post.abbreviation"
        },
        { text: "Área", value: "department.abbreviation" },
        { text: "Data Início", value: "start_date" },
        { text: "Data Fim", value: "end_date" },
        { text: "Descrição", value: "description" },
        { text: "Ações", value: "actions" }
      ],
      hist: [],
      editHist: false,
      menuDataInicio: false,
      menuDataFim: false,
      histNewObj: {
        member: null,
        start_date: null,
        end_date: null,
        post: null,
        department: null,
        description: ""
      },
      textBtnHist: "",
      snackbar: false,
      text: "",
      timeout: 3000,
      color: "",
      deleteB: false,
      itemToDelete: null,
      passwordDialog: false
    };
  },

  async created() {
    await this.getMember();
    await this.getDepartments();
    await this.getPosts();
    await this.getLeaders();
    await this.getBackground();
  },

  methods: {
    leader_full_name: item => `${item.first_name} ${item.last_name}`,

    async getMember() {
      this.member = await this.memberController.getMemberById(
        this.$api,
        localStorage.getItem("user_id")
      );
    },

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

    async getBackground() {
      await this.backgroundController
        .getBackground(this.$api, this.member.id)
        .then(res => {
          this.hist = res.data;
          console.log(this.hist);
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
          this.setSnackbar("Perfil Atualizado!", "success");
          this.setObjects();
        })
        .catch(err => {
          console.log(err);
          this.setSnackbar("Erro ao atualizar perfil.", "error");
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

    async onChangeImage(e) {
      this.showImage = window.URL.createObjectURL(e.target.files[0]);
      this.member.photo = e.target.files[0];
    },

    formatDate(item) {
      return moment(item).format("DD/MM/YYYY");
    },

    editBackPrepare(item) {
      console.log(item);
      this.textBtnHist = "Editar";
      this.histNewObj = item;
    },

    changeHist() {
      if (this.textBtnHist == "Adicionar") this.newBack();
      if (this.textBtnHist == "Editar") this.editBack();
    },

    async newBack() {
      this.histNewObj.member = this.member.id;
      await this.backgroundController
        .createBackround(this.$api, this.histNewObj)
        .then(res => {
          console.log(res);
          this.getBackground();
          this.setSnackbar("Histórico Adicionado!", "success");
          this.histNewObj = {
            member: null,
            start_date: null,
            end_date: null,
            post: null,
            department: null,
            description: ""
          };
        })
        .catch(e => {
          console.log(e);
          this.setSnackbar("Erro ao adicionar histórico.", "error");
        });
    },

    async editBack() {
      this.histNewObj.member = this.member.id;
      await this.backgroundController
        .editBackground(this.$api, this.histNewObj)
        .then(res => {
          console.log(res);
          this.getBackground();
          this.setSnackbar("Histórico Editado!", "success");
          this.textBtnHist = "Adicionar";
          this.histNewObj = {
            member: null,
            start_date: null,
            end_date: null,
            post: null,
            department: null,
            description: ""
          };
        })
        .catch(e => {
          console.log(e);
          this.setSnackbar("Erro ao editar histórico.", "error");
        });
    },

    async deleteBack() {
      await this.backgroundController
        .deleteBackground(this.$api, this.itemToDelete)
        .then(res => {
          console.log(res);
          this.getBackground();
          this.setSnackbar("Histórico Excluído!", "success");
        })
        .catch(e => {
          console.log(e);
          this.setSnackbar("Erro ao excluir histórico.", "error");
        });
    },

    setSnackbar(text, color) {
      this.text = text;
      this.color = color;
      this.snackbar = true;
    }
  }
};
</script>

<style scoped>
.float {
  width: 130px;
  height: 130px;
  position: fixed;
}

.float:hover {
  background-color: rgba(51, 51, 51, 0.5);
}

.float:hover i.v-icon.v-icon {
  color: white !important;
}

i.v-icon.v-icon {
  color: transparent;
}

.adjust {
  width: auto;
  height: 100%;
}

.v-v-input--is-disabled.theme--light.v-card {
  color: red !important;
}
</style>
