<template>
  <span>
    <a-select
      showSearch
      mode="multiple"
      style="min-width: 120px"
      placeholder="Services"
      :filter-option="filterOption"
      v-on:change="getService"
      v-model="services"
      v-decorator="[
        'service_id',
        {
          rules: [{ required: true, message: 'Please input your note!' }],
        },
      ]"
    >
      <a-select-option v-for="opt in options" :key="opt.id">{{
        opt.name
      }}</a-select-option>
    </a-select>
    <b-button
      v-on:click="showListingModal"
      class="btn-service text-success"
      variant="link"
    >
      {{ getTranslation.show_services }}
    </b-button>
    <ServiceModal @setService="setService" />
  </span>
</template>

<script>
import { filterOption } from "~/services/Utilities";
import Service from "~/services/Api/service";
import ServiceModal from "~/components/Services/Modal";
import { mapGetters } from "vuex";
export default {
  components: { ServiceModal },
  props: ["form"],
  data() {
    return {
      options: this.$store.getters.getServices,
      filterOption: filterOption,
      trans: this.$store.getters.getTranslation,
      services: [],
    };
  },
  methods: {
    getService(value) {
      this.$emit("getService", value);
    },
    showListingModal() {
      this.$bvModal.show("service-modal");
    },
    setService(service) {
      let perviousService = this.form.getFieldsValue();
      //this is fucking jugard at 4 am
      this.services.push(service.id);
      this.$emit("getService", [service.id]);
      // this.services.push(service);
      //this.services.indexOf(service) && this.services.push(service);
      this.$bvModal.hide("service-modal");
    },
  },
  mounted: function () {
    var self = this;
    Service.all().then((options) => {
      this.$store.commit("setServices", options);
      self.options = options;
    });
  },
  computed: {
    ...mapGetters(["getTranslation"]),
  },
};
</script>
<style scoped>
.btn-service {
  padding: 0 7px;
  text-decoration: underline;
  line-height: 1;
  float: left;
  width: 100%;
  font-size: 14px;
  text-align: left;
}
</style>
