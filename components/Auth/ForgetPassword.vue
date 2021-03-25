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
                { required: true, message: 'Please insert the phone number' },
              ],
            },
          ]"
        />
      </a-form-item>
      <a-form-item class="p-0 m-0" :wrapper-col="{ span: 24, offset: 0 }">
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
    <ul>
      <li class="text-danger" v-for="error in errors" :key="error">
        {{ error }}
      </li>
    </ul>
  </div>
</template>

<script>
import AuthServices from "~/services/Api/AuthService";
export default {
  data() {
    return {
      form: this.$form.createForm(this, { name: "forgetPassword" }),
      errors: {},
      loading: false,
    };
  },
  methods: {
    onSubmit(e) {
      e.preventDefault();
      this.form.validateFields((err, values) => {
        if (!err) {
          this.forget({ ...values });
        }
      });
    },
    forget(values) {
      this.loading = true;
      AuthServices.forgetpassword(values)
        .then((response) => {
          this.$emit("verifyOtp", {
            user_id: response.id,
            id: response.id,
            otp_id: response.otp_id,
            payload: response,
          });
        })
        .catch((e) => {
          if (e.response.status === 404) {
            this.errors = e.response.data.message;
          }
          this.loading = false;
        });
    },
  },
};
</script>
