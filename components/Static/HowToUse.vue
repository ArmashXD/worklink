<template>
  <section class="bg-white how-to-use">
    <article class="mid">
      <h2 class="text-center mb-5">
        {{ getTranslation.how_to_use_mainHeading }}
      </h2>
    </article>
    <div class="mid row text-center">
      <div class="col-12 col-sm-3">
        <h4>{{ getTranslation.find_services_heading }}</h4>
        <img
          src="https://api.worklink.com.pk/storage/site-content/8f158090-29d8-11eb-9bc1-eba6125c18c3.svg"
          alt="How To Use"
        />
        <p>
          {{ getTranslation.find_services_para }}
        </p>
      </div>
      <div class="col-12 col-sm-3">
        <h4>{{ getTranslation.login_or_registration_heading }}</h4>
        <img
          src="https://api.worklink.com.pk/storage/site-content/88f1c600-29d8-11eb-807f-87d9b8209ddd.svg"
          alt="How To Use"
        />
        <p>
          {{ getTranslation.login_or_registration_para }}
        </p>
      </div>
      <div class="col-12 col-sm-3">
        <h4>{{ getTranslation.login_or_registration_heading_3 }}</h4>
        <img
          src="https://api.worklink.com.pk/storage/site-content/1be2df40-29d8-11eb-965c-234d374ba578.svg"
          alt="How To Use"
        />
        <p>
          {{ getTranslation.login_or_registration_para_3 }}
        </p>
      </div>
      <div class="col-12 col-sm-3">
        <h4>{{ getTranslation.login_or_registration_heading_4 }}</h4>
        <img
          src="https://api.worklink.com.pk/storage/site-content/8119ded0-29d8-11eb-9d40-bfed39cfaa52.svg"
          alt="How To Use"
        />
        <p>
          {{ getTranslation.login_or_registration_para_4 }}
        </p>
      </div>
    </div>
  </section>
</template>
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

<style lang="scss" >
.how-to-use {
  h4 {
    font-size: 17px;
  }
  .mid.row.text-center.how-to-use p {
    padding-top: 15px;
    color: #b3afaf;
    text-align: center;
  }
  img {
    width: 130px;
  }
}
</style>