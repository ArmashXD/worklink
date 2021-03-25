<template>
  <div>
    <a-list
      class="demo-loadmore-list"
      :loading="loading"
      item-layout="horizontal"
      :data-source="services"
    >
      <a-list-item slot="renderItem" slot-scope="item">
        <a v-on:click="galery(item.id)" slot="actions">Galery</a>
        <a v-on:click="edit(item.id)" slot="actions">Edit</a>
        <a slot="actions">
          <a-popconfirm
            title="Are you sure delete this task?"
            ok-text="Yes"
            cancel-text="No"
            @confirm="destory(item.id)"
          >
            <a href="#">Delete</a>
          </a-popconfirm>
        </a>
        <a-list-item-meta :description="item.description">
          <a slot="title" :href="item.url"
            >{{ item.name }}
            <b-badge
              class="mr-2"
              :variant="item.active ? 'success' : 'danger'"
              >{{ item.active ? "active" : "pending" }}</b-badge
            >
            <span class="rating-span">
              <Rating :isDisable="true" :initial="item.total_rating"
            /></span>

            <span class="float-right">
              <b-badge
                class="mr-2"
                v-for="s in item.services"
                :key="s.id"
                variant="success"
                >{{ s.name }}</b-badge
              >
            </span>
          </a>
        </a-list-item-meta>
      </a-list-item>
    </a-list>
    <a-modal
      width="80%"
      title="update Service"
      v-model="visible"
      :confirm-loading="confirmLoading"
      @cancel="onClose"
      footer
    >
      <a-skeleton :loading="loading" active>
        <PostJob
          :provider="provider"
          @onCompelete="onClose"
          v-if="showprovider"
        />
        <UploadImages
          v-if="showImageUpload"
          @closeEmit="onClose"
          :provider="provider"
          :fList="fileList"
        />
      </a-skeleton>
    </a-modal>
  </div>
</template>

<script>
import ServiceProvider from "~/services/Api/ServiceProvider";
import PostJob from "~/components/Form/PostJob.vue";
import Rating from "~/components/Providers/_rating";
import UploadImages from "~/components/Providers/UploadImages";
import UserService from "~/services/Api/UserServices";
import { getUserDetails } from "~/services/Auth";
export default {
  components: { PostJob, UploadImages, Rating },
  middleware: "authenticated",
  layout: "dashboard",
  data() {
    return {
      fileList: [],
      previewVisible: false,
      previewImage: "",
      services: [],
      loading: true,
      visible: false,
      confirmLoading: true,
      provider: {},
      showprovider: false,
      showImageUpload: false,
    };
  },
  methods: {
    getServices() {
      this.loading = true;

      UserService.serviceProvide(getUserDetails().id).then((services) => {
        this.services = services.data;
        this.$emit("getdata", this.services);
      });
      this.loading = false;
      // ServiceProvider.user().then((services) => {
      //   this.services = services;

      //   this.loading = false;
      // });
    },
    edit(id) {
      this.visible = true;
      this.loading = true;
      this.getService(id);
    },
    getService(id) {
      ServiceProvider.get(id)
        .then((service) => {
          this.provider = service;
        })
        .then(() => {
          this.loading = false;
          this.showprovider = true;
        });
    },
    destory(id) {
      ServiceProvider.destory(id).then((services) => {
        this.$notification.open({
          message: "Delete",
          description: "Your Service Has Been deleted",
          class: "successNotification",
        });
        this.getServices();
      });
    },
    galery(id) {
      ServiceProvider.serviceFileList(id)
        .then((fileList) => {
          this.fileList = fileList;
        })
        .then(() => {
          this.visible = true;
          this.showImageUpload = true;
          this.provider = { id };
        });
    },
    onClose() {
      this.previewVisible = false;
      this.visible = false;
      this.showprovider = false;
      this.showImageUpload = false;
      this.getServices();
    },
  },
  mounted() {
    this.getServices();
  },
};
</script>
 <style lang="scss">
.rating-span {
  margin-left: 15px;
  .ant-rate {
    font-size: 14px;
  }
}
</style>