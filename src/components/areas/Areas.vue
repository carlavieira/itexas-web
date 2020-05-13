<template>
  <v-container>
    <v-row class="px-4 pb-3">
      <h2>Cargos</h2>
      <v-spacer></v-spacer>
      <v-btn @click="add()" title="Cadastrar novo Cargo" small color="secondary" fab>
        <v-icon>mdi-plus</v-icon>
      </v-btn>
    </v-row>
    <v-divider class="pb-3"></v-divider>
    <v-card class="w-100">
    <v-data-table :sort-by="['name']" :sort-desc="[true, true]" no-data-text="Nenhum cargo adicionado" no-results-text="Sem resultados para a busca" :headers="header" :items="areas">
      <!-- <template v-slot:item.date="{ item }">
        {{ formatDate(item.date) }}
      </template>
      <template v-slot:item.checkin_time="{ item }">
        {{ format(item.checkin_time) }}
      </template>
      <template v-slot:item.checkout_time="{ item }">
        <span v-if="item.checkout_time">{{ format(item.checkout_time) }}</span>
      </template>
      <template v-slot:item.actions="{ item }">
        <v-icon small @click="edit(item)">mdi-pencil</v-icon>
        <v-icon class="pl-3" small @click="deleteItem(item)">mdi-delete</v-icon>
      </template> -->
    </v-data-table>
    </v-card>
  </v-container>
</template>

<script>
import departmentsController from "../../controllers/DepartmentsController"

export default {
  components: {
    
  },

  data() {
    return {
      departmentsController,
      header: [
        { text: "Sigla", value: "name" },
        { text: "Ações", value: "actions", sortable: false }
      ],
      areas: [],
      type: null,
      showModal: false,
      oh: {}
    };
  },

  async created(){
    await this.getDepartments()
  },

  methods: {
    async getDepartments(){
      await this.departmentsController.getDepartments(this.$api)
      .then(res => {
        this.areas = res.data
      }).catch(err => {
        console.log(err)
      })
    },

    add(){
      this.type = "add"
      this.showModal = true
      this.oh = {
        date: null,
        checkin_time: null,
        checkout_time: null
      }
    },

    // edit(item) {
    //   this.type = "edit"
    //   this.showModal = true
    //   this.oh = item
    // },

    // async deleteItem(item) {
    //   await this.officeHoursController.deleteOfficeHour(this.$api, item)
    //   .then(res => {
    //     console.log(res)
    //     this.getOfficeHours()
    //   }).catch(e => { 
    //     console.log(e)
    //   })
    // },
  }
};
</script>