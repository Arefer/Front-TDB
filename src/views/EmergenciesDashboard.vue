<template>
    <div>
        <base-header class="header pb-8 pt-5 pt-lg-8 d-flex align-items-end"
                     style="min-height: 50px; background-image: url(img/theme/banner.jpg); background-size: cover; background-position: top;">
            <!-- Mask -->
<!--            <span class="mask bg-gradient-success opacity-8"></span>-->
            <!-- Header container -->

                <div class="col-md">
                    <router-link to="create-emergency"> <b-button> NUEVA <i class="ni ni-fat-add"> </i></b-button>  </router-link>
                </div>

        </base-header>
        <div  class="container-fluid mt--7">
            <div v-for="emergency in this.emergencies" v-bind:key="emergency.id" class="col-md" style="padding-bottom: 10px">
                <stats-card :title=emergency.title
                            :query-params="{id: emergency.id}"
                            component="emergency-details"
                            type="gradient-red"
                            :sub-title=emergency.location
                            icon="ni ni-active-40"
                            class="mb-4 mb-xl-0"
                >
                
                    <template slot="footer">                
                        <span class="text-green mr-2"><i class="ni ni-calendar-grid-58"></i> </span>                        
                        <span class="text-nowrap">{{emergency.postedAt}}</span>
                    </template>
                </stats-card>
            </div>
        </div>
    </div>
</template>

<script>
    import {rest_ip} from "../router";
    export default {
    name: "EmergenciesDashboard",

    data() {
        return {
            emergencies: []
        }
    },
    methods: {
        retrieveData(){
            this.axios.get(rest_ip+'emergencies').then(r => this.emergencies = r.data)
        }
    },
    mounted(){
        this.retrieveData()
    }
}
</script>

<style scoped>

</style>