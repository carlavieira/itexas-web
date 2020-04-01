<template>
  <v-container>
    <v-row class="px-4">
      <h2>Membros</h2>
      <v-spacer></v-spacer>
      <v-btn @click="btnMembro = true" title="Cadastrar novo membro" small color="secondary" fab>
        <v-icon>mdi-plus</v-icon>
      </v-btn>
    </v-row>
    <v-row class="px-4 pt-3">
      <v-flex>
        <v-card class="w-100">
          <v-card-title>
            <v-text-field
              style="max-width: 300px"
              v-model="search"
              append-icon="mdi-magnify"
              label="Pesquisar"
              single-line
              hide-details
            ></v-text-field>
          </v-card-title>
          <v-data-table no-data-text="Nenhum membro cadastrado" no-results-text="Nenhum membro encontrado" :headers="headersMembros" :items="membros" :search="search"></v-data-table>
        </v-card>
      </v-flex>
    </v-row>
    <NovoMembro :show="btnMembro" @close="btnMembro = false"></NovoMembro>
  </v-container>
</template>

<script>
  import NovoMembro from "./CadastrarMembro.vue";
  export default {
    components: {
      NovoMembro
    },
    data() {
      return {
        btnMembro: false,
        search: "",
        headersMembros: [
          {
            text: "Nome",
            align: "start",
            value: "name"
          },
          { text: "Cargo", value: "cargo" },
          { text: "Área", value: "area" },
          { text: "Líder", value: "lider" },
        ],
        membros: [
          {
            name: "Pedro Machado",
            cargo: "Team Leader",
            area: "B2B",
            lider: "Antônio"
          },
          {
            name: "Alex Mascarenhas",
            cargo: "Membro",
            area: "oGT",
            lider: "Pedro Rocha"
          },
          {
            name: "Marina Figueiredo",
            cargo: "Team Leader",
            area: "iGT",
            lider: "Pedro Rocha"
          },
          {
            name: "Victoria Nunes",
            cargo: "Membro",
            area: "iGT",
            lider: "Marina Figueiredo"
          },
          {
            name: "Marlon Silva",
            cargo: "Membro",
            area: "F&L",
            lider: "Pedro Rocha"
          },
          {
            name: "Flávio Junior",
            cargo: "Presidente",
            area: "-",
            lider: "-"
          },
          {
            name: "Bruna Neves",
            cargo: "Membro",
            area: "B2B",
            lider: "Marina Figueiredo"
          },
          {
            name: "Lucas Pacheco",
            cargo: "Membro",
            area: "B2B",
            lider: "Marina Figueiredo"
          },
        ]
      };
    },
    methods: {
      requestGetMembers() {
        let url = "http://itexas.pythonanywhere.com/members/";

        this.$http
          .get(url)
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
    },
    created: function(){
      this.requestGetMembers();
      console.log('Teste')
    }
  };
</script>