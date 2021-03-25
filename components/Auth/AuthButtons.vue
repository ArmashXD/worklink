<template>
  <span style="display: inherit">
    <b-nav-item v-if="!isAuth">
      <b-button
        class="btn-sm"
        v-b-modal.login-modal
        variant="outline-success"
        >{{ getTranslation.login }}</b-button
      >
      <b-button
        class="btn-sm"
        v-b-modal.registration-modal
        variant="outline-success"
        >{{ getTranslation.register }}</b-button
      >
    </b-nav-item>

    <b-nav-item-dropdown
      class="btn-sm"
      :text="username.name"
      v-if="isAuth"
      right
    >
      <b-dropdown-item>
        <nuxt-link class="link btn-sm d-block" to="/user/dashboard/profile">{{
          getTranslation.profile
        }}</nuxt-link>
      </b-dropdown-item>
      <b-dropdown-item>
        <nuxt-link class="link btn-sm d-block" to="/user/messages">
          Messages
          <!-- {{trans.message}} -->
        </nuxt-link>
      </b-dropdown-item>
      <b-dropdown-item>
        <b-button
          class="link btn-sm d-block"
          v-on:click="logout()"
          variant="link"
          >{{ getTranslation.logout }}</b-button
        >
      </b-dropdown-item>
    </b-nav-item-dropdown>

    <b-nav-item style="display: flex; float: left" v-if="isAuth" href="#">
      <MenuItem />
    </b-nav-item>
  </span>
</template>

<script>
import AuthServices from "~/services/Api/AuthService";
import MenuItem from "~/components/Notification/MenuItem";
import { isEmpty } from "~/services/Utilities";
import { mapGetters } from "vuex";
import {
  setAccessToken,
  setRefreshToken,
  getUserDetails,
} from "~/services/Auth";
export default {
  components: { MenuItem },
  data() {
    return {
      isAuthenticated: false,
      visible: false,
      trans: this.$store.state.translation,
      user: this.$store.state.user.name,
    };
  },
  methods: {
    logout: function () {
      setRefreshToken(null);
      setAccessToken(null);
      localStorage.clear();
      this.$store.commit("authStatus", {});
      this.$store.commit("setUserDetails", {});
      return (window.location = "/");
    },
  },
  computed: {
    isAuth: function () {
      return !isEmpty(getUserDetails());
    },
    username: function () {
      this.user = getUserDetails();
      return getUserDetails();
    },
    ...mapGetters(["getTranslation"]),
  },
};
</script>
