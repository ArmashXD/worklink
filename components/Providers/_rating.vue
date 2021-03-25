<template>
  <a-rate
    v-model="rating"
    :disabled="isDisable"
    allow-half
    :allow-clear="false"
    @change="rate"
  /> 

</template>

<script>
import ServiceProviderRating from "../../services/API/ServiceProviderRating";
import {isLoggedin} from "~/services/Auth";

export default {
  props: {
    isDisable: {
      default: false
    },
    service_provider_id: {},
    initial: {},
  },
  data: function () {
    return {
      rating: this.initial,
    };
  },
  methods: {
    rate(rating) {
      if (!isLoggedin()) {
        return this.$bvModal.show("login-modal");
      } else {
        ServiceProviderRating.create({
            service_provider_id: this.service_provider_id,
            rating,
          })
          .then((response) => {
            this.rating = response.rating;
          })
          .catch((e) => {});
      }
    }
  },
  mounted() {},
};
</script>