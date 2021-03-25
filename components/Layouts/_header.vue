<template>
  <b-navbar class="header" toggleable="lg">
    <b-navbar-brand>
      <nuxt-link class="text-dark" to="/">
        <a-icon style="font-size: 28px" type="home" />
      </nuxt-link>
    </b-navbar-brand>
    <div class="d-flex flex-row order-2 order-lg-3">
          <b-navbar-nav class="flex-row">
          <b-nav-item class="px-2">
          <b-button class="btn-sm"  v-on:click="postjob" variant="success">{{
                  getTranslation.post_add
                }}</b-button>
          </b-nav-item>
          <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
          </b-navbar-nav>
        </div>
    <b-collapse id="nav-collapse" is-nav>
      <!-- Right aligned nav items -->
      <b-navbar-nav class="ml-auto navebar-header">
        <b-nav-item class="transalation-header-btn">
          <b-badge variant="success" class="navBadge">
            زبان | Language
          </b-badge>

          <b-nav-item-dropdown class="lang-dd" :text="getSelectedLanguage" right>
            <b-dropdown-item href="#" v-on:click="changeLanguage('en')"
              >ENGLISH</b-dropdown-item
            >
            <b-dropdown-item href="#" v-on:click="changeLanguage('ur')"
              >اردو</b-dropdown-item
            >
          </b-nav-item-dropdown>
        </b-nav-item>
        <ServiceDropDown />
        <AuthButtons />
        <RegisterModal />
        <LoginModal />
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
</template>

<script>
import RegisterModal from "~/components/Auth/RegisterModal.vue";
import LoginModal from "~/components/Auth/LoginModal.vue";
import AuthButtons from "~/components/Auth/AuthButtons.vue";
import ServiceDropDown from "~/components/Lookups/ServiceDropDown";
import TranslationService from "~/services/API/TranslationService";
import { isEmpty } from "~/services/Utilities";
import { mapGetters } from "vuex";
import { getUserDetails } from "~/services/Auth";

export default {
  components: { RegisterModal, LoginModal, AuthButtons, ServiceDropDown },
  data() {
    return {
      isAuthenticated: this.$store.state.status,
      trans: this.$store.getters.getTranslation,
      selected: this.$store.getters.getSelectedLanguage,
    };
  },
  mounted() {
    if (!this.selected) {
      this.$store.commit("setLanguage", "ENGLISH");
    }

    if (isEmpty(this.$store.getters.getTranslation)) {
      TranslationService.all("en")
        .then((res) => this.$store.commit("setTranslation", res))
        .catch((e) => {});
    }

    if (
      isEmpty(this.$store.getters.getUserDetails) &&
      !isEmpty(getUserDetails())
    ) {
      this.$store.commit("setUser", getUserDetails());
    }
  },
  methods: {
    postjob: function () {
      this.$bvModal.show("post-job-modal");
    },
    changeLanguage: function (locale) {
      this.$store.commit("setLanguage", locale === "en" ? "ENGLISH" : "اردو");
      TranslationService.all(locale)
        .then((res) => this.$store.commit("setTranslation", res))
        .catch((e) => {});
      // .then(() => this.$router.go());
    },
  },
  computed: {
    ...mapGetters(["getTranslation", "getSelectedLanguage", "getUserDetails"]),
  },
};
</script>
