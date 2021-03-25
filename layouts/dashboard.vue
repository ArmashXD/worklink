<template>
  <div>
    <client-only>
      <Header />
    </client-only>
    <div class="dashboard">
      <a-layout id="components-layout-demo-custom-trigger">
        <a-layout-content
          :style="{
            margin: '0px 16px',
            padding: '24px',
            minHeight: '280px',
          }"
        >
          <nuxt />
        </a-layout-content>
      </a-layout>
    </div>
    <Footer />
  </div>
</template>
<script>
import Header from "~/components/Layouts/_header.vue";
import Footer from "~/components/Layouts/_footer.vue";
import { mapGetters } from "vuex";

export default {
  components: {
    Header,
    Footer,
  },
  data() {
    return {
      collapsed: false,
      user: this.$store.getters.getUserDetails,
    };
  },
  computed: {
    ...mapGetters(["getUserDetails"]),
  },
};
</script>

<style>
#components-layout-demo-custom-trigger .trigger {
  font-size: 17px;
  line-height: 1px;
  padding: 5px 0;
  cursor: pointer;
  transition: color 0.3s;
  display: block;
  float: right;
}

#components-layout-demo-custom-trigger .trigger:hover {
  color: #1890ff;
}

#components-layout-demo-custom-trigger .logo {
  padding: 0;
  text-align: center;
  margin: 8px 0 0 0;
  color: white;
}
#components-layout-demo-custom-trigger .heading {
  color: white;
  margin: 0;
}
/* #components-layout-demo-custom-trigger .ant-layout-sider {
  background-color: white;
} */

#components-layout-demo-custom-trigger {
  padding: 0;
}
</style>



