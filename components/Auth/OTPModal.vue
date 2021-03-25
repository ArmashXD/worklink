<template>
  <b-modal
    centered
    ref="otp-modal"
    id="otp-modal"
    :no-close-on-backdrop="true"
    :no-close-on-esc="true"
    hide-footer
    title="OTP, Please insert the pin which received on Mobile"
  >
    <OTPForm :id="id" :user="user" />
  </b-modal>
</template>

<script>
import AuthService from "~/services/Api/AuthService";
import OTPForm from "~/components/Auth/OTPForm";

export default {
  components: { OTPForm },
  data() {
    return {
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

  methods: {},
};
</script>
