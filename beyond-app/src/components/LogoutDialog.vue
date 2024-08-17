<template>
  <v-dialog v-model="dialog" persistent max-width="290">
    <template v-slot:activator="{ on, attrs }">
      <v-btn icon v-bind="attrs" v-on="on" @click="showLogoutDialog = true">
        <v-icon>mdi-logout</v-icon>
      </v-btn>
    </template>
    <v-card>
      <v-card-title class="text-h5">
        confirmar logout
      </v-card-title>
      <v-card-text>
        Você tem certeza que quer sair? Você terá que efetuar o login novamente se quiser usar a aplicação.
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="grey" text @click="cancelLogout">
          Cancelar
        </v-btn>
        <v-btn color="red" text @click="confirmLogout">
          OK
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  data () {
    return {
      dialog: false,
    }
  },
  methods: {
    cancelLogout() {
      this.dialog = false;
    },
    confirmLogout() {
      this.dialog = false;
      this.$emit('confirm-logout');
    }
  }
}
</script>

<style>

</style>
