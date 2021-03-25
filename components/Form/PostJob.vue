<template>
  <div>
    <a-form
      :form="form"
      :label-col="{ span: 5 }"
      :wrapper-col="{ span: 19 }"
      @submit="handleSubmit"
    >
      <a-form-item label="Business Title">
        <a-input
          show-search
          v-decorator="[
            'name',
            {
              initialValue: provider.name,
              validateTrigger: 'submit',
              rules: [
                {
                  required: true,
                  message: 'Please input your services title!',
                },
              ],
            },
          ]"
        />
      </a-form-item>
      <a-form-item label="Location">
        <Autocomplete
          :provider="provider"
          :autoLoad="false"
          @getCoordinates="getCoordinates"
        />
      </a-form-item>

      <a-form-item label="Postal Address">
        <a-input
          v-decorator="[
            'postal_address',
            { initialValue: provider.postal_address },
          ]"
        />
      </a-form-item>

      <a-form-item label="Services">
        <a-select
          showSearch
          mode="multiple"
          :filter-option="filterOption"
          v-decorator="[
            'service_id',
            {
              initialValue: getTagsId(provider.service_ids),
              rules: [
                { required: true, message: 'Please input your service!' },
              ],
            },
          ]"
        >
          <a-select-option v-for="opt in options" :key="opt.id.toString()">{{
            opt.name
          }}</a-select-option>
        </a-select>

        <b-button
          v-on:click="showListingModal"
          class="btn-service text-success p-0"
          variant="link"
        >
          {{ getTranslation.show_services }}
          <BIconArrowDownShort />
        </b-button>
      </a-form-item>

      <a-form-item label="Key words">
        <a-select
          mode="tags"
          allowClear
          placeholder="#tags"
          :filter-option="filterOption"
          v-decorator="[
            'service_hash',
            {
              initialValue: getTagsId(provider.tags_id),
              rules: [
                {
                  validator: (rule, value, cb) =>
                    validateService(rule, value, cb),
                  message: 'you are not allow to add more than 5 tags',
                },
              ],
            },
          ]"
        >
          <a-select-option v-for="tag in tags" :key="tag.id.toString()">{{
            tag.name
          }}</a-select-option>
        </a-select>
      </a-form-item>

      <a-form-item label="Description">
        <a-textarea
          placeholder="Insert Your Comment"
          :rows="4"
          v-decorator="[
            'description',
            {
              initialValue: provider.description,
              rules: [{ required: true, message: 'Description required!' }],
            },
          ]"
        ></a-textarea>
      </a-form-item>

      <a-form-item class="d-none">
        <a-input
          hidden
          v-decorator="[
            'longitude',
            {
              initialValue: provider.longitude,
            },
          ]"
        />
      </a-form-item>
      <a-form-item class="d-none">
        <a-input
          hidden
          v-decorator="[
            'latitude',
            {
              initialValue: provider.latitude,
            },
          ]"
        />
      </a-form-item>
      <a-form-item class="d-none">
        <a-input
          hidden
          v-decorator="[
            'adr_address',
            {
              initialValue: provider.adr_address,
            },
          ]"
        />
      </a-form-item>

      <a-form-item
        :label-col="{ span: 7 }"
        :wrapper-col="{ span: 14 }"
        label="Are you a Home service provider?"
      >
        <a-checkbox
          :defaultChecked="provider.at_home"
          v-decorator="['at_home', { initialValue: provider.at_home }]"
        ></a-checkbox>
      </a-form-item>

      <ul class="text-danger">
        <li v-for="(error, index) in errors" :key="index">{{ error }}</li>
      </ul>
      <a-form-item :wrapper-col="{ span: 12, offset: 5 }">
        <a-button type="primary" :disabled="loading" html-type="submit">
          <b-spinner v-if="loading" small label="Small Spinner"></b-spinner
          >Submit
        </a-button>
      </a-form-item>
    </a-form>
    <a-modal
      :zIndex="zIndex"
      v-model="showServiceModal"
      title="All Services"
      footer
      width="80%"
    >
      <ServiceList @setService="setService" />
    </a-modal>
  </div>
</template>

<script>
import ServiceLookup from "~/components/Services/Lookup";
import ServiceProvider from "~/services/Api/ServiceProvider";
import Autocomplete from "~/components/Google/Autocomplete";
import TagLookup from "~/components/Tags/TagLookup";
import ServiceTag from "~/services/Api/ServiceTag";
import { isEmpty } from "~/services/Utilities";
import { mapGetters } from "vuex";
import { BIcon, BIconArrowDownShort } from "bootstrap-vue";
import ServiceList from "~/components/Services/ServicesList";

