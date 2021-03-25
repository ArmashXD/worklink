<template>
  <div>
    <client-only>
      <Header />
    </client-only>
    <a-alert type="success" show-icon>
      <span slot="description">
        Call/whatsapp us get your ad posted for free
        <b class="text-success">03130225789</b>
      </span>
    </a-alert>
    <nuxt />
    <Footer />
  </div>
</template>
<script>
import Header from "~/components/Layouts/_header.vue";
import Footer from "~/components/Layouts/_footer.vue";
import SettingService from "~/services/Api/SettingService";

export default {
  components: {
    Header,
    Footer,
  },
  methods: {
    getSettings() {
      SettingService.all()
        .then((response) => {
          this.$store.commit("setSettings", response);
        })
        .catch((e) => {});
    },
  },
  mounted() {
    this.getSettings();
  },
};
</script>
