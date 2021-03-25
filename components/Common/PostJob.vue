<template>
  <b-modal id="post-job-modal" size="lg" centered hide-footer>
    <template v-slot:modal-title>{{
      showImageUpload ? "Upload Servcice Images" : "Post a Service"
    }}</template>
    <div v-if="!showImageUpload">
      <PostJob @onCompelete="onClose" v-if="auth()" />
      <LoginForm v-else />
    </div>

    <UploadImages
      :provider="provider"
      @closeEmit="closeImageContainer"
      v-if="showImageUpload"
    />
  </b-modal>
</template>
<script>
import PostJob from "~/components/Form/PostJob";
import UploadImages from "~/components/Providers/UploadImages";
import LoginForm from "~/components/Auth/loginForm";
import { isLoggedin } from "~/services/Auth";
export default {
  components: { PostJob, LoginForm, UploadImages },
  data() {
    return {
      showImageUpload: false,
      provider: null,
    };
  },
  computed: {
    isAuth: function () {
      return this.$store.state.status;
    },
  },
  methods: {
    closeImageContainer() {
      this.boot();
    },
    onClose(provider) {
      this.provider = provider;
      this.showImageUpload = true;
      // this.$bvModal.hide("post-job-modal");
    },
    auth() {
      return isLoggedin();
    },

    boot() {
      this.showImageUpload = false;
      this.provider = null;
    },
  },

  mounted() {
    this.boot();
  },
};
</script>