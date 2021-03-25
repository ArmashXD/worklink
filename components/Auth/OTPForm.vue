<template>
  <div>
    <b-form @submit="onSubmit" @reset="onReset">
      <b-input-group prepend="OTP" class="mb-2 mr-sm-2 mb-sm-0">
        <b-input id="inline-form-input-otp" v-model="form.otp"></b-input>
      </b-input-group>

      <b class="text-danger">{{responseError}}</b>

      <b-button type="submit" block class="mt-2" variant="success">
        <b-spinner v-show="loading" small label="Small Spinner"></b-spinner>Verify
      </b-button>
    </b-form>

    <div class="clearfix">
      <a-button
        class="float-right text-danger pr-0"
        :disabled="resendLoader"
        v-on:click="resendOTP"
        type="link"
      >
        <span v-if="resendLoader" small>wait for {{countDown}} to &nbsp;</span>
        Resend the OTP
      </a-button>
    </div>

    <div class="text-suceess mt-2">{{resendResponse}}</div>
  </div>
</template>

<script>
import AuthService from "~/services/Api/AuthService";

export default {
  data() {
    return {
      responseError: null,
      resendLoader: false,
      resendResponse: null,
      loading: null,
      countDown: 60,

      state_user: {},
      form: {
        otp: null,
      },
    };
  },
  props: {
    id: {
      default() {
        return this.state_user.id;
      },
    },
    user: {
      default() {
        return this.state_user;
      },
    },
  },

  methods: {
    onSubmit: function (e) {
      e.preventDefault();
      this.verify(this.form);
    },

    countDownTimer() {
      if (this.countDown > 0) {
        setTimeout(() => {
          this.countDown -= 1;
          this.countDownTimer();
        }, 1000);
      }
    },

    onReset: function () {
      this.form.otp = null;
    },

    verify: function (params = {}) {
      this.loading = true;
      let tokenParams = {};
      if (this.user.token !== undefined) {
        tokenParams = {
          token: this.useruser.token,
        };
      }
      AuthService.verify(this.id, { ...params, ...tokenParams })
        .then((response) => {
          this.$bvModal.hide("otp-modal");
          this.otpSuccess(response);
          this.$bvModal.show("login-modal");
          this.$emit("afterSuccess", true);
        })
        .catch((e) => {
          this.onReset();
          this.responseError = "Invalid code";
        })
        .then(() => (this.loading = false));
    },
    showNotification(message) {
      return this.$notification.open({
        message: message,
      });
    },
    otpSuccess(response) {
      this.onReset();
      this.showNotification(response.message);
    },
    resendOTP() {
      this.resendLoader = true;
      this.countDownTimer();

      let a = this.user.id;
      let b = this.user.otp_id;
      this.countDown = 60;
      AuthService.resendOTP(a, b)
        .then((response) => {
          this.state_user = { id: response.id, otp_id: otp_id };
          this.otpSuccess(response);
          this.resendResponse = response.message;
        })
        .catch((e) => {
          this.onReset();
          // this.responseError = "Invalid code";
        })
        .then(() => (this.loading = false));
      setTimeout(() => {
        this.resendResponse = null;
        this.resendLoader = false;
      }, 60000);
    },
  },
};
</script>
