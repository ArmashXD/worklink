<template>
  <span>
    <b-modal
      centered
      ref="login-modal"
      id="login-modal"
      :no-close-on-backdrop="true"
      :no-close-on-esc="true"
      hide-footer
      @hidden="modalClose"
      :title="getTitle()"
    >
      <div v-if="activeModal === 'login'">
        <LoginForm />
        <a-button
          class="float-right text-danger pr-0"
          v-on:click="tab('forget')"
          type="link"
        >Forgot a password</a-button>
      </div>

      <div v-if="activeModal === 'forget'">
        <ForgetPassword @verifyOtp="verifyOtp" />

        <a-button
          class="float-right text-success pr-0"
          v-on:click="tab('login')"
          type="link"
        >Back To Login</a-button>
      </div>

      <div v-if="activeModal === 'otp'">
        <OTPForm @afterSuccess="afterPasswordChange" :id="id" :user="user" />
      </div>

      <div v-if="activeModal === 'resetPassword'">
        <PasswordResetForm @afterSuccess="afterSuccess" :id="id" :user="user" />
      </div>
    </b-modal>
  </span>
</template>

<script>
import LoginForm from "~/components/Auth/loginForm";
import ForgetPassword from "~/components/Auth/ForgetPassword";
import OTPForm from "~/components/Auth/OTPForm";
import PasswordResetForm from "~/components/Auth/PasswordResetForm";

export default {
  components: { LoginForm, ForgetPassword, OTPForm, PasswordResetForm },
  data() {
    return {
      activeModal: "login",
      trans: this.$store.state.translation,
      id: null,
      user: null,
      title: "login",
    };
  },
  methods: {
    tab($tab) {
      this.activeModal = $tab;
    },
    modalClose() {
      this.activeModal = "login";
    },
    afterSuccess($value) {
      if ($value) {
        this.activeModal = "login";
      }
    },
    afterPasswordChange($value) {
      if ($value) {
        this.activeModal = "resetPassword";
      }
    },
    getTitle() {
      switch (this.activeModal) {
        case "resetPassword":
          return "Insert your new password";
          break;
        case "forget":
          return "Insert you Number";
          break;
        case "otp":
          return "Insert the pin which recived on mobile";
          break;
        default:
          return "login";
      }
    },
    verifyOtp(user) {
      this.id = user.id;
      this.user = user;
      this.tab("otp");
    },
  },
};
</script>