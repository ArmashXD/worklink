<template>
  <b-nav-item-dropdown
    class="btn-sm service-header-dd"
    :text="getTranslation.services"
    right
  >
    <b-dropdown-item
      v-for="service in getServices"
      :key="service.id"
      :href="getUrl(service.id)"
      >{{ service.name }}</b-dropdown-item
    >
  </b-nav-item-dropdown>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      trans: this.$store.state.translation,
      services: this.$store.state.services,
    };
  },
  mounted: function () {},
  methods: {
    getUrl(id) {
      return `/services-providers/listing?service_id[]=${id}`;
    },
    setServices() {
      this.services = this.$store.state.services;
    },
  },
  computed: {
    ...mapGetters(["getTranslation", "getServices"]),
  },
};
</script>

 <style lang="scss">
.service-header-dd {
  .dropdown-menu {
    max-height: 400px;
    overflow-y: scroll;
  }
}
</style>