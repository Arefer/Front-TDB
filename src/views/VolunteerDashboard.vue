<template>
    <div>
        <base-header class="header pb-8 pt-5 pt-lg-8 d-flex align-items-center"
                     style="max-height: 400px; background-image: url(img/theme/info.jpg); background-size: cover; background-position: top;">
            <!-- Mask -->
            <span class="mask  opacity-8"></span>
            <div class="container-fluid d-flex">
                <div class="row">
                    <div class="col-md">
                        <h1 class="display-2 text-white">Voluntarios</h1>
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
                                    <h3 class="mb-0">Voluntarios</h3>
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
                            <template slot="actions" slot-scope="row">
        <b-button size="sm" @click="assing(row.item, row.index, $event.target)" class="mr-1" variant="primary">
  <!--            <font-awesome-icon icon="pen"></font-awesome-icon>-->
                  Editar
        </b-button>
         <b-button size="sm" @click="openModal(row.item)" class="mr-1" variant="primary"><i class="ni ni-pin-3"></i></b-button>
        </template>
                            
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
        <b-modal v-model="modalShow" @shown="modalShown" title = "Ubicacion">
        <div id="map" class="map" style="height: 500px;"></div>
        </b-modal>
    </div>
    
    
</template>

<script>
    import {rest_ip} from "../router";
    import L from 'leaflet';
    export default {
    name: "VolunteersDashboard",

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
              {label:'Acciones',key:'actions'}],
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
        modalShow: false,
      }
    },
    methods: {
      modalShown() {
        setTimeout(() => {
          this.map.invalidateSize(); 
        }, 100);
      },

      openModal(item) { //Modal para mapa;
        console.log(item);
          this.modalShow = true;
          this.map = L.map('map').setView([item.latitude, item.longitude], 12);
          // this.map = L.map('map').setView([item.latitude, item.longitude], 12);
          
          L.marker([item.latitude, item.longitude]).addTo(this.map);
          ;
      },
      initMap() {
          this.map = L.map('map').setView([-33.448634, -70.669677], 12);
          this.tileLayer = L.tileLayer(
          'https://cartodb-basemaps-{s}.global.ssl.fastly.net/rastertiles/voyager/{z}/{x}/{y}.png',
          {
              maxZoom: 18,
              attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>, &copy; <a href="https://carto.com/attribution">CARTO</a>',
          }
          );
          this.tileLayer.addTo(this.map);
      },
      retrieveVolunteers(){
          this.axios.get(rest_ip+'volunteers')
          .then((volunteer) => this.volunteersTask(volunteer.data))
          .catch((e) => alert(e))
      },
      volunteersTask(volunteer){
        let i = 0;
        while (i < volunteer.length){
            let  lengthVolunteer = volunteer.length;
          
            this.volunteersTable.push({
                id: volunteer[i].id,
                name: volunteer[i].name,
                lastName: volunteer[i].lastName,
                sex:volunteer[i].sex,
                rut:volunteer[i].rut,
                phone:volunteer[i].phone,
                email:volunteer[i].email,
                address:volunteer[i].address,
                longitude:volunteer[i].longitude,
                latitude:volunteer[i].latitude

            });
            i+=1;
          }
      },
    },
    onFiltered(filteredItems) {
        // Trigger pagination to update the number of buttons/pages due to filtering
        this.totalRows = filteredItems.length
        this.currentPage = 1
      },
    created(){
      this.retrieveVolunteers();                
    },
    mounted(){
      this.initMap();
    },
}
</script>

<style scoped>

</style>