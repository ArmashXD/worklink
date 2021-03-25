<template>
  <section class="bg-white bg">
    <article class="mid">
      <h2 class="text-center">{{ getTranslation.why_chose_us_heading }}</h2>
      <div class="mid row text-center">
        <p class="col-12 col-sm-7">
          {{ getTranslation.why_chose_us_para }}
        </p>

        <div class="col-12 col-sm-5">
          <img
            class="img-fluid"
            alt="Why Chose us"
            src="https://api.worklink.com.pk/storage/site-content/206b2ff0-059d-11eb-a739-3f2642d56704.png"
          />
        </div>
      </div>
    </article>
  </section>
</template>

<style scoped>
.bg {
  background-image: url(https://api.worklink.com.pk/storage/site-content/54a5e6b0-f14b-11ea-8805-0fcc9a5ec7b2.png);
  background-position: 100% 0;
  background-repeat: no-repeat;
  background-size: contain;
}
</style>

<script>
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      trans: this.$store.getters.getTranslation,
    };
  },
  computed: {
    ...mapGetters(["getTranslation"]),
  },
};
</script>