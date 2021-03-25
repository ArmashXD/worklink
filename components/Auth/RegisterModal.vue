<template>
  <span>
    <b-modal
      centered
      ref="registration-modal"
      id="registration-modal"
      hide-footer
      :title="trans.register"
    >
      <RegisterForm @verify-otp="verifyOtp" />
    </b-modal>
    <OTPModal :id="id" :user="user" />
  </span>
</template>

<script>
import RegisterForm from "~/components/Auth/registerForm";
import OTPModal from "./OTPModal";

export default {
  components: { OTPModal, RegisterForm },
  data() {
    return {
      id: null,
      user: null,
      trans: this.$store.state.translation,
    };
  },
  methods: {
    verifyOtp(user) {
      this.id = user.id;      
      this.user = user;
      this.$bvModal.show("otp-modal");
    },
  },
};
</script>
