<template>
  <v-app>
    <router-view></router-view>
    <!--Toolbar-->
    <div>
      <v-toolbar class="toolbar" dark prominent color="#303E9F">
        <v-app-bar-nav-icon></v-app-bar-nav-icon>

        <v-toolbar-title>
          <v-img src="../assets/logotipo.svg" max-width="300" max-height="115"></v-img>
        </v-toolbar-title>

        <div class="toolbar-bottom">
          <v-row justify="center" class="toolbar-items">
            <v-btn text class="toolbar-button">Home</v-btn>
            <v-btn text class="toolbar-button" @click="goTo('/contact')"
              >Contato</v-btn>
            <v-btn text class="toolbar-button" @click="goTo('/about')">Sobre</v-btn>
          </v-row>
        </div>

        <v-spacer></v-spacer>
        <v-btn icon>
          <v-icon>mdi-book</v-icon>
        </v-btn>
        <v-btn icon>
          <v-icon>mdi-account</v-icon>
        </v-btn>
        <v-btn icon @click="openLogoutDialog">
          <logout-dialog v-model="dialogVisible" @confirm-logout="logout"></logout-dialog>
        </v-btn>
      </v-toolbar>
    </div>
    <!--Principal-->
    <v-main class="main">
      <div class="card">
        <v-row align="center" justify="center" class="mb-4">
          <!-- Primeiro Card -->
          <v-col cols="10" sm="4" md="4" lg="3">
            <v-card class="mx-auto" max-width="400" elevation="5" color="#1e293b">
              <v-img class="white--text align-end" height="200px" src="../assets/artigo.jpg">
                <v-card-title style="color: #ffe082">Artigos</v-card-title>
              </v-img>
              <v-card-subtitle class="pb-0" style="color: #9fa8da;">Coleção de Artigos</v-card-subtitle>
              <v-card-text class="text--primary">
                <div class="text-card">Diversos assuntos</div>
                <div class="text-card">Veja a lista</div>
              </v-card-text>
              <v-card-actions>
                <v-btn color="#9fa8da" text @click="goTo('/table/Artigo')">Ver Lista</v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
          <!-- Segundo Card -->
          <v-col cols="10" sm="4" md="4" lg="3">
            <v-card class="mx-auto" max-width="400" elevation="5" color="#1e293b">
              <v-img
                class="white--text align-end"
                height="200px"
                src="../assets/ebook.jpg"
              >
                <v-card-title style="color: #ffe082">E-books</v-card-title>
              </v-img>
              <v-card-subtitle class="pb-0" style="color: #9fa8da;">Coleção de E-books</v-card-subtitle>
              <v-card-text class="text--primary">
                <div class="text-card">Diversos Gêneros</div>
                <div class="text-card">Veja a lista</div>
              </v-card-text>
              <v-card-actions>
                <v-btn color="#9fa8da" text @click="goTo('/table/Ebook')">Ver Lista</v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
          <!-- Terceiro Card -->
          <v-col cols="10" sm="4" md="4" lg="3">
            <v-card class="mx-auto" max-width="400" elevation="5" color="#1e293b">
              <v-img class="white--text align-end" height="200px" src="../assets/video.jpg">
                <v-card-title style="color: #ffe082">Vídeos</v-card-title>
              </v-img>
              <v-card-subtitle class="pb-0" style="color: #9fa8da;">Coleção de vídeos</v-card-subtitle>
              <v-card-text class="text--primary">
                <div class="text-card">Diversos Tipos</div>
                <div class="text-card">Veja a lista</div>
              </v-card-text>
              <v-card-actions>
                <v-btn color="#9fa8da" text @click="goTo('/table/Vídeo')">Ver Lista</v-btn>
              </v-card-actions>
            </v-card>
            <v-btn @click="goTo('/table')" x-large elevation="2" color="#3f51b5" dark class="ma-4" style="position: absolute; right: 24px; bottom: 100px">
              Gerenciar Conteúdo
              <v-icon right>mdi-pencil</v-icon>
            </v-btn>
          </v-col>
        </v-row>
      </div>
    </v-main>

    <!--Footer
    <v-footer default dark padless>
      <v-card flat tile class="blue-grey darken-2 white--text text-center">
        <v-card-text>
          <v-btn v-for="icon in icons" :key="icon" class="mx-4 white--text" icon>
            <v-icon size="24px">
              {{ icon }}
            </v-icon>
          </v-btn>
        </v-card-text>

        <v-card-text class="white--text pt-0">
          Phasellus feugiat arcu sapien, et iaculis ipsum elementum sit amet.
          Mauris cursus commodo interdum. Praesent ut risus eget metus luctus
          accumsan id ultrices nunc. Sed at orci sed massa consectetur dignissim
          a sit amet dui. Duis commodo vitae velit et faucibus. Morbi vehicula
          lacinia malesuada. Nulla placerat augue vel ipsum ultrices, cursus
          iaculis dui sollicitudin.
        </v-card-text>

        <v-divider></v-divider>

        <v-card-text class="white--text">
          {{ new Date().getFullYear() }} —
          <strong style="font-family: 'Jersey 25'; font-size: 20px">Biblioteca Digital</strong>
        </v-card-text>
      </v-card>
    </v-footer> -->
  </v-app>
</template>

<script>
import LogoutDialog from "../components/LogoutDialog.vue";
import { auth } from "../config/index";
import { signOut } from "firebase/auth";

export default {
  components: {
    LogoutDialog
  },
  data: () => ({
    icons: ["mdi-facebook", "mdi-twitter", "mdi-linkedin", "mdi-instagram"],
    show: false,
  }),

  methods: {
    openLogoutDialog() {
      this.dialogVisible = true;
    },
    goTo(path, tipo) {
      this.$router.push({ path, params: { tipo } });
    },
    async logout() {
      try {
        await signOut(auth);
      } catch (error) {
        console.log("Erro ao fazer logout:", error.message);
      }
    },
  },
};
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Jersey+25&display=swap");

.toolbar-items {
  display: flex;
  align-items: center;
  
}
.toolbar-bottom {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  width: 100%;
  padding: 15px;
}
.main {
  background: linear-gradient(152deg, #0f172a, #020617);
  background-repeat: no-repeat;
}
.card {
  display: flex;
  height: 70vh;
  color: #1e293b;
}

.text-card {
  color: #f8fafc; 
}
</style>
