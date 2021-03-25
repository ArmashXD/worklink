<template>
  <a-form
    @submit="onSubmit"
    :form="searchForm"
    class="justify-content-center align-self-center w-100 search-from"
  >
    <b-row class="my-1">
      <b-col class="pr-0 i-f" md="4">
        <Autocomplete
          :allowCurrentLocation="true"
          @getCoordinates="getCoordinates"
        />
      </b-col>
      <b-col class="pr-0 i-f" md="3">
        <ServiceLookup @getService="getService" />
      </b-col>
      <b-col class="pr-0 i-f check-container" md="3">
        <a-form-item>
          <a-select
            mode="multiple"
            allowClear
            :placeholder="'start typing to get keywords'"
            @search="onSearch"
            @select="onTagSelect"
            :filter-option="false"
            v-decorator="['tag_id']"
          >
            <a-spin v-if="fetching" slot="notFoundContent" size="small" />
            <a-select-option
              v-for="tag in tagOptions"
              :key="tag.id.toString()"
              >{{ tag.name }}</a-select-option
            >
          </a-select>
          <a-checkbox @change="atHome" class="at_home">
            Home service
          </a-checkbox>
        </a-form-item>
      </b-col>

      <b-col class="i-f text-right" md="2">
        <!-- <b-button type="submit" variant="success">Submit</b-button> -->
        <a class="btn btn-success" :href="url">{{ getTranslation.submit }}</a>
        <!-- <link type="submit" variant="success">Submit</b-button> -->
      </b-col>
    </b-row>
  </a-form>
</template>

<script>
import Autocomplete from "~/components/Google/Autocomplete";
import ServiceLookup from "~/components/Lookups/ServiceLookup";
import ServiceTag from "~/services/Api/ServiceTag";
import { mapGetters } from "vuex";

export default {
  components: { ServiceLookup, Autocomplete },
  data() {
    return {
      searchForm: this.$form.createForm(this, { name: "coordinated" }),
      tagOptions: [],
      fetching: false,
      selected: null,
      params: {},
      uri: "/services-providers/listing",
      url: null,
      trans: this.$store.state.translation,
      form: {
        location: null,
      },
    };
  },
  methods: {
    onSubmit: function (e) {
      e.preventDefault();
    },
    getCoordinates(addressData) {
      this.params = {
        latitude: addressData.geometry.location.lat(),
        longitude: addressData.geometry.location.lng(),
        ...this.params,
      };

      this.url = `${this.uri}?${this.filter(this.params)}`;
    },
    filter(obj) {
      {
        return Object.entries(obj)
          .filter(([k, v]) => {
            return v !== undefined && v !== null;
          })
          .map(([k, v]) =>
            Array.isArray(v)
              ? v.map((iv) => `${k}[]=${encodeURIComponent(iv)}`).join("&")
              : `${k}=${encodeURIComponent(v)}`
          )
          .join("&");
      }
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
    getService(value) {
      this.params = {
        service_id: value.map((i) => i.id),
        ...this.params,
      };
      this.url = `${this.uri}?${this.filter(this.params)}`;
    },
    onTagSelect(e, c) {
      let tags = this.searchForm.getFieldsValue();
      let params = this.params;
      params.tag_id = tags["tag_id"];
      this.url = `${this.uri}?${this.filter(this.params)}`;
    },
    atHome(e) {
      let params = this.params;
      params.at_home = e.target.checked;
      this.url = `${this.uri}?${this.filter(this.params)}`;
    },
  },
  mounted() {
    this.url = this.uri;
  },
  computed: {
    ...mapGetters(["getTranslation"]),
  },
};
</script>


<style scoped>
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
.job-list .check-container .at_home {
  color: #28a745;
}
</style>