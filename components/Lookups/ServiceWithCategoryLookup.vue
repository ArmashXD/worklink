<template>
  <multiselect
    v-model="value"
    :options="options"
    :multiple="true"
    group-label="name"
    group-values="services"
    :group-select="true"
    placeholder="Type to search"
    track-by="name"
    label="name"
    ><span slot="noResult"
      >Oops! No elements found. Consider changing the search query.</span
    ></multiselect
  >
</template>

<script>
import Multiselect from "vue-multiselect";
import Service from "~/services/Api/service";
export default {
  components: { Multiselect },
  data() {
    return {
      value: [],
      options: []
    };
  },
  mounted: function() {
    var self = this;
    Service.all().then(options => {
      self.options = options;
    });

    // this.$nextTick(function () {
    //   // Code that will run only after the
    //   // entire view has been rendered
    // })
  },
  methods: {
    fetch: () => {}
  }
};
</script>
<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
