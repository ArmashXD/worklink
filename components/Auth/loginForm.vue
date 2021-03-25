<template>
  <div>
    <a-form
      :form="form"
      :label-col="{ span: 8 }"
      :wrapper-col="{ span: 16 }"
      @submit="onSubmit"
    >
      <a-form-item label="Cell phone login">
        <a-input
          placeholder="e.g 030012345678"
          v-decorator="[
            'phone',
            {
              rules: [
                { required: true, message: 'Please insert the phone number' }
              ]
            }
          ]"
        />
      </a-form-item>
      <a-form-item class label="Password">
        <a-input
          type="password"
          placeholder="*********"
          v-decorator="[
            'password',
            {
              rules: [{ required: true, message: 'Please insert the password' }]
            }
          ]"
        />
      </a-form-item>
      <a-form-item
        class="p-0 m-0 text-right"
        :wrapper-col="{ span: 24, offset: 0 }"
      >
        <a-button
          type="default "
          class="float-right ml-1"
          :disabled="loading"
          html-type="button"
          v-on:click="loadLoginModal"
        >
          <b-spinner v-if="loading" small label="Small Spinner"></b-spinner
          >Registration
        </a-button>
        <a-button
          type="primary"
          class="float-right primary-btn"
          :disabled="loading"
          html-type="submit"
        >
          <b-spinner v-if="loading" small label="Small Spinner"></b-spinner
          >Submit
        </a-button>
      </a-form-item>
    </a-form>
    <div class="text-success">{{ successResponse }}</div>
    <ul>
      <li class="text-danger" v-for="error in errors" :key="error">
        {{ error }}
      </li>
    </ul>
    <social-login />
    <!-- <a-button class="float-right text-danger pr-0" type="link">Forget password ?</a-button> -->
  </div>
</template>

<script>
import AuthServices from "~/services/Api/AuthService";
import UserService from "~/services/Api/UserServices";
import {
  setUserDetails,
  setAccessToken,
  setRefreshToken,
  getAccessToken
} from "~/services/Auth";
import { mapState } from "vuex";
import {
  CLIENT_ID,
  CLIENT_SECRET,
  GRANT_TYPE,
  BASE_URL
} from "~/services/Constant";
import SocialLogin from "./SocialLogin.vue";

export default {
  components: { SocialLogin },
  data() {
    return {
      SocialLoginresponseError: null,
      loading: false,
      trans: this.$store.state.translation,
      form: this.$form.createForm(this, { name: "coordinated" }),
      errors: {},
      successResponse: null
    };
  },
  methods: {
    loadLoginModal: function() {
      this.$bvModal.hide("login-modal");
      this.$bvModal.show("registration-modal");
    },
    /** */
    onSubmit: function(e) {
      e.preventDefault();
      this.form.validateFields((err, values) => {
        if (!err) {
          let client = {
            client_id: CLIENT_ID,
            client_secret: CLIENT_SECRET,
            grant_type: GRANT_TYPE
          };
          this.login({ ...values, ...client });
        }
      });
    },

    onReset: function() {
      this.form.username = null;
      this.form.password = null;
    },

    login: function(params = {}) {
      this.loading = true;
      AuthServices.login(params)
        .then(response => {
          const token = response.refresh_token;
          setRefreshToken(token);
          setAccessToken(response.access_token);
          this.$store.commit("authStatus", {
            token: response.access_token,
            status: true
          });
          // this.$bvModal.hide("login-modal");
          this.getUserDetails();
          this.successResponse = "Login sucessful";
          this.onReset();
        })
        .catch(e => {
          if (e.code === 401) {
          }
          this.onReset();
          this.errors = e.response.data.errors;
        })
        .then(() => (this.loading = false));
    },
    getUserDetails() {
      UserService.detail()
        .then(user => {
          setUserDetails(user);
          this.$store.commit("setUser", user);
        })
        .then(() => this.$router.go());
    }
  }
};
</script>
