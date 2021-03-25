<template>
  <div>
    <multiselect
      v-model="value"
      :options="options"
      :multiple="true"
      :group-select="true"
      :placeholder="getTranslation.services"
      track-by="name"
      label="name"
      @input="getService"
    >
      <span slot="noResult"
        >Oops! No elements found. Consider changing the search query.</span
      >
    </multiselect>
    <b-button
      v-on:click="showListingModal"
      class="btn-service text-success"
      variant="link"
    >
      {{ getTranslation.show_services }}
      <BIconArrowDownShort />
    </b-button>
    <ServiceModal @setService="setService" />
  </div>
</template>

<script>
import ServiceModal from "~/components/Services/Modal";
import Multiselect from "vue-multiselect";
import Service from "~/services/Api/service";
import { BIcon, BIconArrowDownShort } from "bootstrap-vue";
import { mapGetters } from "vuex";
export default {
  components: { ServiceModal, Multiselect, BIconArrowDownShort },
  data() {
    return {
      value: [],
      options: [],
      trans: this.$store.getters.getTranslation,
    };
  },
  mounted: function () {
    var self = this;
    Service.all().then((options) => {
      this.$store.commit("setServices", options);
      self.options = options;
    });
  },
  methods: {
    fetch: () => {},
    getService() {
      this.$emit("getService", this.value);
    },
    showListingModal() {
      this.$bvModal.show("service-modal");
    },
    setService(service) {
      this.value.indexOf(service) && this.value.push(service);
      this.$bvModal.hide("service-modal");
    },
  },
  computed: {
    ...mapGetters(["getTranslation"]),
  },
};
</script>
<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
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
<style >
.multiselect__placeholder {
  margin-bottom: 5px;
  margin-top: -5px;
}
.multiselect__tags {
  border: 1px solid #ced4da !important;
}
</style>