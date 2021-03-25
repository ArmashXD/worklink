<template>
  <section class="bg-l-blue">
    <div class="mid">
      <article>
        <h1>Services</h1>
      </article>

      <div class="row">
        <div class="col-sm-8 clearfix job-list">
          <AdvanceSearch />
          <a-skeleton active :loading="loading"></a-skeleton>
          <JobTile
            grid="col-xs-12"
            v-for="serviceProvider in serviceProviders.data"
            :key="serviceProvider.id"
            :provider="serviceProvider"
          />
        <br>
        <Pagination :data="serviceProviders" v-on:pagination-change-page="getResult"></Pagination>
          <h2 class="text-success" v-if="serviceProviders.length <= 0 && !loading">
            !Whooops no result found please try other search filters and related posts...
          </h2>
          <br>
        </div>
        <div class="col-sm-4">
          <RelatedPost :params="params" title="New Services" />
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import RelatedPost from "~/components/Common/RelatedPost";
import JobTile from "~/components/Common/JobTile.vue";
import Search from "~/components/Pages/Home/search";
import AdvanceSearch from "~/components/Pages/Home/AdvanceSearch";
import ServiceProvider from "~/services/Api/ServiceProvider";
import { isEmpty } from "~/services/Utilities";
import Pagination from 'laravel-vue-pagination';

export default {
  components: { RelatedPost, JobTile, Search, AdvanceSearch, Pagination },
  data() {
    return {
      serviceProviders: {},
      loading: true,
      params: {},
    };
  },
  methods: {
    fetch(query={}) {
      this.loading = true;
      ServiceProvider.list(isEmpty(query) ? this.$route.query : query)
        .then((serviceProviders) => {
        this.serviceProviders = serviceProviders;
        })
        .catch((e) => {
          //  alert(e.message)
        })
        .then(() => (this.loading = false));
    },
    getResult(page = 1)
    {
       this.loading = true;
       ServiceProvider.listPaginate(page)
        .then((serviceProviders) => {
        this.serviceProviders = serviceProviders;
        })
        .catch((e) => {
          //  alert(e.message)
        })
        .then(() => (this.loading = false));
    }
},
  beforeRouteUpdate(to, from, next) {    
    this.fetch(to.query);
    
    next();
  },
  mounted: function () {
    this.fetch();
  },
};
</script>
