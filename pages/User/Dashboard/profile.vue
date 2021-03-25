<template>
  <div class="row profil-container">
    <div class="col-md-3 col-12 bg-white profile rounded text-center">
      <div class="upload-container">
        <span v-if="user">
          <Upload :currentUser="user" />
        </span>
      </div>
      <h6 class="text-success">{{ user.name }}</h6>
      <h6 class="muted">{{ user.phone }}</h6>
      <Rating v-if="rating >= 0" :isDisable="false" :initial="rating" />
      <p class="muted">
        Ambitioni dedisse scripsisse iudicaretur. Cras mattis iudicium purus sit
        amet fermentum. Donec sed odio operae
      </p>
      <h6 v-if="services.length > 0" class="text-left mt-2">Services</h6>
      <b-badge
        class="mr-1"
        v-for="(s, i) in services"
        :key="s + i + 'b'"
        variant="success"
        >{{ s }}</b-badge
      >
      <h6 v-if="tags.length > 0" class="text-left mt-2">Tags In Use</h6>
      <a-tag
        v-for="(t, i) in tags"
        :key="t + i + 'x'"
        class="mr-1 mt-1"
        color="green"
        >{{ t }}
      </a-tag>
    </div>
    <div class="col-md-9 col-12 listing-container-profil bg-white rounded pt-3 p-4 pb-3">
      <h4>
        Provided Services
        <span v-if="rating > 0" class="float-right">
          {{ rating }}
          <Rating v-if="rating" :isDisable="false" :initial="rating"
        /></span>
      </h4>
      <div class="">
        <ServiceList @getdata="getServicesFromChildComponent" />
      </div>
    </div>
  </div>
</template>
<script>
import UserService from "~/services/Api/UserServices";
import Rating from "~/components/Providers/_rating";
import Upload from "~/components/User/Upload";
import ServiceList from "~/components/User/Services";
import { mapGetters } from "vuex";
export default {
  components: { Rating, Upload, ServiceList },
  middleware: "authenticated",
  layout: "dashboard",
  data() {
    return {
      user: {},
      rating: null,
      tags: [],
      services: [],
    };
  },
  methods: {
    getUserDetails() {
      UserService.detail().then((user) => {
        this.rating = user.rating;
        this.user = user;
      });
    },
    getServicesFromChildComponent(servies) {
      let serviceName = [];
      let tags = [];

      servies.map((s) => {
        s.services.map((s) => {
          serviceName = [...serviceName, s.name];
        });
        s.service_tag.map((s) => {
          tags = [...serviceName, s.name];
        });
      });

      this.tags = [...new Set(tags)];
      this.services = [...new Set(serviceName)];
    },
  },
  mounted() {
    this.getUserDetails();
  },
};
</script>

<style >
.profil-container .profile {
  border-right: 20px solid #f0f2f5 !important;
}
</style>

<style lang="scss" >
.upload-container {
  max-width: 150px;
  margin: 10% auto auto;
  .ant-upload.ant-upload-select-picture-card {
    height: 150px;
    width: 150px;
    border-radius: 50%;
    border: 3px solid #f0f2f5;
  }
  img {
    max-width: 150px;
    border-radius: 50%;
    overflow: hidden;
    width: 150px;
    height: 150px;
  }
  .ant-upload-select {
    min-width: 100%;
    min-height: 100%;
  }
}
.profil-container {
  .ant-list-items {
    li.ant-list-item {
      padding: 15px;
      border-radius: 5px;
    }
  }
  .ant-list-item-meta-description {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    /* height: 20px; */
    max-width: 100%;
    max-width: 700px;
    width: 100%;
    position: relative;
    display: block;
  }
  
.ant-list-item{
    overflow: hidden;
  }
}

.listing-container-profil{
 @media only screen and (max-width: 768spx) {
    margin-top: 20PX;
    }
}
</style>