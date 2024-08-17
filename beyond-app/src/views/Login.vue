<template>
  <v-container class="container" fluid>
    <v-row justify="center">
      <v-col cols="12" sm="8" md="6">
        <v-card id="card" class="pa-6 elevation-1">
          <div class="card-title">
            <v-card-title style="font-family: 'Roboto', sans-serif" class="justify-center mb-2" :loading="loading">LOGIN</v-card-title>
          </div>
          <!-- Formulário de Login -->
          <v-form @submit.prevent="login" class="form">
            <!-- Campo de Email -->
            <v-text-field v-model="email" :rules="[rules.required, rules.email]" label="Email" append-icon="mdi-email-outline" outlined required type="email"></v-text-field>
            <!-- Campo de Senha -->
            <v-text-field v-model="password" :append-icon="show3 ? 'mdi-eye' : 'mdi-eye-off'" :rules="[rules.required, rules.min]" :type="show3 ? 'text' : 'password'" name="input-10-2"
              label="Senha"
              hint="No mínimo 6 caracteres"
              class="input-group--focused"
              @click:append="show3 = !show3"
              outlined
            ></v-text-field>
            <!-- Botões -->
            <v-btn type="submit" color="#26C6DA" block large dark :loading="loading">Entrar</v-btn>
            <p class="mt-5" style="margin: 0">
              Ainda não tem uma conta?<router-link to="/signup">
                Crie uma</router-link>
            </p>
          </v-form>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { auth } from "../config/index";
import { signInWithEmailAndPassword } from "firebase/auth";

export default {
  data() {
    return {
      loading: false,
      show3: false,
      email: "",
      password: "",
      rules: {
        required: (value) => !!value || "Campo obrigatório.",
        counter: (value) => value.length <= 20 || "Max. 20 caracteres",
        email: (value) => {
          const pattern =
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
          return pattern.test(value) || "E-mail inválido.";
        },
        password: {
          required: (value) => !!value || "Campo obrigatório.",
          min: (v) => v.length >= 6 || "Mínimo 6 caracteres",
        },
      },
    };
  },
  methods: {
    async login() {
      try {
        this.loading = true;
        await signInWithEmailAndPassword(auth, this.email, this.password);
        alert("Login feito com sucesso.");
      } catch (error) {
        alert(error.message);
      }
      this.loading = false;
    },
  },
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap');

.container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: linear-gradient(152deg, #0f172a, #020617);
  background-repeat: no-repeat;
}
#card {
  width: 100%;
  max-width: 450px;
  margin: auto;
  border-radius: 1rem;
  background-color: #1e293b;
}
#btn {
  margin-top: 15px;
}

.form {
  color: #5c6bc0;
}

.form a {
  color: #5c6bc0;
}

.card-title {
  font-family: 'Roboto', sans-serif;
  text-align: center;
  color: #e8eaf6;
}
</style>
