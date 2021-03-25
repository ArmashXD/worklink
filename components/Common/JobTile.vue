<template>
  <div class="job-tile" :class="grid">
    <nuxt-link :to="provider.url" class="m-auto">
      <div class="bg-white shadow inner-container clearfix">
        <div class="text-right mb-1">
          <b-badge
            class="mr-2"
            v-for="service in provider.services"
            :key="service.id"
            variant="success"
            >{{ service.name }}</b-badge
          >
          <a-badge v-if="provider.at_home" :title="homeTitle">
            <a-icon type="home" />
          </a-badge>
        </div>
        <div class="img-sm-card-container border">
          <span class="helperF"></span>
          <img :src="dp()" />
        </div>
        <!-- <a-avatar class="float-left" :size="55" :src="dp()" icon="user" /> -->

        <div class="detail">
          <h6
            class="tile-header text-success text-uppercase mb-2 ellipsis ellipsis-1 d-inline-block mt-2"
            v-b-tooltip.hover
            :title="provider.name"
          >
            {{ provider.name }}
          </h6>

          <div class="tile-body clearfix">
            <div
              class="pl-2 tile-ellipsis ellipsis ellipsis-2 addr"
              v-html="provider.adr_address"
            ></div>
            <div class="pl-2 tile-ellipsis ellipsis ellipsis-2">
              <div class="text-muted" v-html="provider.description"></div>
            </div>
          </div>
        </div>

        <!-- 
      <div class="tile-footer mt-2 clearfix">
        <Rating :service_provider_id="provider.id" :initial="provider.total_rating" />      
        </div>-->
      </div>
    </nuxt-link>
  </div>
</template>

<script>
import { BIcon, BIconStarFill } from "bootstrap-vue";
import Rating from "../Providers/_rating.vue";
import { isEmpty } from "~/services/Utilities";

export default {
  props: ["provider"],
  data() {
    return {
      homeTitle: `${this.provider.name} provider also serve at your door step`,
    };
  },
  props: {
    provider: {},
    grid: { default: "col-sm-4" },
  },
  components: {
    BIcon,
    BIconStarFill,
    Rating,
  },
  methods: {
    dp() {
      if (isEmpty(this.provider.media)) {
        return "https://api.worklink.com.pk/storage/site-content/33d26770-e46e-11ea-a75a-a7d53b08b60a.png";
      }

      return this.provider.media[0] === undefined
        ? "https://api.worklink.com.pk/storage/site-content/33d26770-e46e-11ea-a75a-a7d53b08b60a.png"
        : this.provider.media[0].url;
    },
  },
};
</script>

<style scoped>
.ellipsis-1 {
  -webkit-line-clamp: 1;
}

.ellipsis-2 {
  -webkit-line-clamp: 2;
}
.ellipsis {
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box !important;
  -webkit-box-orient: vertical;
}
.addr {
  font-size: 12px;
  font-weight: bold;
}
</style>
