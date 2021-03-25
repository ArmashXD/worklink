<template>
  <div>
    <a-form :form="form" :label-col="{ span:8 }" :wrapper-col="{ span: 16 }" @submit="onSubmit">
      <a-form-item class label="New Password">
        <a-input
          type="password"
          placeholder="*********"
          v-decorator="['password', {            
               rules: [{ required: true, message: 'Please insert the password' }] }]"
        />
      </a-form-item>
      <a-form-item class="p-0 m-0" :wrapper-col="{ span: 24, offset: 0 }">
        <a-button
          type="primary"
          class="float-right primary-btn"
          :disabled="loading"
          html-type="submit"
        >
          <b-spinner v-if="loading" small label="Small Spinner"></b-spinner>Submit
        </a-button>
      </a-form-item>
    </a-form>
    <ul>
      <li class="text-danger" v-for="error in errors" :key="error">{{error}}</li>
    </ul>
    <!-- <a-button class="float-right text-danger pr-0" type="link">Forget a password</a-button> -->
  </div>
</template>

<script>
import AuthService from "~/services/Api/AuthService";
export default {
  data() {
    return {
      errors: null,
      loading: false,
      form: this.$form.createForm(this, { name: "resetPassword" }),
    };
  },
  props: {
    user: {
      default() {
        return {};
      },
    },
  },
  methods: {
    onSubmit(e) {
      e.preventDefault();
      this.form.validateFields((err, values) => {
        if (!err) {
          this.resetPassword({
            token: this.user.payload.token,
            phone: this.user.payload.phone,
            ...values,
            ...this.user,
          });
        }
      });
    },
    resetPassword(params) {
      AuthService.resetPassword(params).then(() => {
        this.$emit("afterSuccess", true);
      });
    },
  },
};
</script>
