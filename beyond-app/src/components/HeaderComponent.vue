<template>
  <v-card
    color="grey lighten-4"
    flat
    height="200px"
    tile
  >
    <v-toolbar dense color="#303E9F" dark>
      <v-app-bar-nav-icon></v-app-bar-nav-icon>

      <v-toolbar-title>Bilioteca Digital</v-toolbar-title>

      <v-spacer></v-spacer>

      <v-btn icon>
          <v-icon>mdi-book</v-icon>
        </v-btn>
        <v-btn icon>
          <v-icon>mdi-account</v-icon>
        </v-btn>
        <v-btn icon>
          <v-icon>mdi-logout</v-icon>
        </v-btn>
    </v-toolbar>
  </v-card>
</template>

<script>
export default {
  name: 'HeaderComponent',
};
</script>