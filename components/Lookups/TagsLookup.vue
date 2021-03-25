<template>
  <a-select
    mode="tags"
    allowClear
    :placeholder="'start typing to get keywords'"
     v-on:change="onTagSelect"
    @search="onSearch"
    :filter-option="false"
    v-decorator="['tag_id']"
  >
    <a-spin v-if="fetching" slot="notFoundContent" size="small" />
    <a-select-option v-for="tag in tagOptions" :key="tag.id.toString()">{{
      tag.name
    }}</a-select-option>
  </a-select>
</template>

<script>
import { filterOption } from "~/services/Utilities";
import ServiceTag from "~/services/Api/ServiceTag";
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      tagOptions: [],
      options: this.$store.getters.getServices,
      filterOption: filterOption,
      fetching: false,
    };
  },
  methods: {
    onTagSelect(e, c) {    
      this.$emit("getTag", e);
    },
    onSearch(i) {
      if (i.length > 0) {
        this.findTag(i);
      }
    },
    findTag(find) {
      this.fetching = true;
      ServiceTag.find({ find: find })
        .then((r) => {
          this.tagOptions = r.data;
        })
        .then(() => (this.fetching = false));
    },
  },
};
</script>
