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
                                                        label="Voluntarios"
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
                                                        label="Preioridad"
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
                                    <h3 class="mb-0">voluntarios asociados</h3>
                                </div>
                                <div class="col-4 text-right">
                                    <router-link :to="{name: 'volunteer-task', query: {id: this.$route.query.id}}"> <b-button> agregar Voluntario <i class="ni ni-fat-add"></i></b-button> </router-link>
                                </div>
                            </div>
                        </div>
                        <div>
                            <b-table
                             show-empty 
                            striped hover 
                            :items="volunteersTable"
                             :fields="fields"
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
        lengthVolunteer:''
      }
    },
           created(){
               this.retrieveTask();
               this.retrieveVolunteers();
                
      },
      methods:{
          retrieveVolunteers(){
              this.axios.get(rest_ip+'tasks/'+this.$route.query.id+'/volunteers')
              .then((volunteer) => this.volunteersTask(volunteer.data))
              .catch((e) => alert(e))
          },
          retrieveTask(){
          this.axios.get(rest_ip+'tasks/'+this.$route.query.id)
              .then((r) => this.taksDetail(r.data))
              .catch((e) => alert(e)
              .data())
        },
        volunteersTask(volunteer){
            let i = 0;
            while (i < volunteer.length){
                let  lengthVolunteer = volunteer.length;
                let volunterAux=volunteer[i];
              
                this.volunteersTable.push({
                    id: volunterAux.id,
                    name: volunterAux.name,
                    lastName: volunterAux.lastName,
                    sex:volunterAux.sex,
                    rut:volunterAux.rut,
                    phone: volunterAux.phone,
                    email:volunterAux.email,
                    address:volunterAux.address
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
                    volunteer: volunteers
    
  });


        },

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
  }
  };
</script>
<style></style>
