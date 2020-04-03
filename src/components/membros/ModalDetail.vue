<template>
  <v-dialog max-width="800px" persistent v-model="show">
    <v-card class="pa-5">
      <v-layout row class="px-3" justify-space-between>
        <h2>Detalhes do Membro:</h2>
        <v-btn @click="$emit('close')" title="Fechar" icon>
          <v-icon color="grey">mdi-close</v-icon>
        </v-btn>
      </v-layout>
      <v-divider></v-divider>
      <v-layout column class="mx-2 mt-2">
          <v-layout row pl-1>
                <span class="subheading font-weight-medium">Nome:</span>
                <span class="subheading pl-2">{{ member.first_name }} {{ member.last_name }}</span>
          </v-layout>
          <v-layout row pl-1>
                <span class="subheading font-weight-medium">Email:</span>
                <span class="subheading pl-2">{{ member.email }}</span>
          </v-layout>
          <v-layout row pl-1>
                <span class="subheading font-weight-medium">Cargo:</span>
                <span class="subheading pl-2">{{ member.post }}</span>
          </v-layout>
          <v-layout row pl-1>
                <span class="subheading font-weight-medium">Departamento:</span>
                <span class="subheading pl-2">{{ member.department }}</span>
          </v-layout>
          <v-layout row pl-1>
                <span class="subheading font-weight-medium">Líder:</span>
                <span class="subheading pl-2">{{ member.leader }}</span>
          </v-layout>
          <v-layout row pl-1>
                <span class="subheading font-weight-medium">Slack:</span>
                <span class="subheading pl-2">{{ member.slack }}</span>
          </v-layout>
          <v-layout row pl-1>
                <span class="subheading font-weight-medium">Telefone:</span>
                <span class="subheading pl-2">{{ member.phone }}</span>
          </v-layout>
          <v-layout row pl-1>
                <span class="subheading font-weight-medium">Data de Entrada:</span>
                <span class="subheading pl-2">{{ data }}</span>
          </v-layout>
      </v-layout>
    </v-card>
  </v-dialog>
</template>

<script>
import moment from "moment";

export default {
    created(){
        this.formatDate()
    },

    props:{
        show: Boolean,
        member: Object
    },

    data(){
        return{
            data: null
        }
    },

    methods:{
        formatDate(){
            this.data = moment(this.member.date_joined).format("DD/MM/YYYY")
        }
    }
}
</script>