<template>
  <section class="bg-l-blue detail-page">
    <div class="mid">
      <article>
        <h1>{{ provider.name }}</h1>
      </article>
      <div class="row">
        <div class="col-md-8 row m-0 p-0">
          <a-skeleton :loading="loading" class="row p-0 m-0 col-12" active>
            <!-- Service Provider Details -->
            <div class="col-sm-4">
              <!-- <b-img thumbnail fluid src="https://picsum.photos/250/250/?image=54" alt="Image 1"></b-img> -->
           <div class="col-12 clearfix m-0 p-0">
                <a-avatar
                class="float-left"
                :size="230"
                :src="providerImage()"
                shape="square"
                icon="user"
              />
           </div>
              <!-- move this into some component  -->
              <div class="mt-2 col-12">
                <h5><a-icon type="tags" theme="filled" />Services Tags</h5>
                <b-badge
                  v-for="tag in provider.service_tag"
                  :key="tag.id"
                  class="mr-1"
                  variant="success"
                  >#{{ tag.name }}</b-badge
                >
              </div>
              <!-- move this into some component  -->
            </div>
            <div class="col-sm-8">
              <Details :provider="provider" />
            </div>
          </a-skeleton>
          <!-- Service Provider Details -->

          <!-- Comment section -->
          <div class="col-12 detail-page">
            <div v-if="!loading">
              <Carousel :providerId="provider.id" />
            </div>

            <div class>
              <a-skeleton :loading="loading" class active>
                <Comments
                  @getCommentReload="getCommentReload"
                  :providerId="provider.id"
                />
              </a-skeleton>
            </div>

            <div class="text-center">
              <hr />
              <PostComment
                @reloadComments="reloadComments"
                :providerId="provider.id"
              />
            </div>
          </div>
          <!-- Comment section -->
        </div>

        <!-- --@todo Related Service component get Service array adns hwo related ---- -->
        <div class="col-md-4 related-services">
          <a-skeleton :loading="loading" class="w-100" active>
            <RelatedPost :params="params" v-if="showRelatedPost" />
          </a-skeleton>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import ServiceProvider from "~/services/Api/ServiceProvider";
import JobTile from "~/components/Common/JobTile.vue";
import Details from "~/components/Providers/_details.vue";
import Carousel from "~/components/Providers/Carousel.vue";
import Comments from "~/components/Comments";
import PostComment from "~/components/Comments/PostComment";
import RelatedPost from "~/components/Common/RelatedPost";
import List from "~/components/Listing/List";
import axios from "axios";

export default {
  components: {
    PostComment,
    JobTile,
    Details,
    Comments,
    RelatedPost,
    Carousel,
    List,
  },
  data() {
    return {
      showRelatedPost: false,
      provider: {},
      loading: false,
      getreloadComments: null,
    };
  },
  head() {
    return {
      titleTemplate:
        "%s " + this.provider.name + "" + this.provider.description,
      meta: [{ name: "descirption", content: this.provider.description }],
    };
  },
  async asyncData(context) {
    const { data } = await axios.get(
      ServiceProvider.getUrl(`show/${context.params.id}`)
    );
    let params = {
      service_id: data.services.map((s) => s.id),
      exclude_id: [data.id],
    };
    return { provider: data, params: params, showRelatedPost: true };
  },
  methods: {
    fetch() {
      this.loading = true;
      ServiceProvider.get(this.$route.params.id)
        .then((provider) => {
          this.provider = provider;
          this.params = {
            service_id: provider.services.map((s) => s.id),
            exclude_id: [provider.id],
          };
          this.showRelatedPost = true;
        })
        .then(() => (this.loading = false));
    },
    providerImage() {
      return this.provider.user === undefined
        ? null
        : this.provider.user.image_url;
    },
    getCommentReload(callback) {
      this.getreloadComments = callback;
    },
    reloadComments(reload) {
      if (reload && typeof this.getreloadComments === "function") {
        this.getreloadComments();
      }
    },
  },
  mounted: function () {
   
  },
};
</script>

<style lang="scss">
.related-services .job-tile .shadow {
  border: 1px solid #e6e6e6;
  box-shadow: none !important;
}
</style>