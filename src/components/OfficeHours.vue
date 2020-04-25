<template>
  <v-container>
    <v-row class="px-4 pb-3">
      <h2>Office Hours</h2>
      <v-spacer></v-spacer>
      <v-btn title="Cadastrar novo membro" small color="secondary" fab>
        <v-icon>mdi-plus</v-icon>
      </v-btn>
    </v-row>
    <v-divider class="pb-3"></v-divider>
     <v-data-table
            no-data-text="Nan"
            no-results-text="Nan"
            :headers="header"
            :items="officeHours"
          >
            <template v-slot:item.actions="{ item }">
              <v-icon small @click="edit(item)"
                >mdi-pencil</v-icon
              >
              <v-icon small @click="deleteItem(item)"
                >mdi-delete</v-icon
              >
            </template>
          </v-data-table>
  </v-container>
</template>

<script>
export default {
    data(){
        return{
            header: [
                { text: "Data", value: "date" },
                { text: "Check-in", value: "checkin" },
                { text: "Check-out", value: "checkout" },
                { text: "Duração", value: "duration" },
                { text: "Ações", value: "actions", sortable: false }
            ],
            officeHours: []
        }
    },

    methods:{
        edit(item){
            console.log(item)
        },

        deleteItem(item){
            console.log(item)
        }
    }
}
</script>