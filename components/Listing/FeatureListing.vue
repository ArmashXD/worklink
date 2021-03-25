<template>
  <div class="mid row">
    <JobTile
      v-for="serviceProvider in serviceProviders"
      :key="serviceProvider.id"
      :provider="serviceProvider"
    />
  </div>
</template>
<script>
import JobTile from "~/components/Common/JobTile.vue";
import Listing from "~/services/Api/Listing";

export default {
  components: { JobTile },
  data() {
    return {
      serviceProviders: []
    };
  },
  methods: {
    getFeatureListing() {
      Listing.all({ name: "FEATURE" }).then(d => {
        this.serviceProviders = d.data;
      });
    }
  },
  mounted() {
    this.getFeatureListing();
  }
};
</script>