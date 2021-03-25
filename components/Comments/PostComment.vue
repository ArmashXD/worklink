<template>
  <div>
    <b-button
      class="m-auto"
      v-if="showPostButtom"
      v-on:click="handlePostButtom(false)"
      variant="success"
    >Post a Comment</b-button>

    <CommentForm :providerId="providerId" @onClose="handlePostButtom(true)" v-if="!showPostButtom" />
  </div>
</template>

<script>
import CommentServices from "~/services/Api/CommentServices";
import CommentForm from "~/components/Comments/CommentForm";
import { isLoggedin } from "~/services/Auth";
export default {
  components: { CommentForm },
  props: ["providerId"],
  data() {
    return {
      showPostButtom: true,
      form: this.$form.createForm(this, { name: "coordinated" }),
    };
  },
  methods: {
    handlePostButtom(show) {
      if (show === false && !isLoggedin()) {
        return this.$bvModal.show("login-modal");
      }

      if (show) {
        this.$emit("reloadComments", show);
      }

      return (this.showPostButtom = show);
    },
  },
};
</script>