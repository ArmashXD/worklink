<template>
  <div class="clearfix">
    <a-upload
      list-type="picture-card"
      :file-list="fileList"
      @preview="handlePreview"
      @change="handleChange"
      :remove="deleteImage"
      :customRequest="dummyRequest"
    >
      <div v-if="fileList.length < 2">
        <a-icon type="plus" />
        <div class="ant-upload-text">Upload</div>
      </div>
    </a-upload>
    <a-modal :visible="previewVisible" :footer="null" @cancel="handleCancel">
      <img alt="example" style="width: 100%" :src="previewImage" />
    </a-modal>

    <div class="text-right">
      <a-button type="primary" v-on:click="close">Done</a-button>
    </div>
  </div>
</template>
<script>
import ServiceProvider from "~/services/Api/ServiceProvider";
import { isEmpty } from "~/services/Utilities";
function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
}

export default {
  props: ["provider", "fList"],

  data() {
    return {
      previewVisible: false,
      previewImage: "",
      fileList: []
    };
  },
  methods: {
    handleCancel() {
      this.previewVisible = false;
    },
    async handlePreview(file) {
      if (!file.url && !file.preview) {
        file.preview = await getBase64(file.originFileObj);
      }

      this.previewImage = file.url || file.preview;
      this.previewVisible = true;
    },
    handleChange(f) {
      // this.fileList = f.fileList;
    },
    geturl(f) {},

    dummyRequest(f) {
      let formData = new FormData();
      formData.append("file", f.file);

      ServiceProvider.uploadImageUrl(this.provider.id, formData).then(f => {
        this.fileList = [...this.fileList, f];
      });
      setTimeout(() => {
        f.onSuccess("ok");
      }, 0);
    },
    close() {
      this.$bvModal.hide("post-job-modal");
      this.$notification.open({
        message: "Job Post",
        description: "Your add is now pending approval and will be live soon",
        class: "successNotification"
      });
      this.$emit("closeEmit");
    },
    getServiceFileList() {},
    deleteImage(id) {
      ServiceProvider.removeServiceImage(id.uid).then(f => {
        this.fileList = this.fileList.filter(f => f.uid !== id.uid).map(f => f);
      });
    }
  },
  mounted() {
    if (!isEmpty(this.fList)) {
      this.fileList = this.fList;
    }
  }
};
</script>
<style>
/* you can make up upload button and sample style by using stylesheets */
.ant-upload-select-picture-card i {
  font-size: 32px;
  color: #999;
}

.ant-upload-select-picture-card .ant-upload-text {
  margin-top: 8px;
  color: #666;
}

.successNotification {
  background-color: #28a745 !important;
  color: white;
}
.successNotification .ant-notification-notice-message {
  color: white;
}
</style>
