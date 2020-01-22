<template>
    <div>

        <base-header type="gradient-success" class="pb-6 pb-8 pt-5 pt-md-8">
            <!-- Card stats -->
            <!--<div class="row">
                <div class="col">
                    <stats-card title="Total traffic"
                                type="gradient-red"
                                sub-title="350,897"
                                icon="ni ni-active-40"
                                class="mb-4 mb-xl-0"
                    >
                        <template slot="footer">
                            <span class="text-success mr-2"><i class="fa fa-arrow-up"></i> 54.8%</span>
                            <span class="text-nowrap">Since last month</span>
                        </template>
                    </stats-card>
                </div>
            </div>-->
            <div class="col-md">
                        <h1 class="display-2 text-white">Ubicaciones</h1>
                    </div>
            <div class="row">
                <div class="col">
                    <div class="form-check">
                        <div class="form-check" v-for="layer in layers" :key="layer.id">
                            <label class="form-check-label">
                                <input
                                    class="form-check-input"
                                    type="checkbox"
                                    v-model="layer.active"
                                    @change="layerChanged(layer.id, layer.active)"
                                />
                                {{ layer.name }}
                            </label>
                        </div>
                    </div>
                    <div class="btn-group">
                        <button class="btn btn-warning btn-sm dropdown-toggle"
                                type="button" data-toggle="dropdown">
                            Seleccionar región <span class="caret"></span>
                        </button>

                        <ul class="dropdown-menu" role="menu">
                            <li><a href="#">Región #1</a></li>
                            <li><a href="#">Región #2</a></li>
                            
                        </ul>
                        </div>
                    
                </div>                
            </div>
        </base-header>
        
        <div class="container-fluid mt--7">
            <div class="row">
                <div class="col">
                    <div class="card shadow border-0">
                        <div id="map" class="map" style="height: 600px;"></div>
                    </div>
                    
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import {rest_ip} from "../router";
    import L from 'leaflet';
    export default {
      
    data(){/* Data properties will go here */
        return{
            map: null,
            tileLayer: null,
            layers: [
                {
                id: 0,
                name: 'Emergencias',
                active: false,
                features: [],
                },
                {
                id: 1,
                name: 'Volunteers',
                active: false,
                features: [],
                }
            ],
        }
    },
    
    methods: { /* Any app-specific functions go here */ 
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


        initVolunteersMark(volunteers) {

            volunteers.forEach((volunteer) => {
                volunteer.leafletObject = L.marker([volunteer.latitude, volunteer.longitude]).bindPopup(volunteer.name);
            });
            
            this.layers[1].features = volunteers;
        },

        initEmergenciesMark(emergencies){
            var greenIcon = new L.Icon({
            iconUrl: 'https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
            shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
            iconSize: [25, 41],
            iconAnchor: [12, 41],
            popupAnchor: [1, -34],
            shadowSize: [41, 41]
            });

            emergencies.forEach(emergency =>{
                emergency.leafletObject = L.marker([emergency.latitude, emergency.longitude], {icon: greenIcon}).bindPopup(emergency.title);
            });

            this.layers[0].features = emergencies;
        },
        
        layerChanged(layerId, active) {
            const layer = this.layers.find(layer => layer.id === layerId);
            /* Show or hide the features in the layer */
            layer.features.forEach((feature) => {
            /* Show or hide the feature depending on the active argument */
            if (active) {
                // L.marker([-33.450436, -70.6279]).addTo(this.map);
                feature.leafletObject.addTo(this.map);
            }else {
                // L.marker([-33.450436, -70.6279]).removeFrom(this.map);
                feature.leafletObject.removeFrom(this.map);
                }   
            });
        },


        getEmergencies(){
            this.axios.get(rest_ip+'emergencies').then(r => {
                const emergencies = r.data;
                this.initEmergenciesMark(emergencies)
                });
        },

        getVolunteers(){
            this.axios.get(rest_ip+'volunteers').then(r => {
                const volunteers = r.data;
                this.initVolunteersMark(volunteers);
                });
        },
    },

    mounted() { /* Code to run when app is mounted */ 
        this.getVolunteers();
        this.getEmergencies();
        this.initMap();
    },
    
  }
</script>
<style>
</style>
