<template>
    <div style="padding-bottom: 50px">
        <base-header type="gradient-success" class="pb-6 pb-8 pt-5 pt-md-8" style="min-height: 200px">
            <div class="row">
                <h1 class="display-2 text-white col-md" style="padding-bottom: 20px">Formulario de creación de una tarea</h1>
            </div>
        </base-header>
        <div class="container-fluid mt--7">
            <div class="row">
                <div class="col">
                    <div class="card shadow border-0 col-md" style="margin: 10px; padding: 10px">
                        <base-input id="nameInput" v-model="name" :valid="state" :error="invalidFeedback" class="col-md" label="Nombre" required  ></base-input>
                        <base-input class="col-md" v-model="description" label="Descripción"  ></base-input>
                        <base-input id="input-group-3" label="Prioridad" label-for="input-3" class="col-md">
                            <b-form-select
                            id="priorityInput"
                            v-model="priority"
                            :options="{'1':'Alta','2':'Media','3':'Baja'}"
                            required
                            ></b-form-select>
                        </base-input>
                         <base-input id="input-group-4" label="Estado" label-for="input-4" class="col-md">
                            <b-form-select
                            id="statusInput"
                            v-model="status"
                            :options="{'true':'Activa','false':'Desactiva'}"
                            required
                            ></b-form-select>
                        </base-input>


                        <div class="col-md">
                            <b-alert v-model="showDismissibleAlert" variant="success" dismissible>
                                Tarea registrada con éxito.
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
                  alert(this.name)
                  this.axios.post(rest_ip+"tasks/post", {
                      title: this.name,
                      description: this.description,
                      priority: this.priority,
                      status: this.status,
                      emergency: this.$route.query.emergency
                  }).then((r) => {this.showDismissibleAlert = true; this.name=r.data.title}).catch(e => alert(e))
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
                priority: '',
                status: '',
                emergency: '',
                showDismissibleAlert: false
            }
        }
    
}
</script>