<template>
    <div style="padding-bottom: 50px">
        <base-header type="gradient-success" class="pb-6 pb-8 pt-5 pt-md-8" style="min-height: 200px">
            <div class="row">
                <h1 class="display-2 text-white col-md" style="padding-bottom: 20px">Formulario de creación de una emergencia</h1>
            </div>
        </base-header>
        <div class="container-fluid mt--7">
            <div class="row">
                <div class="col">
                    <div class="card shadow border-0 col-md" style="margin: 10px; padding: 10px">
                        <base-input id="nameInput" v-model="name" :valid="state" :error="invalidFeedback" class="col-md" label="Nombre" required  ></base-input>
                        <base-input class="col-md" v-model="description" label="Descripción"  ></base-input>
                        <base-input class="col-md" v-model="location" label="Ubicación"  ></base-input>
                        <base-input class="col-md" v-model="longitude" label="Longitude"  ></base-input>
                        <base-input class="col-md" v-model="latitude" label="Latitude"  ></base-input>
                        <base-input class="col-md" v-model="type" label="Tipo" ></base-input>


                        <div class="col-md">
                            <b-alert v-model="showDismissibleAlert" variant="success" dismissible>
                                Emergencia registrada con éxito.
                            </b-alert>
                        </div>

                        <div class="col-md">
                            <b-button @click="post()" class="float-md-right" style="margin-bottom: 10px">Guardar</b-button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import {rest_ip} from "../router.js";
    export default {
        methods: {
          post(){
              if(this.name.length >= 1){
                  //alert(this.name)
                  this.axios.post(rest_ip+"emergencies/post", {
                      title: this.name,
                      description: this.description,
                      location: this.location,
                      type: this.type,
                      longitude: this.longitude,
                      latitude: this.latitude
                  }).then((r) => {
                      //this.showDismissibleAlert = true; this.name=r.data.title;
                      this.$notify({
                        type: 'success',
                         title: 'Emergencia registrada correctamente'
                        });
                        this.$router.push("e-dashboard");
                      })
                      .catch(e => alert(e))
              }
          }
        },
        computed: {
            state() {
                return this.name.length >= 1
            },
            invalidFeedback() {
                if (this.name.length >= 1) {
                    return ''
                } else {
                    return 'Por favor, ingresa un nombre.'
                }
            },
        },
        data() {
            return {
                name: '',
                description: '',
                location: '',
                type: '',
                showDismissibleAlert: false
            }
        }
    }
</script>

<style>

</style>