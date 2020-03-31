<template>
  <div>
    <v-app-bar dark color="primary" class="px-2 hidden-lg-and-up" style="max-height:56px">
      <v-app-bar-nav-icon color="tertiary" @click=" drawer = !drawer"></v-app-bar-nav-icon>
      <v-spacer></v-spacer>
      <v-toolbar-title class="pl-0">
        <v-img src="../assets/branco2.png" max-width="70px" />
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-app-bar-nav-icon color="primary"></v-app-bar-nav-icon>
    </v-app-bar>

    <v-navigation-drawer app color="primary" v-model="drawer">
      <v-list-item style="height:170px;" class="pa-5">
        <v-list-item-content>
          <v-img max-width="75px" class="mx-auto" src="../assets/branco.png"></v-img>
        </v-list-item-content>
      </v-list-item>
      <v-divider></v-divider>
      <v-list nav dense dark class="tertiary--text px-7 pt-6 py-4">
        <v-list-item class="radius" v-for="item in items" :key="item.text" router :to="item.path">
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>{{ item.text }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item link>
          <v-list-item-icon>
            <v-icon>mdi-exit-to-app</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>Sair</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <div class="pa-3">
      <router-view/>
      <v-container>
        <h2>Cadastro de Membro</h2>
        <v-form
          ref="form"
          v-model="valid"
          lazy-validation
        >
          <v-row>
            <v-col class="col-12" sm="6" md="6" lg="6">
              <v-text-field
                :counter="20"
                :rules="nameRules"
                label="Nome"
                prepend-icon="mdi-clipboard-account"
                required
                no-gutters
              ></v-text-field>
            </v-col>

            <v-col class="col-12" sm="6" md="6" lg="6">
              <v-text-field
                :counter="40"
                :rules="nameRules"
                label="Sobrenome"
                required
                no-gutters
              ></v-text-field>
            </v-col>

            <v-col class="col-12" sm="6" md="6" lg="6">
              <v-text-field
                :rules="emailRules"
                label="E-mail"
                prepend-icon="mdi-email"
                required
                no-gutters
              ></v-text-field>
            </v-col>
            <v-col class="col-12" sm="6" md="6" lg="6">
              <v-select
                label="Cargo"
                prepend-icon="mdi-briefcase"
                required
              ></v-select>
            </v-col>
            <v-col class="col-12" sm="6" md="6" lg="6">
              <v-select
                label="Área"
                prepend-icon="mdi-border-none-variant"
                required
              ></v-select>
            </v-col>
            <v-col class="col-12" sm="6" md="6" lg="6">
              <v-select
                label="Líder"
                prepend-icon="mdi-account-star"
              ></v-select>
            </v-col>
            <v-col class="col-12" sm="6" md="6" lg="6">
              <v-text-field
                label="Slack"
                prepend-icon="mdi-slack"
                no-gutters
              ></v-text-field>
            </v-col>
            <v-col class="col-12" sm="6" md="6" lg="6">
              <v-text-field
                name="celular"
                label="Celular (xx) xxxxx-xxxx"
                type="number"
                prepend-icon="mdi-cellphone-iphone"
                no-gutters
              ></v-text-field>
            </v-col>
            <v-col class="col-12" sm="6" md="6" lg="6">
              <v-file-input
              accept="image/png, image/jpeg, image/bmp"
              placeholder="Selecionar Foto"
              prepend-icon="mdi-camera"
              label="Avatar"
              ></v-file-input>
            </v-col>
          </v-row>
            <v-row>
              <v-col class="col-12 offset-md-4 offset-lg-3 offset-sm-3 column-button" sm="6" md="4" lg="6">
                <v-btn class= "ma-2" v-on:click.native="submit()" depressed color="success">Cadastrar</v-btn>
                <v-btn class="ma-2" v-on:click.native="clear()" outlined >Limpar Campos</v-btn>
              </v-col>
            </v-row>
        </v-form>
      </v-container>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      items: [
        {
          text: "Dashboard",
          icon: "mdi-view-dashboard-outline",
          path: "/dashboard"
        },
        {
          text: "Relatórios",
          icon: "mdi-clipboard-text-multiple",
          path: "/"
        },
        {
          text: "Cadastrar Membro",
          icon: "mdi-account-plus",
          path: "/cadastrar-membro"
        }
      ],
      drawer: true,
      valid: true,
      name: '',
      nameRules: [
        v => !!v || 'Name is required',
        v => (v && v.length <= 10) || 'Name must be less than 10 characters',
      ],
      email: '',
      emailRules: [
        v => !!v || 'E-mail is required',
        v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
      ],
      select: null,
    }
  },
  methods: {
  clear() {
    this.$refs.form.reset()
    this.celular = '';
  },
  submit() {
    //let request = new Object();
    
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

.column-button{
  display: flex;
}
</style>