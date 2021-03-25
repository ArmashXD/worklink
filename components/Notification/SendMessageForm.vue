<template>
  <div>
    <a-form :form="form" :wrapper-col="{ span: 24 }" @submit="handleSubmit">
      <a-form-item  class="form-container mt-2 pb-0 mb-0">
        <a-textarea
          allowClear
          placeholder="Type your message"
          v-decorator="[
            'message',
            {
              rules: [{ required: true, message: 'message required!' }],
            },
          ]"
        />
      </a-form-item>

      <a-form-item class="button-container">
        <b-button
          variant="success"
          :disable="!loading"
          class="btn"
          type="submit"
        >
          <b-spinner v-show="loading" small label="Small Spinner"></b-spinner
          >Submit
        </b-button>
      </a-form-item>
    </a-form>
  </div>
</template>

<script>
import NotificationService from "~/services/Api/NotificationService";
const recipientId = "recipientId";
export default {
  props: [recipientId],
  data() {
    return {
      formLayout: "horizontal",
      form: this.$form.createForm(this, { name: "message" }),
      loading: false,
    };
  },
  methods: {
    handleSubmit(e) {
      e.preventDefault();
      this.form.validateFields((err, values) => {
        if (!err) {
          this.sendNotification(values);
        }
      });
    },
    sendNotification(values) {
      NotificationService.userMessage(this.recipientId, values)
        .then(() => {
          this.$emit("close", this.recipientId);
          this.form.resetFields();
        })
        .then(() => (this.loading = false));
    },
  },
};
</script>