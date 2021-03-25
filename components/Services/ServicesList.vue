<template>
  <div class="masonry-with-flex">
    <div v-for="category in catergories" class="i" :key="category.id">
      <h6 class="heading">{{ category.name }}</h6>
      <ul>
        <li
          class="list-style-none"
          v-for="service in category.services"
          :key="service.id"
          v-on:click="onClick(service)"
        >
          {{ service.name }}
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
import ServiceCategory from "~/services/Api/ServiceCategoryServices";
export default {
  data() {
    return {
      catergories: [],
    };
  },
  methods: {
    getServices() {
      ServiceCategory.services().then((catergories) => {
        this.catergories = catergories;
      });
    },
    onClick(service) {
      //   this.$bvModal.show("service-modal");
      this.$nuxt.$emit("getServiceFromModal", service);
      this.$emit("setService", service);
    },
  },
  mounted: function () {
    this.getServices();
  },
};
</script>

<style scoped>
.list-style-none {
  list-style: none;
  cursor: pointer;
}
ul {
  padding-left: 4px;
  font-size: 1em;
}
.heading {
  border-bottom: 1px solid #cecccc;
  padding: 0.2em;
}
</style>

<style scoped lang="scss">
.masonry-with-flex {
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  max-height: 1000px;
  div {
    margin: 0 1rem 1rem 0;
  }
}
</style>
