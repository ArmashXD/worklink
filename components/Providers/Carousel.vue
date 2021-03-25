<template>
  <a-carousel class="border" arrows :after-change="onChange">
    <div slot="prevArrow" class="custom-slick-arrow" style="left: 10px;zIndex: 1">
      <a-icon type="left-circle" />
    </div>
    <div slot="nextArrow" class="custom-slick-arrow" style="right: 10px">
      <a-icon type="right-circle" />
    </div>
    <div v-for="m in media" :key="m.id">
      <img class="i" :src="m.url" />
    </div>
  </a-carousel>
</template>
<script>
import ServiceProvider from "~/services/Api/ServiceProvider";
export default {
  props: ["providerId"],
  data() {
    return {
      media: [],
      loading: false,
    };
  },
  methods: {
    onChange(a, b, c) {
    },
    getService(providerId) {
      ServiceProvider.serviceImages(providerId)
        .then((media) => {
          this.media = media;
        })
        .then(() => (this.loading = false));
    },
  },
  mounted() {
    this.getService(this.providerId);
  },
};
</script>
<style scoped>
.i {
  max-width: 700px;
  max-height: 700px;
  margin: auto;
}

@media screen and (max-width: 760px) {
 .i {
max-width: 250px;
  max-height: 250px;
 }
}
</style>

<style >
.ant-carousel .slick-dots-bottom {
  display: block !important;
  padding: 1em;
  background: rgba(0, 0, 0, 0.8);
  bottom: 0;
}
.ant-carousel .slick-dots li button,
.ant-carousel .slick-dots li.slick-active button {
  width: 15px;
  background: #fff;
  height: 15px;
  border-radius: 50%;
}
</style>