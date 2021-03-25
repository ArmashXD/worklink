<template>
  <div>
    <footer>
      <b-row class="mid">
        <b-col>
          <nuxt-link to="/about-us">{{ getTranslation.aboutUsMenu }}</nuxt-link>
          <nuxt-link to="/terms-and-conditions">{{ getTranslation.termConditionMenu }}</nuxt-link>
          <nuxt-link to="/how-it-works">{{ getTranslation.howItsWorksMenu }}</nuxt-link>
          <nuxt-link to="/career">{{ getTranslation.careerMenu }}</nuxt-link>
        </b-col>

        <b-col class="text-right">
          <span><strong>WORKLINK</strong> © 2020-2020 </span></b-col
        >
      </b-row>
    </footer>
    <PostJob />
  </div>
</template>

<script>
import PostJob from "~/components/Common/PostJob.vue";
import { mapGetters } from "vuex";

export default {
  components: { PostJob },
  computed: {
    ...mapGetters(["getTranslation"]),
  },
};
</script>

<style lang="scss" scoped>
footer {
  background-color: #28a745;
  a,
  span {
    margin-right: 20px;
    color: white;
  }
  cc: {
  }
}
</style>