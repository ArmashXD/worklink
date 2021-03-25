<template>
  <section class="bg-l-blue detail-page">
    <div class="mid">
      <div class="row">
        <div class="col-md-3 row m-0 p-0">
          <a-skeleton :loading="providerLoading" class="w-100 p-2" active>
            <a-avatar
              :src="provider.image_url"
              class="d-block m-auto border"
              :size="150"
              icon="user"
            />
            <a-card
              class="col-12 mt-4 text-capitalize text-center"
              :title="provider.name + ' details'"
            >
              <!-- <a slot="extra" href="#">more</a> -->
              <p>
                <Rating :isDisable="true" :initial="provider.rating" />
              </p>
              <p>Total Servces :{{ provider.service_count }}</p>
            </a-card>
          </a-skeleton>
        </div>
        <div class="col-md-9 row m-0 bg-white">
          <a-skeleton :loading="providerLoading" class="col-12" active>
            <h3 class="col-12 border-bottom text-capitalize p-3 mb-0">
              {{ provider.name }} Provided Services
            </h3>
            <div class="row">
              <JobTile
                v-for="service in services"
                :key="service.id"
                :provider="service"
              />
            </div>
          </a-skeleton>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import UserService from "~/services/Api/UserServices";
import JobTile from "~/components/Common/JobTile.vue";
import Rating from "~/components/Providers/_rating.vue";
export default {
  components: { JobTile, Rating },
  data() {
    return {
      provider: [],
      services: [],
      serviceLoading: true,
      providerLoading: true,
    };
  },
  methods: {
    fetch() {
      this.providerLoading = true;
      UserService.profile(this.$route.params.id)
        .then((provider) => {
          this.provider = provider;
          this.getuserService();
        })
        .then(() => {
          this.providerLoading = false;
        });
    },
    getuserService() {
      this.serviceLoading = true;
      UserService.serviceProvide(this.provider.id)
        .then((services) => {
          this.services = services.data;
        })
        .then(() => {
          this.serviceLoading = false;
        });
    },
  },
  mounted() {
    this.fetch();
  },
};
</script>