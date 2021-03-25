<template>
  <b-modal id="service-modal" centered size="xl" hide-footer>
    <template v-slot:modal-title>All Services</template>
    <ServiceList @setService="setService" />
  </b-modal>
</template>
<script>
import ServiceList from "~/components/Services/ServicesList";
export default {
  components: {
    ServiceList,
  },
  methods: {
    setService(service) {
      this.$emit("setService", service);
    },
  },
};
</script>

