<template>
  <div>
    <a-skeleton active :loading="loading">
      <b-card :title="title" deck>
        <JobTile
          grid="col-xs-12"
          v-for="serviceProvider in serviceProviders"
          :key="serviceProvider.id"
          :provider="serviceProvider"
        />
      </b-card>
    </a-skeleton>
  </div>
</template>
<script>
import JobTile from "~/components/Common/JobTile.vue";
import ServiceProvider from "~/services/Api/ServiceProvider";
export default {
  props: { params: { default: {} }, title: { default: "Related Provider" } },
  components: {
    JobTile,
  },
  data() {
    return {
      serviceProviders: [],
      loading: true,
    };
  },
  methods: {
    getRelatedPost(params) {
      this.loading = true;
      let postedParams = { results: 3, ...params };
      ServiceProvider.list(postedParams)
        .then((serviceProviders) => {
          this.serviceProviders = serviceProviders.data;
        })
        .catch((e) => {
          //  alert(e.message)
        })
        .then(() => (this.loading = false));
    },
  },
  mounted() {
    this.getRelatedPost(this.params);
  },
};
</script>