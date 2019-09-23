<template>
  <div>
    <base-header class="header pb-8 pt-5 pt-lg-8 d-flex align-items-center"
                 style="max-height: 400px; background-image: url(img/theme/info.jpg); background-size: cover; background-position: top;">
      <!-- Mask -->
      <span class="mask  opacity-8"></span>
      <!-- Header container -->
      <router-link :to="{name: 'emergency-details', query: {id:this.$route.query.emergencyId}}"><b-button><i class="ni ni-bold-left"></i> Volver </b-button></router-link>
        
      <div class="container-fluid d-flex">
        <div class="row">
          <div class="col-md">
            <h1 class="display-2 text-white">Tarea: {{model[0].title.toUpperCase()}}</h1>
            <p class="text-white mt-0 mb-5">Aquí podrá ver y modificar toda la información asociada a la tarea.</p>
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
                <h6 class="heading-small text-muted mb-4"></h6>
                <div class="pl-lg-4">
                  <div class="row">
                    <div class="col-lg-6">
                      <base-input alternative=""
                                  label="Estado"
                                  placeholder="No registrada."
                                  input-classes="form-control-alternative"
                                  v-model="model[0].status"
                      />

                    </div>
                    <div class="col-lg-6">
                      <base-input alternative=""
                                  label="# Voluntarios"
                                  placeholder="No registrada."
                                  input-classes="form-control-alternative"
                                  v-model="model[0].volunteers"
                      />

                    </div>
                  </div>
                </div>
                <h6 class="heading-small text-muted mb-4">prioridad y fecha</h6>
                <div class="pl-lg-4">
                  <div class="row">
                    <div class="col-lg-6">
                      <base-input alternative=""
                                  label="Prioridad"
                                  placeholder="No registrada."
                                  input-classes="form-control-alternative"
                                  v-model="model[0].priority"
                      />
                    </div>
                    <div class="col-lg-6">
                      <base-input alternative=""
                                  label="Fecha de registro"
                                  placeholder="Fecha de registro."
                                  input-classes="form-control-alternative"
                                  v-model="model[0].postedAt"
                      />
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-lg-12">
                      <div class="form-group">
                        <base-input alternative=""
                                    label="Descripción">
                                                    <textarea rows="4" v-model="model[0].description"
                                                              class="form-control form-control-alternative"
                                                              placeholder="Descripción de la emergencia...">
                                                      </textarea>
                        </base-input>
                      </div>
                    </div>
                  </div>

                </div>
                <hr class="my-4" />
                <!-- Address -->
              </form>
            </template>
          </card>

          <card shadow type="secondary" style="margin-top: 20px">
            <div slot="header" class="bg-white border-0">
              <div class="row align-items-center">
                <div class="col-8">
                  <h3 class="mb-0">Voluntarios asociados</h3>
                </div>
                <div class="col-4 text-right">
                  <router-link :to="{name: 'volunteer-task', query: {id: this.$route.query.id, emergencyId:this.$route.query.emergencyId}}"> <b-button> Agregar voluntario <i class="ni ni-fat-add"></i></b-button> </router-link>
                </div>
              </div>
            </div>
            <div>
              <h6 v-if="volunteersTable.length === 0" class="heading-small text-muted mb-4">Aún no hay voluntarios asociados...</h6>
              <b-table v-else
                      show-empty
                      striped hover
                      :items="volunteersTable"
                      :fields="fields"
              >
              </b-table>

            </div>
          </card>

          <card shadow type="secondary" style="margin-top: 20px">
            <div slot="header" class="bg-white border-0">
              <div class="row align-items-center">
                <div class="col-8">
                  <h3 class="mb-0">Características asociadas</h3>
                </div>
              </div>
            </div>
            <div>
              <h6 v-if="this.model[0].characteristics.length === 0" class="heading-small text-muted mb-4">Aún no hay características asociadas...</h6>
              <b-table v-else striped hover
                       :items="this.model[0].characteristics"
                       :fields="characteristicsFields"
              >
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
        name: 'task-details',
        data() {
            return {
                fields: [
                    {label: 'NOMBRE', key: 'name'},
                    {label: 'Apellido', key: 'lastName'},
                    {label: 'rut', key: 'rut'},
                    {label: 'sexo', key:'sex'},
                    {label: 'Telefono', key: 'phone'},
                    { key: 'email', label: 'e-mail' },
                    {label:'direccion', key:'address'}],

                model:[],
                volunteersTable:[],
                lengthVolunteer:'',
                characteristicsFields: [
                    {label: 'NOMBRE', key: 'name'},
                    {label: 'DESCRIPCIÓN', key: 'description'}
                ]
            }
        },
        created(){
            this.retrieveTask();
            this.retrieveVolunteers();

        },
        methods:{
            checkCharacteristics(){
              let i = 0;
              while (i < this.model[0].characteristics.length){
                  let c = this.model[0].characteristics[i];
                  this.model[0].characteristics[i] = {
                      name: c.name == null ? 'Sin registrar' : c.name,
                      description: c.description == null ? 'Sin registrar' : c.description,
                      id: c.id
                  };
                  i += 1;
              }
            },

            retrieveVolunteers(){
                this.axios.get(rest_ip+'tasks/'+this.$route.query.id+'/volunteers')
                    .then((volunteer) =>
                    {
                        this.volunteersTask(volunteer.data);
                    }).catch(
                        (e) => alert(e)
                )
            },
            retrieveTask(){
                this.axios.get(rest_ip+'tasks/'+this.$route.query.id)
                    .then((r) => {this.taksDetail(r.data); this.checkCharacteristics()})
                    .catch((e) => alert(e)
                        .data())
            },
            volunteersTask(volunteer){
                let i = 0;
                while (i < volunteer.length){
                    let volunteerAux=volunteer[i];
                    this.volunteersTable.push({
                        id: volunteerAux.id,
                        name: volunteerAux.name == null ? 'Sin registrar' : volunteerAux.name,
                        lastName: volunteerAux.lastName == null ? 'Sin registrar' : volunteerAux.lastName,
                        sex:volunteerAux.sex == null ? 'Sin registrar' : volunteerAux.sex,
                            rut:volunteerAux.rut == null ? 'Sin registrar' : volunteerAux.rut,
                        phone: volunteerAux.phone == null ? 'Sin registrar' : volunteerAux.phone,
                        email:volunteerAux.email == null ? 'Sin registrar' : volunteerAux.email,
                        address:volunteerAux.address == null ? 'Sin registrar' : volunteerAux.address
                    });

                    i+=1;
                }



            },
            taksDetail(r){
                let status = r.status==true ? 'En curso' : 'Terminada';
                let volunteers = r.volunteers.length;

                this.model.push({
                    id: r.id,
                    title: r.title,
                    priority: r.priority,
                    description: r.description,
                    status: status,
                    postedAt:r.postedAt,
                    volunteers: volunteers,
                    characteristics: r.characteristics,
                });


            },

            myHandlerMethod: function (clickedItem) {
                console.log(clickedItem)
            },
            info(item, row){
                this.$router.push ({ name:'task-details', query:{id:item.id,emergencyId:this.$route.query.id,emergencyId:this.$route.query.id}})

            },
            showMsgBoxOne() {
                this.$bvModal.msgBoxConfirm('¿Está seguro que desea eliminar?')
            },
            onRowClick() {
                this.$router.push ({ path: '/task-details/'+this.item.id})
            } ,
        }
    };
</script>
<style></style>
