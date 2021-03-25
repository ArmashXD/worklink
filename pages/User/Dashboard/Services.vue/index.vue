<template>
  <div>
    <h2>Service list</h2>
  
  </div>
</template>
<script>
import ServiceProvider from "~/services/Api/ServiceProvider";
import PostJob from "~/components/Form/PostJob.vue";
import UploadImages from "~/components/Providers/UploadImages";
export default {
  components: { PostJob, UploadImages },
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
      showImageUpload: false
    };
  },
  methods: {
    getServices() {
      this.loading = true;
      ServiceProvider.user().then(services => {
        this.services = services;
        this.loading = false;
      });
    },
    edit(id) {
      this.visible = true;
      this.loading = true;
      this.getService(id);
    },
    getService(id) {
      ServiceProvider.get(id)
        .then(service => {
          this.provider = service;
        })
        .then(() => {
          this.loading = false;
          this.showprovider = true;
        });
    },
    destory(id) {
      ServiceProvider.destory(id).then(services => {
        this.$notification.open({
          message: "Delete",
          description: "Your Service Has Been deleted",
          class: "successNotification"
        });
        this.getServices();
      });
    },
    galery(id) {
      ServiceProvider.serviceFileList(id)
        .then(fileList => {
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
    }
  },
  mounted() {
    this.getServices();
  }
};
</script>