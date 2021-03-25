<template>
  <a-form class="w-100 advance-search" :form="form" @submit="handleSubmit">
    <a-row :gutter="24">
      <a-col :xs="{ span: 24 }" :md="{ span: 7 }">
        <a-form-item>
          <Autocomplete :allowCurrentLocation="true" @getCoordinates="getCoordinates" />
        </a-form-item>
      </a-col>
      <a-col :xs="{ span: 24 }" :md="{ span: 7 }">
        <a-form-item>
          <AntServiceLookup @getService="setServicesParams" :form="form" />
        </a-form-item>
      </a-col>
      <a-col :xs="{ span: 24 }" :md="{ span: 7 }">
        <a-form-item
          :validate-status="searchValidation() ? 'error' : ''"
          :help="searchValidation() || ''"
          class="check-container"
        >
          <TagsLookup @getTag="setTag" />
          <a-checkbox @change="atHome" class="at_home"> Home service </a-checkbox>
        </a-form-item>
      </a-col>
      <!-- <a-col
        :xs="{ span: 12 }"
        :md="{ span: 6 }"
        style="padding-left: 10px; padding-right: 10px"
      >
        <a-form-item>
          <a-input
            placeholder="Name Or Description"
            name="name_description"
            @change="nameAndDescription"
          />
        </a-form-item>
      </a-col> -->
      <a-col :xs="{ span: 24 }" :md="{ span: 3 }">
        <a-form-item>
          <a-button type="primary" class="primary-btn" success html-type="submit">
            Submit
          </a-button>
        </a-form-item>
      </a-col>
    </a-row>
  </a-form>
</template>

<script>
import Autocomplete from "~/components/Google/Autocomplete";
import AntServiceLookup from "~/components/Lookups/AntServiceLookup";
import TagsLookup from "~/components/Lookups/TagsLookup";
import { mapGetters } from "vuex";
import { isEmpty } from "~/services/Utilities";

export default {
  components: { AntServiceLookup, Autocomplete, TagsLookup },
  data() {
    return {
      formLayout: "horizontal",
      form: this.$form.createForm(this, { name: "coordinated" }),
      query: {},
      i: 1,
      params: {},
    };
  },
  methods: {
    handleSubmit(e) {
      e.preventDefault();

      let cordinates = {};

      if (
        !isEmpty(this.getCordinates.longitude) &&
        !isEmpty(this.getCordinates.longitude)
      ) {
        cordinates = {
          ...this.getCordinates,
        };
      }
      this.$router.push({
        path: "/services-providers/listing",
        query: { ...this.params, ...cordinates },
      });
    },
    searchValidation(a, b) {
      const { getFieldError, isFieldTouched } = this.form;
      return isFieldTouched("userName") && getFieldError("userName");
    },
    getCoordinates(addressData) {
      this.params = {
        ...this.params,
        latitude: addressData.geometry.location.lat(),
        longitude: addressData.geometry.location.lng(),
      };
    },
    setServicesParams(services, c) {
      services = isEmpty(services) ? [] : services;
      this.params = {
        ...this.params,
        service_id: services,
      };
    },
    setTag(tags) {
      tags = isEmpty(tags) ? [] : tags;

      this.params = {
        ...this.params,
        search: tags,
        // description:tags
      };
    },
    nameAndDescription(e) {
      let params = this.params;
      this.params = {
        ...this.params,
        name: e.target.value,
        description: e.target.value,
      };
    },
    atHome(e) {
      let params = this.params;
      this.params = {
        ...this.params,
        at_home: e.target.checked,
      };
    },
  },
  mounted() {
    // this.$nuxt.$on("getServiceFromModal", (payload) => {
    //   console.log("payload", payload);
    // });
  },
  computed: { ...mapGetters(["getCordinates"]) },
};
</script>

<style lang="scss">
.advance-search {
  .check-container {
    text-align: left;
  }
  .at_home {
    padding: 0;
    color: white;
    line-height: 0;
    display: inline-block;
    vertical-align: top;
    left: 0;
    margin-left: 1px;
    text-align: left;
  }
}
.job-list .advance-search .check-container .at_home {
  color: #28a745;
}
</style>
