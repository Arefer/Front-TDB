<template>
  <div>
    <base-header class="header pb-8 pt-5 pt-lg-8 d-flex align-items-center"
                 style="max-height: 400px; background-image: url(img/theme/info.jpg); background-size: cover; background-position: top;">
      <!-- Mask -->
      <span class="mask  opacity-8"></span>
      <!-- Header container -->
      <div class="container-fluid d-flex">
        <div class="row">
          <div class="col-md">
            <h1 class="display-2 text-white">EMERGENCIA: {{model.title.toUpperCase()}}</h1>
            <p class="text-white mt-0 mb-5">Aquí podrá ver y modificar toda la información asociada a la emergencia.</p>
          </div>
        </div>
      </div>
    </base-header>

    <div class="container-fluid mt--7">
      <div class="row">
        <div class="col-12">
          <card shadow type="secondary">
            <div slot="header" class="bg-white border-0">
              <div class="row align-items-center">
                <div class="col-8">
                  <h3 class="mb-0">Detalles</h3>
                </div>
                <div class="col-4 text-right">
                  <a href="#!" class="btn btn-sm btn-primary">Guardar cambios</a>
                </div>
              </div>
            </div>
            <template>
              <form @submit.prevent>
                <h6 class="heading-small text-muted mb-4">Tipo y estado</h6>
                <div class="pl-lg-4">
                  <div class="row">
                    <div class="col-lg-6">
                      <base-input alternative=""
                                  label="Tipo de emergencia"
                                  placeholder="No registrada."
                                  input-classes="form-control-alternative"
                                  v-model="model.type"
                      />
                    </div>
                    <div class="col-lg-6">
                      <base-input alternative=""
                                  label="Estado"
                                  placeholder="Fecha de registro."
                                  input-classes="form-control-alternative"
                                  v-model="model.status"
                      />
                    </div>
                  </div>
                </div>
                <h6 class="heading-small text-muted mb-4">Ubicación y fecha</h6>
                <div class="pl-lg-4">
                  <div class="row">
                    <div class="col-lg-6">
                      <base-input alternative=""
                                  label="Ubicación"
                                  placeholder="No registrada."
                                  input-classes="form-control-alternative"
                                  v-model="model.location"
                      />
                    </div>
                    <div class="col-lg-6">
                      <base-input alternative=""
                                  label="Fecha de registro"
                                  placeholder="Fecha de registro."
                                  input-classes="form-control-alternative"
                                  v-model="model.postedAt"
                      />
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-lg-12">
                      <div class="form-group">
                        <base-input alternative=""
                                    label="Descripción">
                          <textarea rows="4" v-model="model.description" class="form-control form-control-alternative" placeholder="Descripción de la emergencia..."></textarea>
                        </base-input>
                      </div>
                    </div>
                  </div>

                </div>
                <!--                                <hr class="my-4" />-->
              </form>
            </template>
          </card>
          <card shadow type="secondary" style="margin-top: 20px">
            <div slot="header" class="bg-white border-0">
              <div class="row align-items-center">
                <div class="col-8">
                  <h3 class="mb-0">Tareas asociadas</h3>
                </div>
                <div class="col-4 text-right">
                  <router-link :to="{name: 'create-task', query: {emergency: this.model}}"> <b-button> Nueva tarea <i class="ni ni-fat-add"></i></b-button> </router-link>
                </div>
              </div>
            </div>
            <div>
              <h6 v-if="$route.query.emergency.tasks.length === 0" class="heading-small text-muted mb-4">Aún no hay tareas asociadas...</h6>
              <b-table v-else
                      show-empty
                      striped hover
                      :items="tasks"
                      :fields="fields"
              >
                <template slot="actions" slot-scope="row">
                  <b-button size="sm" @click="info(row.item, row.index, $event.target)" class="mr-1" variant="primary">
                    Detalle
                  </b-button>
                  <b-button size="sm" @click="showMsgBoxOne(row.item)" class="mr-1" variant="danger">
                    Borrar
                  </b-button>

                </template>
              </b-table>

            </div>
          </card>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
    import {rest_ip} from "../router";

    export default {
        name: 'emergency-details',
        data() {
            return {
                //model: '',
                fields: [
                    {label: 'NOMBRE', key: 'name'},
                    {label: 'PRIORIDAD', key: 'priority'},
                    {label: '#VOLUNTARIOS ASIGNADOS', key: 'volunteers'},
                    {label: 'ESTADO', key: 'status'},
                    { key: 'actions', label: 'Acciones' }],
                tasks: []
            }
        },
        created(){
            this.model = this.$route.query.emergency;
            this.model.status = this.model.status==true ? "En curso" : 'Inactiva';
            this.retrieveTasks();
        },
        methods:{
            myHandlerMethod: function (clickedItem) {
                console.log(clickedItem)
            },
            info(item, row){
                this.$router.push ({ name:'task-details', query:{id:item.id}})

            },
            showMsgBoxOne() {
                this.$bvModal.msgBoxConfirm('¿Está seguro que desea eliminar?')
            },
            onRowClick() {
                this.$router.push ({ path: '/task-details/'+this.item.id})
            } ,
            retrieveTasks(){
                this.axios.get(rest_ip+'emergencies/'+this.$route.query.emergency.id+'/tasks')
                    .then((r) => this.assignTasks(r.data))
                    .catch((e) => alert(e))
            },
            assignTasks(r){
                let i = 0;
                while (i < r.length){
                    let task = r[i];
                    let status = task.status==true ? 'En curso' : 'Terminada';
                    let volunteers = task.volunteers.length;
                    this.tasks.push({
                        id: task.id,
                        name: task.title,
                        priority: task.priority,
                        status: status,
                        volunteers: volunteers
                    });
                    i+=1;
                }
            }
        }
    };
</script>
<style></style>