export default {
  components: {
    Autocomplete,
    ServiceLookup,
    TagLookup,
    BIconArrowDownShort,
    ServiceList,
  },
  props: {
    provider: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  data() {
    return {
      dataprovider: this.provider,
      tags: [],
      formLayout: "horizontal",
      form: this.$form.createForm(this, { name: "coordinated" }),
      show: true,
      options: this.$store.getters.getServices,
      autocompleteOptions: {
        componentRestrictions: {
          country: ["pk"],
        },
      },
      loading: false,
      showServiceModal: false,
      zIndex: 99999,
      componentKey: 0,
      errors: [],
    };
  },
  methods: {
    save(params = {}) {
      this.loading = true;
      ServiceProvider.save(params)
        .then((provider) => {
          this.$emit("onCompelete", provider);
          this.showSuccessToaster();
        })
        .catch((e) => {
          //  alert(e.message)
        })
        .then(() => (this.loading = false));
    },
    update(params = {}) {
      this.loading = true;
      ServiceProvider.update(this.provider.id, params)
        .then((provider) => {
          this.$emit("onCompelete", provider);
          this.showSuccessToaster();
        })
        .catch((e) => {
          //  alert(e.message)
        })
        .then(() => (this.loading = false));
    },
    showSuccessToaster() {
      this.$bvToast.toast(`service `, {
        title: "Your service has been submited",
        autoHideDelay: 300000,
        appendToast: true,
        variant: "success",
      });
    },
    setService(service) {
      let selectedServices = this.form.getFieldValue("service_id");
      if (isEmpty(selectedServices)) {
        selectedServices = [];
      }
      selectedServices = [...selectedServices, service.id.toString()];
      this.form.setFieldsValue({
        service_id: [...new Set(selectedServices)],
      });
      this.showServiceModal = false;
    },
    forceRerender() {
      this.componentKey += 1;
    },
    handleSubmit(e) {
      e.preventDefault();
      //A great piece of shit,need to optimization in a free time validator is not working by which post not added hot fix production
      let fields = this.form.getFieldsValue([
        "name",
        "service_id",
        "service_hash",
        "description",
        "latitude",
        "longitude",
      ]);

      this.errors = [];
      if (isEmpty(fields.name)) {
        this.errors.push("name required");
      }
      if (isEmpty(fields.service_id)) {
        this.errors.push("service required");
      }
      if (isEmpty(fields.service_hash)) {
        this.errors.push("tags required");
      }
      if (isEmpty(fields.description)) {
        this.errors.push("description required");
      }
      if (fields.longitude == undefined || fields.longitude === undefined) {
        this.errors.push("location is required");
      }

      if (!isEmpty(this.errors)) {
        return false;
      }

      this.form.validateFields((err, values) => {
      
        if (!err) {
          if (this.provider.id !== undefined) {
            this.update(values);
          } else {
            this.save(values);
          }
        }
      });
    },
    handleHashTags(a, b, c) {},
    getCoordinates(addressData) {
      this.form.setFieldsValue({
        longitude: addressData.geometry.location.lng(),
        latitude: addressData.geometry.location.lat(),
        adr_address: addressData.adr_address,
      });
    },
    // move to inner lookup
    getServicesTag() {
      ServiceTag.all().then((tags) => {
        this.tags = tags;
      });
    },
    filterOption(input, option) {
      return (
        option.componentOptions.children[0].text
          .toLowerCase()
          .indexOf(input.toLowerCase()) >= 0
      );
    },
    getTagsId(tags) {
      // hot fix
      if (tags !== undefined) {
        return tags.map(String);
      }
    },
    validateService(rule, input, c) {
      if (input.length > 5) {
        return false;
      }
      return true;
    },
    filterOption(input, option) {
      return (
        option.componentOptions.children[0].text
          .toLowerCase()
          .indexOf(input.toLowerCase()) >= 0
      );
    },
    showListingModal() {
      this.showServiceModal = true;
    },
  },
  mounted() {
    this.getServicesTag();
  },
  computed: {
    ...mapGetters(["getTranslation"]),
  },
};
</script>


<style >
.pac-container {
  z-index: 1051 !important;
}
</style>