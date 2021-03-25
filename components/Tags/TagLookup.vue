<template>
  <a-select
    mode="tags"
    allowClear
    placeholder="#tags"
    :filter-option="filterOption"
    v-decorator="['service_hash', { rules: [{ required: true, message: 'Please input your note!' }] }]"
  >
    <a-select-option v-for="tag in tags" :key="tag.id.toString()">{{tag.name}}</a-select-option>
  </a-select>
</template>
<script>
import ServiceTag from "~/services/Api/ServiceTag";
export default {
  data() {
    return {
      tags: []
    };
  },
  methods: {
    getServicesTag() {
      ServiceTag.all().then(tags => {
        this.tags = tags;
      });
    },
    filterOption(input, option) {
      return (
        option.componentOptions.children[0].text
          .toLowerCase()
          .indexOf(input.toLowerCase()) >= 0
      );
    }
  },
  mounted() {
    this.getServicesTag();
  }
};
</script>