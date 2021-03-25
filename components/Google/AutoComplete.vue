<template>
  <gmap-autocomplete
    class="introInput ant-input"
    @place_changed="getAddressData"
    :options="autocompleteOptions"
    :value="addrs"
  >
    <template v-slot:input="slotProps">
      <v-text-field
        outlined
        prepend-inner-icon="place"
        ref="input"
        v-on:listeners="slotProps.listeners"
        v-on:attrs="slotProps.attrs"
      ></v-text-field>
    </template>
  </gmap-autocomplete>
</template>

<script>
import VueGoogleAutocomplete from "vue-google-autocomplete";
import { isEmpty } from "~/services/Utilities";
import { mapGetters } from "vuex";
export default {
  props: {
    provider: {
      type: Object,
      default() {
        return {};
      },
    },
    allowCurrentLocation: {
      default() {
        return false;
      },
    },
    autoLoad: {
      default() {
        return true;
      },
    },
  },
  components: { VueGoogleAutocomplete },
  data() {
    return {
      addrs: null,
      autocompleteOptions: {
        componentRestrictions: {
          country: ["pk"],
        },
      },
    };
  },
  methods: {
    getAddressData: function (addressData) {
      this.$store.commit("setCordinates", {
        latitude: addressData.geometry.location.lat(),
        longitude: addressData.geometry.location.lng(),
      });

      this.$store.commit("setCurrentLocation", addressData.formatted_address);
      this.$emit("getCoordinates", addressData);
    },
    //get the cordinate of current location
    geolocate: function (geoLocation) {
      this.setGeoLocation({
        lat: geoLocation.coords.latitude,
        lng: geoLocation.coords.longitude,
      });
    },
    // set on the location
    setGeoLocation: function (value) {
      let geocoder = new google.maps.Geocoder();
      geocoder.geocode({ location: value }, (results, status) => {
        if (status === "OK") {
          if (results[0]) {
            this.$store.commit("setCordinates", {
              latitude: results[0].geometry.location.lat(),
              longitude: results[0].geometry.location.lng(),
            });
            this.$store.commit("setCurrentLocation", results[0].formatted_address);
            this.addrs = results[0].formatted_address;
            //this.$refs.input.update(results[0].formatted_address);
          }
        } else {
          alert("error", "error getting address from coords");
        }
      });
    },
    setAddress() {
      // this method is for service provider edit view
      if (!isEmpty(this.provider.adr_address)) {
        this.addrs = this.provider.adr_address.replace(/<[^>]*>?/gm, "");
      }
    },
  },
  mounted: function () {
    this.setAddress();
    // this is hack i dont found any other way throught pkug in if you will please resolve and  ping me as well thanks
    if (this.allowCurrentLocation && isEmpty(this.getCurrentLocation)) {
      setTimeout(() => {
        navigator.geolocation.getCurrentPosition(this.geolocate);
      }, 2000);
    } else {
      if (this.autoLoad) {
        this.addrs = this.getCurrentLocation;
      }
    }
  },
  computed: {
    ...mapGetters(["getCurrentLocation", "getCordinates"]),
  },
};
</script>
