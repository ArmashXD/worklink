<template>
  <div>
    <b-button size="sm" v-on:click="showModal(true)" variant="success">
      <a-icon type="message" />
      <span>Send Message</span>
    </b-button>

    <a-modal destroyOnClose footer v-model="visible" title="Send message">
      <a-form :form="form" :wrapper-col="{ span: 24 }" @submit="handleSubmit">
        <a-form-item>
          <a-textarea
            allowClear
            placeholder="Type your message"
            v-decorator="['message', {               
               rules: [{ required: true, message: 'message required!' }] }]"
          />
        </a-form-item>

        <a-form-item>
          <b-button variant="success" class="btn btn-block" type="submit">Submit</b-button>
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>

<script>
import NotificationService from "~/services/Api/NotificationService";
import {isLoggedin} from "~/services/Auth";

export default {
  props: ["provider"],
  data() {
    return {
      visible: false,
      formLayout: "horizontal",
      form: this.$form.createForm(this, { name: "message" })
    };
  },
  methods: {
    showModal(show) {
      if(!isLoggedin())
      {
        return this.$bvModal.show("login-modal");
      }
      else{
        this.visible = show;
      }
    },
    handleSubmit(e) {
      e.preventDefault();
      this.form.validateFields((err, values) => {
        if (!err) {
          this.sendNotification(values);
        }
      });
    },
    sendNotification(values) {
      NotificationService.send(this.provider.id, values).then(() => {
        this.showModal(false);
      });
    }
  }
};
</script>