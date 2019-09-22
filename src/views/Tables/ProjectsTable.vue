<template>
  <div class="container-fluid" id="app">
    <h1 align="center">Emergencias</h1>
    <form @submit.prevent="leerAPI">

    </form>

    <table class="table table-success">
      <thead class="bg-success">
        <tr>
          <th>Titulo</th>
          <th>Descripcion</th>
          <th>Location</th>
          <th>Status</th>
          <th>Type</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="emergencie in emergencies" v-bind:key="emergencie">
          <td>{{ emergencie.title }}</td>
          <td>{{ emergencie.description }}</td>
          <td>{{ emergencie.location }}</td>
          <td>{{ emergencie.status }}</td>
          <td>{{ emergencie.type }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "app",
  data() {
    return {
      emergencies: [],
      puntuacionPedida: 80,
      url: "http://localhost:9090/emergencies"
    };
  },
  created() {
    this.leerAPI();
  },
  methods: {
    leerAPI() {
      axios
        .get(this.url, {
        })
        .then(response => {
          this.emergencies = response.data;
        })
    },
  }
};
</script>