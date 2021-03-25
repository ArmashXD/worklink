<template>
  <a-select v-decorator="vDecorator">
    <a-select-option  v-for="opt in options" :key="opt.id">{{opt.name}}</a-select-option>
  </a-select>
</template>

<script>
import Service from "~/services/Api/service";
export default {
  props: ["vDecorator"],
  data() {
    return {
      options: this.$store.getters.services
    };
  },
  methods: {},
  mounted: function() {},
  async fetch() {
    this.options =
      this.options.length < 0
        ? this.options
        : await Service.all().then(options => options);
  }
};
</script>