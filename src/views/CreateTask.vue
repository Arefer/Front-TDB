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
                            :options="{'1':'1','2':'2','3':'3','4':'4','5':'5','6':'6','7':'7','8':'8','9':'9','10':'10'}"
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

                        <label>Seleccione las caracteristicas de la tarea:</label>
                        <div class="col-md">
                            <div v-for="item in characteristics" :key="item.id">
                            <input type="checkbox" :id="item.id" :value="item" v-model="selected">
                            <label :for="item.name">{{ item.name }}</label>
                            </div>
                        </div>
                        <!--<span>Checked characteristics: {{ selected }}</span>
                        -->
                        
                        


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
    data() {
            return {
                name: '',
                description: '',
                priority: '',
                status: '',
                emergency: '',
                showDismissibleAlert: false,
                characteristics: [],
                selected: [], // Must be an array reference!
                
 
            }
    },
    
    methods: {
          post(){
              if(this.name.length >= 1){
                  //alert(this.name);
                  this.axios.post(rest_ip+"tasks/post/"+this.$route.query.emergency.id, {
                      title: this.name,
                      description: this.description,
                      priority: this.priority,
                      status: this.status,
                      characteristics: this.selected
                  }).then((r) => {
                      this.showDismissibleAlert = true; this.name=r.data.title;
                      this.$notify({
                        type: 'success',
                        title: 'Tarea agregada con exito'
                        });
                      this.$router.push({name:'emergency-details', query: {id: this.$route.query.emergency.id}});
                  }
                  ).catch()
              }
          },
          getData(){
              this.axios.get(rest_ip+'characteristics').then(r => this.characteristics = r.data)
          }
          
        },
    mounted(){
        this.getData()
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
        
    
}
</script>