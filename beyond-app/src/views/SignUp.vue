<template>
  <v-container class="container" fluid>
    <v-row justify="center">
      <v-col cols="12" sm="8" md="6">
        <v-card id="card" class="pa-6 elevation-1">
          <div class="card-title">
            <v-card-title style="font-family: 'Inter', sans-serif;" class="justify-center mb-2">SIGN UP</v-card-title>
          </div>
          
          <v-form>
            <!-- Campo de Email -->
            <v-text-field v-model="email" :rules="[rules.required, rules.email]" label="Email" append-icon="mdi-email-outline" outlined required type="email"></v-text-field>
            <!-- Campo de Senha -->
            <v-text-field v-model="password" :append-icon="show3 ? 'mdi-eye' : 'mdi-eye-off'" :rules="[rules.required, rules.min]" :type="show3 ? 'text' : 'password'" name="input-10-2" label="Senha"
              hint="No mínimo 6 caracteres" class="input-group--focused" @click:append="show3 = !show3" outlined></v-text-field>
            <!-- Botões -->
            <v-btn style="margin-top: 0" id="btn" color="teal lighten-1" block dark large @click="SignUp" :loading="loading">Criar Conta</v-btn>
            <p id="p" class="mt-5" style="margin: 0">
                Já possui uma conta?<router-link to="/"> Faça Login</router-link>
            </p>
          </v-form>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { auth } from "../config/index";
import { createUserWithEmailAndPassword } from "firebase/auth";

export default {
  data() {
    return {
      loading: false,
      show3: false,
      email: "",
      password: "",
      rules: {
        required: value => !!value || "Campo obrigatório.",
        counter: value => value.length <= 20 || "Max. 20 caracteres",
        email: value => {
          const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
          return pattern.test(value) || "E-mail inválido.";
        },
        password: {
          required: value => !!value || "Campo obrigatório.",
          min: v => v.length >= 6 || "Mínimo 6 caracteres",
        },
      },
    };
  },
  methods: {
    async SignUp() {
      try {
        this.loading = true
        const userCredential = await createUserWithEmailAndPassword(auth, this.email, this.password);
        const user = userCredential.user;
        alert('Cadastrado com sucesso!');
        console.log('Usuário cadastrado:', user);

        this.email = '';
        this.password = '';
      } catch (error) {
        console.log(error.code);
        alert(error.message);
      }
      this.loading = false
    },
  },
};
</script>

<style scoped>

.container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #D4F3FF;
}

#card {
  width: 100%;
  max-width: 450px;
  margin: auto;
  border-radius: 1rem;
  background-color: white;
}

#btn {
  margin-top: 15px;
}

.card-title {
  text-align: center;
  text-decoration: underline 2px;
  text-underline-offset: 5px;
  color: gray;
}
</style>
