<template>
  <div>
    <div class="row">
      <div class="text-warning clearfix col-sm-5">
        <Rating :service_provider_id="provider.id" :initial="provider.total_rating" />
      </div>

      <h6 class="col-sm-7 number-container">
        <a-icon type="phone" />
        {{ provider.user.phone }}
        <nuxt-link :to="'/user/profile/'+provider.user.id" class="d-block">{{ provider.user.name }}</nuxt-link>
      </h6>

      <div class="col-4">
        <b-badge v-for="service in provider.services" :key="service.id">{{ service.name }}</b-badge>
      </div>
      <div class="col-8 text-right">
        <InstantMessage :provider="provider" />
        <ShareNetwork tag="div" network="facebook" :url="`http://worklink.com.pk${provider.url}`" :title="provider.name"
          :description="provider.description" quote="Check Out this service" hashtags="serviceProviders">
          <a-icon type="facebook" /> Share on Facebook
        </ShareNetwork>
      </div>
    </div>

    <h5 class="mt-2">
      <a-icon type="home" />
      {{ provider.address }}
      <span v-html="provider.adr_address"></span>
      <b-button class="text-success" variant="link">
        <a-icon type="pushpin" />
        <span v-on:click="visible=true">show on map</span>
      </b-button>
    </h5>

    <textarea class="form-control" rows="10" cols="20" v-html="provider.description" readonly
      v-model="provider.description"></textarea>

    <a-modal v-model="visible" title="Location" footer>
      <div>
        <GeoCode :provider="provider" />
      </div>
    </a-modal>
  </div>
</template>

<style lang="css" scoped>
  .share-network-facebook {
    color: #fff;
    border: 1px solid #FFF;
    border-radius: 3px;
    padding: 3px 4px;
    background-color: #5D7DAE;
    cursor: pointer;
    text-decoration: none;
    float: right;
  }

  .share-network-facebook:hover {
    cursor: pointer;
  }

  .form-control {
    color: black;
    background-color: #F6F8FD;
    border: none;
  }

  .form-control:hover {
    border: none;
  }
</style>

<script>
  import GeoCode from "~/components/Google/GeoCode";
  import InstantMessage from "~/components/Notification/InstantMessage";
  import Rating from "./_rating.vue";
  import ShareNetwork from 'vue-social-sharing/nuxt';

  export default {
    components: {
      GeoCode,
      Rating,
      InstantMessage
    },
    props: ["provider"],
    data() {
      return {
        visible: false,
      };
    },
  };
</script>