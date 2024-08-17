<template>
  <v-container class="container">
    <v-data-table
      :headers="headers"
      dark
      :items="filteredItems"
      sort-by="tipo"
      class="elevation-1"
      :loading="loading"
      id="table"
    >
      <template v-slot:top>
        <v-toolbar flat color="#1e293b">
          <v-toolbar-title style="font-family: 'Jersey 25'; font-size: 36px; color: #f8fafc"
            >Biblioteca Digital
            <v-icon right color="#f8fafc">mdi-book-multiple</v-icon>
          </v-toolbar-title>
          <v-divider class="mx-4" inset vertical></v-divider>
          <v-spacer></v-spacer>
          <v-dialog v-model="dialog" max-width="500px">
            <template v-slot:activator="{ on, attrs }">
              <v-btn color="#3f51b5" dark class="mb-2" v-bind="attrs" v-on="on">Novo item</v-btn>
            </template>
            <v-card>
              <v-card-title>
                <span class="text-h5">{{ formTitle }}</span>
              </v-card-title>
              <v-card-text>
                <v-container class="container2">
                  <v-row>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field v-model="editedItem.name" label="Nome"></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field v-model="editedItem.tipo" label="Tipo"></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field v-model="editedItem.genero" label="Gênero"></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field v-model="editedItem.autor" label="Autor(a)"></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field v-model="editedItem.ano" label="Data"></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field v-model="editedItem.url" label="URL"></v-text-field>
                    </v-col>
                  </v-row>
                </v-container>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="orange darken-1" text @click="close">Cancelar</v-btn>
                <v-btn color="orange darken-1" text @click="save" :loading="loading2">Salvar</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
          <v-dialog v-model="dialogDelete" max-width="500px">
            <v-card>
              <v-card-title class="text-h6"> Deletar este item? </v-card-title>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="orange darken-1" text @click="closeDelete">Cancelar</v-btn>
                <v-btn color="orange darken-1" text @click="deleteItemConfirm" :loading="loading3"
                  >OK</v-btn
                >
                <v-spacer></v-spacer>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-toolbar>
      </template>
      <template v-slot:[`item.name`]="{ item }">
        <template v-if="item.url">
          <a :href="item.url" target="_blank" class="link">{{ item.name }}</a>
        </template>
        <template v-else>
          <span>{{ item.name }}</span>
        </template>
      </template>
      <template v-slot:[`item.actions`]="{ item }">
        <v-icon small class="mr-2" @click="editItem(item)" color="#f8fafc">mdi-pencil</v-icon>
        <v-icon small @click="deleteItem(item)" color="#f8fafc">mdi-delete</v-icon>
      </template>
    </v-data-table>
  </v-container>
</template>

<script>
import axios from "axios";

export default {
  data: () => ({
    loading: false,
    loading2: false,
    loading3: false,
    dialog: false,
    dialogDelete: false,
    headers: [
      { text: "Artigos/Ebooks/Vídeos", align: "start", sortable: false, value: "name" },
      { text: "Tipo", value: "tipo" },
      { text: "Gênero", value: "genero" },
      { text: "Autor(a)", value: "autor" },
      { text: "Ano", value: "ano" },
      { text: "Actions", value: "actions", sortable: false },
    ],
    editedIndex: -1,
    editedItem: {
      name: "",
      tipo: "",
      genero: "",
      autor: "",
      ano: "",
      url: "",
    },
    defaultItem: {
      name: "",
      tipo: "",
      genero: "",
      autor: "",
      ano: "",
      url: "",
    },
    desserts: [],
  }),

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "Novo Item" : "Editar Item";
    },
    filteredItems() {
      const tipo = this.$route.params.tipo;
      return tipo ? this.desserts.filter((item) => item.tipo === tipo) : this.desserts;
    },
  },

  watch: {
    dialog(val) {
      val || this.close();
    },
    dialogDelete(val) {
      val || this.closeDelete();
    },
  },

  created() {
    this.initialize();
  },

  methods: {
    async initialize() {
      try {
        this.loading = true;
        const response = await axios.get("https://my-api-service-bykztxgtzq-rj.a.run.app/contents");
        this.desserts = response.data;
      } catch (error) {
        console.error("Error fetching documents: ", error);
      }
      this.loading = false;
    },

    editItem(item) {
      this.editedIndex = this.desserts.indexOf(item);
      this.editedItem = { ...item };
      this.dialog = true;
    },

    async deleteItemConfirm() {
      try {
        this.loading3 = true;
        await axios.delete(
          `https://my-api-service-bykztxgtzq-rj.a.run.app/contents/${
            this.desserts[this.editedIndex].id
          }`
        );
        this.desserts.splice(this.editedIndex, 1);
        this.closeDelete();
      } catch (error) {
        console.error("Error deleting document: ", error);
      }
      this.loading3 = false;
    },

    async save() {
      try {
        this.loading2 = true;
        if (this.editedIndex > -1) {
          await axios.put(
            `https://my-api-service-bykztxgtzq-rj.a.run.app/contents/${this.editedItem.id}`,
            this.editedItem
          );
          Object.assign(this.desserts[this.editedIndex], this.editedItem);
        } else {
          const response = await axios.post(
            "https://my-api-service-bykztxgtzq-rj.a.run.app/content",
            this.editedItem
          );
          this.desserts.push({ id: response.data.id, ...this.editedItem });
        }
        this.close();
      } catch (error) {
        console.error("Erro ao salvar documento: ", error);
      }
      this.loading2 = false;
    },

    close() {
      this.dialog = false;
      this.editedItem = { ...this.defaultItem };
      this.editedIndex = -1;
    },

    closeDelete() {
      this.dialogDelete = false;
      this.editedItem = { ...this.defaultItem };
      this.editedIndex = -1;
    },

    deleteItem(item) {
      this.editedIndex = this.desserts.indexOf(item);
      this.editedItem = { ...item };
      this.dialogDelete = true;
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
  background: linear-gradient(152deg, #0f172a, #020617);
  background-repeat: no-repeat;
}
.container2 {
  background-color: white;
  display: inline;
}
.link {
  text-decoration: none;
  color: #07d173;
}
.link:hover {
  color: #138d54;
}

#table {
  color: #f8fafc;
  background-color: #020617;
}
</style>
