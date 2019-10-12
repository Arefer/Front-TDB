<template>
    <div>

        <base-header type="gradient-success" class="pb-6 pb-8 pt-5 pt-md-8">
            <!-- Card stats -->
            <div class="row">
                <div class="col-xl-3 col-lg-6">
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
    data: {/* Data properties will go here */
        map: null,
        tileLayer: null,
        layers: [],
        regiones: [],
        emergencias: [],
    },
    methods: { /* Any app-specific functions go here */ 
        initMap() {
            this.map = L.map('map').setView([-51.760928, -72.482996], 12);
            this.tileLayer = L.tileLayer(
            'https://cartodb-basemaps-{s}.global.ssl.fastly.net/rastertiles/voyager/{z}/{x}/{y}.png',
            {
                maxZoom: 18,
                attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>, &copy; <a href="https://carto.com/attribution">CARTO</a>',
            }
            );
            this.tileLayer.addTo(this.map);
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
