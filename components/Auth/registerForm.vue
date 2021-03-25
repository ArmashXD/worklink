<template>
  <div>
    <b-form @submit="onSubmit" @reset="onReset">
      <b-input-group class="mb-2 mr-sm-2 mb-sm-0">
        <b-input
          id="inline-form-input-name"
          :placeholder="trans.name"
          v-model="form.name"
        ></b-input>
      </b-input-group>

      <b-input-group class="mb-2 mt-2 mr-sm-2 mb-sm-0">
        <b-input
          id="inline-form-input-email"
          :placeholder="trans.email"
          v-model="form.email"
        ></b-input>
      </b-input-group>

      <b-input-group class="mb-2 mt-2 mr-sm-2 mb-sm-0">
        <b-input
          id="inline-form-input-phone"
          :placeholder="trans.mobile_number"
          v-model="form.phone"
        ></b-input>
      </b-input-group>

      <b-input-group class="mb-2 mt-2 mr-sm-2 mb-sm-0">
        <b-input
          type="password"
          id="inline-form-input-username"
          v-model="form.password"
          :placeholder="trans.password"
        ></b-input>
      </b-input-group>

      <!-- <b class="text-danger">{{responseError}}</b> -->

      <div class="text-right">
        <b-button type="submit" class="mt-2" variant="success">
          <b-spinner v-show="loading" small label="Small Spinner"></b-spinner>
          {{ trans.register }}
        </b-button>

        <a-button
          type="default "
          v-on:click="loadLoginModal"
          size="large"
          class="mt-2 align-middle"
          :disabled="loading"
          html-type="submit"
        >
          <b-spinner v-if="loading" small label="Small Spinner"></b-spinner
          >{{ trans.login }}
        </a-button>
      </div>
    </b-form>
    <ul>
      <li class="text-danger" v-for="error in errors" :key="error">
        {{ error }}
      </li>
    </ul>
  </div>
</template>

<script>
import AuthService from "~/services/Api/AuthService";
import { setAccessToken, setUserDetails } from "~/services/Auth";
import { mapState } from "vuex";
import UserService from "~/services/Api/UserServices";

export default {
  data() {
    return {
      responseError: null,
      loading: false,
      trans: this.$store.state.translation,
      errors: {},
      form: {
        name: "",
        email: "",
        phone: "",
        password: "",
      },
    };
  },
  methods: {
    loadLoginModal: function () {
      this.$bvModal.hide("registration-modal");
      this.$bvModal.show("login-modal");
    },
    onSubmit: function (e) {
      e.preventDefault();
      this.register(this.form);
    },
    getUserDetails() {
      UserService.detail()
        .then((user) => {
          setUserDetails(user);
          this.$store.commit("setUser", user);
        })
        .then(() => this.$router.go());
    },
    onReset: function () {
      this.form.name = null;
      this.form.email = null;
      this.form.phone = null;
      this.form.password = null;
    },

    register: function (params = {}) {
      this.loading = true;
      AuthService.registerSms(params)
        .then((response) => {
          this.onReset();
          this.$bvModal.hide("registration-modal");
          if (response.otp_required) {
            this.$emit("verify-otp", {
              user_id: response.id,
              id: response.id,
              otp_id: response.otp_id,
            });
          } else {
            setAccessToken(response.access_token);
            this.$store.commit("authStatus", {
              token: response.access_token,
              status: true,
            });
            this.getUserDetails();
            this.$notification.open({
              message: "Registration",
              description: response.message,
              class: "successNotification",
            });
          }
        })
        .catch((e) => {
          this.errors = e.response.data.errors;
          this.onReset();
          this.responseError = "Invalid input";
        })
        .then(() => (this.loading = false));
    },
  },
};
</script>
