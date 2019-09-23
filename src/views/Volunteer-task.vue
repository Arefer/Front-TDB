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
                        <p class="text-white mt-0 mb-5">Aquí podrá agregar un usuario a la tarea.</p>
                    </div>
                </div>
            </div>
        </base-header>

        <div class="container-fluid mt--7">
            <div class="row">


                <div class="col-12">


                    <card shadow type="secondary" style="margin-top: 20px">
                        <div slot="header" class="bg-white border-0">
                            <div class="row align-items-center">
                                <div class="col-8">
                                    <h3 class="mb-0">voluntarios para asociar</h3>
                                </div>
                                <!--<div class="col-4 text-right">
                                    <router-link :to="{name: 'volunteer-task', query: {id: this.$route.query.id}}"> <b-button> agregar Voluntario <i class="ni ni-fat-add"></i></b-button> </router-link>
                                </div>-->
                            </div>
                        </div>
                            <b-row>
      <b-col md="6" class="my-1">
        <b-form-group label-cols-sm="3" label="Filtro" class="mb-0">
          <b-input-group>
            <b-form-input v-model="filter" placeholder="Buscar"></b-form-input>
            <b-input-group-append>
              <b-button :disabled="!filter" @click="filter = ''">Limpiar</b-button>
            </b-input-group-append>
          </b-input-group>
        </b-form-group>
      </b-col>

      <b-col md="6" class="my-1">
        <b-form-group label-cols-sm="3" label="Ordenar por" class="mb-0">
          <b-input-group>
            <b-form-select v-model="sortBy" :options="sortOptions">
              <option slot="first" :value="null">-- nada --</option>
            </b-form-select>
            <b-form-select v-model="sortDesc" :disabled="!sortBy" slot="append">
              <option :value="false">Asc</option> <option :value="true">Desc</option>
            </b-form-select>
          </b-input-group>
        </b-form-group>
      </b-col>

      <b-col md="6" class="my-1">
        <b-form-group label-cols-sm="3" label="Dirección" class="mb-0">
          <b-form-select v-model="sortDirection">
            <option value="asc">Ascendente</option>
            <option value="desc">Descendente</option>
            <option value="last">Ultimo</option>
          </b-form-select>
        </b-form-group>
      </b-col>

      <b-col md="6" class="my-1">
        <b-form-group label-cols-sm="3" label="Por página" class="mb-0">
          <b-form-select v-model="perPage" :options="pageOptions"></b-form-select>
        </b-form-group>
      </b-col>
    </b-row>

                        <div>
                            <b-table
                             show-empty 
                            striped hover 
                            :items="volunteersTable"
                             :fields="fields"
                                :current-page="currentPage"
                                :per-page="perPage"
                             :filter="filter"
                            :sort-by.sync="sortBy"
                            :sort-desc.sync="sortDesc"
                            :sort-direction="sortDirection"
                            @filtered="onFiltered"
                            > 
                       </b-table>
            <b-row>
      <b-col md="6" class="my-1">
        <b-pagination
          v-model="currentPage"
          :total-rows="totalRows"
          :per-page="perPage"
          class="my-0"
        ></b-pagination>
      </b-col>
    </b-row>
    

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
              {label: 'Apellido', key: 'lastName', sortable: true },
              {label: 'rut', key: 'rut', sortable: true},
              {label: 'sexo', key:'sex', sortable: true},
              {label: 'Telefono', key: 'phone', sortable: true},
                { key: 'email', label: 'e-mail', sortable: true },
                {label:'direccion', key:'address'},
                {label:'Acciones',key:'action'}],
          
        model:[],
        volunteersTable:[],
        lengthVolunteer:'',
        totalRows: 1,
        currentPage: 1,
        perPage: 10,
        pageOptions: [10, 15,50],
        sortBy: null,
        sortDesc: false,
        sortDirection: 'asc',
        filter: null,
        currentItemIndex: 0,
        
      }
    },
           created(){
               this.retrieveTask();
               this.retrieveVolunteers();
                
      },
      methods:{
           retrieveVolunteers(){
              this.axios.get(rest_ip+'volunteers')
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
        onFiltered(filteredItems) {
        // Trigger pagination to update the number of buttons/pages due to filtering
        this.totalRows = filteredItems.length
        this.currentPage = 1
      },
      }
  };
</script>
<style></style>
