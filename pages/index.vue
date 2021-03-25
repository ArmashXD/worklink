<template>
  <div class="main-page">
    <!--main banner-->
    <section class="main-banner d-flex h-100">
      <article class="mid w-100 p-em-2 text-center">
        <h1 class="ext-center text-capitalize">
          {{ getTranslation.home_page_first_heading }}
        </h1>
        <p class="m-auto w-75">
          {{ getTranslation.home_page_first_para }}
        </p>

        <div class="row justify-content-center align-self-centerp4 w-100 mt-4">
          <AdvanceSearch />
        </div>
      </article>
      <div class="bg-slider">
        <client-only>
          <a-carousel autoplay :dots="false" easing effect="fade">
            <div>
              <img
                src="https://api.worklink.com.pk/storage/site-content/0ebacde0-059d-11eb-90d1-91e494c7c975.png"
              />
            </div>
            <div>
              <img
                src="https://api.worklink.com.pk/storage/site-content/19f97860-059d-11eb-a89b-c10c30e1314f.png"
              />
            </div>
          </a-carousel>
        </client-only>
      </div>
    </section>
    <!--main banner-->
    <!-- <section class="bg-l-blue">
      <article class="mid">
        <h2 class="text-center">
          {{ getTranslation.feature_service_provider_heading }}
        </h2>
      </article>
      <FeatureListing />
    </section> -->

    <HowToUse />

    <section class="bg-l-blue">
      <article class="mid mb-4">
        <h2 class="text-center">
          {{ getTranslation.feature_service_provider_heading }}
        </h2>
      </article>
      <div class="mid row">
        <a-skeleton :loading="loading" class="w-100 p-2 row" active>
          <JobTile
            v-for="serviceProvider in serviceProviders"
            :key="serviceProvider.id"
            :provider="serviceProvider"
          />
        </a-skeleton>
      </div>
    </section>

    <WhyChoiceUs />
    <!-- -&-->
  </div>
</template>

<script>
import JobTile from "~/components/Common/JobTile";
import JobCard from "~/components/Common/JobCard";
import FeatureListing from "~/components/Listing/FeatureListing";
import Search from "~/components/Pages/Home/search";
import AdvanceSearch from "~/components/Pages/Home/AdvanceSearch";
import ServiceProvider from "~/services/Api/ServiceProvider";
import HowToUse from "~/components/Static/HowToUse";
import WhyChoiceUs from "~/components/Static/WhyChoiceUs";
import { mapGetters } from "vuex";
import axios from "axios";

export default {
  components: {
    JobTile,
    AdvanceSearch,
    FeatureListing,
    JobCard,
    HowToUse,
    WhyChoiceUs,
  },
  head() {
    return {
      titleTemplate: "%s - Home page",
      meta: [
        {
          name: "descirption",
          content: "Service At Your Door Step, On Your Fingertips",
        },
      ],
    };
  },
  async asyncData(context) {
    const { data } = await axios.get(ServiceProvider.getUrl("list"));

    return { serviceProviders: data.data, loading: false };
  },
  data() {
    return {
      loading: true,
      bannerBgImage: this.$store.state.settings.HomePageBannerImage,
    };
  },
  methods: {},
  mounted: function () {
    // this.getAllServiceProvier();
  },
  computed: {
    ...mapGetters(["getTranslation"]),
  },
};
</script>
