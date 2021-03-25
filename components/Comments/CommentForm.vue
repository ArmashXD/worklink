<template>
  <div>
    <a-form :form="form" @submit="handleSubmit">
      <a-form-item class="mb-0">
        <a-textarea
          placeholder="Insert Your Comment"
          :rows="4"
          v-decorator="['comment', {
               initialValue :'', rules: [{ required: true, message: 'comment required!' }] }]"
        ></a-textarea>
      </a-form-item>

      <a-form-item class="d-none">
        <a-input
          v-decorator="['service_provider_id',{
          initialValue:providerId
        }]"
        />
      </a-form-item>

      <a-form-item>
        <a-button type="primary" class="btn-success btn" html-type="submit">Comment</a-button>
        <a-button
          type="cancel"
          class="btn-success btn ml-1"
          v-on:click="handleCancel()"
          html-type="reset"
        >Cancel</a-button>
      </a-form-item>
    </a-form>
  </div>
</template>

<script>
import CommentServices from "~/services/Api/CommentServices";
import { isEmpty } from "~/services/Utilities";
export default {
  props: ["providerId", "commentId"],
  data() {
    return {
      showPostButtom: true,
      form: this.$form.createForm(this, { name: "coordinated" }),
    };
  },
  methods: {
    postComment(params) {
      CommentServices.save(this.providerId, params)
        .then((response) => {
          this.showNotification();
          this.$emit("onClose");
        })
        .catch((e) => {
          //  alert(e.message)
        })
        .then(() => (this.loading = false));
    },
    showNotification() {
      return this.$notification.open({
        message: "Comment Post Succesfully",
      });
    },
    handleSubmit(evt) {
      evt.preventDefault();
      this.form.validateFields((err, values) => {
        if (!err) {
          if (this.commentId) {
            return this.editComment(this.commentId, values);
          }
          return this.postComment(values);
        }
      });
    },
    handleCancel() {
      this.$emit("onClose");
    },
    editComment(id, params) {
      CommentServices.edit(id, params)
        .then((response) => {
          this.showNotification();
          this.$emit("onClose");
        })
        .catch((e) => {
          //  alert(e.message)
        })
        .then(() => (this.loading = false));
    },
  },
  mounted() {},
};
</script>