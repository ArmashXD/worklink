<template>
  <b-navbar class="green-header" toggleable="lg">
    <b-navbar-brand href="/">
      AYS
      <small class="text-success">Service Provider</small>
    </b-navbar-brand>
    <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

    <b-collapse id="nav-collapse" is-nav>
      <!-- Right aligned nav items -->
      <b-navbar-nav class="ml-auto">
       
       <AuthButtons />
        <b-nav-item-dropdown text="EN" right>
          <b-dropdown-item href="#">EN</b-dropdown-item>
          <b-dropdown-item href="#">UR</b-dropdown-item>
        </b-nav-item-dropdown>
      </b-navbar-nav>
    </b-collapse>
    <PostJob />
  </b-navbar>
</template>

<script>
import RegisterModal from "~/components/Auth/RegisterModal.vue";
import PostJob from "~/components/Common/PostJob.vue";
import AuthButtons from "~/components/Auth/AuthButtons.vue";

export default {
  components: { RegisterModal, AuthButtons, PostJob },
  data() {
    return {
      isAuthenticated: this.$store.state.status
    };
  },
  methods: {
    postjob: function() {
      this.$bvModal.show("post-job-modal");
    }
  }
};
</script>