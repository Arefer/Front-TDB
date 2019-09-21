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
                                <hr class="my-4" />
                                <!-- Address -->
                            </form>
                        </template>
                    </card>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
  export default {
    name: 'emergency-details',
    data() {
      return {
        model: ''
      }
    },
      created(){
        this.model = this.$route.query.emergency
      }
  };
</script>
<style></style>
