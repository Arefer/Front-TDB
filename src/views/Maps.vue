<template>
    <div>

        <base-header type="gradient-success" class="pb-6 pb-8 pt-5 pt-md-8">
            <!-- Card stats -->
            <div class="row">
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
            </div>
            <div class="row">
                <div class="col">
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

  export default {
    data(){/* Data properties will go here */
        return{
            map: null,
            tileLayer: null,
            layers: [
                {
                id: 0,
                name: 'Emergencies',
                active: false,
                features: [],
                },
                {
                id: 2,
                name: 'Volunteers',
                active: false,
                features: [],
                }
            ],
            regiones: [],
            emergencias: [],
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
            L.marker([-33.450436, -70.6279]).addTo(this.map);
            L.marker([-33.43677, -70.70647]).addTo(this.map);
            
        },
        initLayers() {},
    },
    
    mounted() { /* Code to run when app is mounted */ 
        this.initMap();
        this.initLayers();
    },
    
  }
</script>
<style>
</style>
