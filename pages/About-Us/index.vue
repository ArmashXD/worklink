<template>
  <div class="main-page">
    <!--main banner-->
    <section class="h-100 static-banner">
      <article class="mid w-100 text-center">
        <h1 class="heading text-capitalize">
          {{ getTranslation.aboutUsHeading }}
        </h1>
        <p class="m-auto para">
          {{ getTranslation.aboutUsHeadingPara	 }}
        </p>
      </article>
    </section>

    <section class="h-100">
      <article class="mid w-100 text-center">
        
        <p class="m-auto w-75">
        {{ getTranslation.aboutUsPara }}
        </p>
      </article>
    </section>
    <!-- -&-->
  </div>
</template>

<script>
</script>

<style lang="scss" scoped>
.static-banner {
  background-color: #28a745;
  color: white;
  .heading {
    color: white;
  }
  .para {
    max-width: 700px;
    font-size: 1.3em;
  }
}
</style>

<script>
import { mapGetters } from "vuex";
export default {
  computed: {
    ...mapGetters(["getTranslation"]),
  },
};
</script>