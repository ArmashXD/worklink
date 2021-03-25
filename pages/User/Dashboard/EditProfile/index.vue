<template>
  <div>
    <div class="clearfix">
      <a-upload
        name="avatar"
        list-type="picture-card"
        class="avatar-uploader"
        :show-upload-list="false"
        :before-upload="beforeUpload"
        @change="handleChange"
        :customRequest="dummyRequest"
      >
        <img v-if="imageUrl" :src="imageUrl" class="preview-dp" alt="avatar" />
        <div v-else>
          <a-icon :type="loading ? 'loading' : 'plus'" />
          <div class="ant-upload-text">Upload</div>
        </div>
      </a-upload>

      <a-modal :visible="previewVisible" :footer="null" @cancel="handleCancel">
        <img alt="example" style="width: 100%" :src="previewImage" />
      </a-modal>
    </div>
    <div>
      <a-form :form="form" :label-col="{ span: 5 }" :wrapper-col="{ span: 12 }">
        <a-form-item label="Name">
          <a-input
            v-decorator="['name', {
                initialValue :this.user.name,
                 rules: [{ required: true, message: 'Please input your name!' }] }]"
          />
        </a-form-item>
        <a-form-item label="phone">
          <a-input
            disabled
            v-decorator="['phone', {
                initialValue :this.user.phone,
                 rules: [{ required: true, message: 'Please input your note!' }] }]"
          />
        </a-form-item>
        <a-form-item :wrapper-col="{ span: 12, offset: 5 }">
          <a-button type="primary" html-type="submit">Submit</a-button>
        </a-form-item>
      </a-form>
    </div>
  </div>
</template>
<script>
import UserService from "~/services/Api/UserServices";
function getBase64(img, callback) {
  const reader = new FileReader();
  reader.addEventListener("load", () => callback(reader.result));
  reader.readAsDataURL(img);
}
export default {
  middleware: "authenticated",
  layout: "dashboard",
  data() {
    return {
      user: [],
      fileList: [],
      previewVisible: false,
      previewImage: "",
      form: this.$form.createForm(this, { name: "profile" }),
      loading: false,
      imageUrl: "",
    };
  },
  methods: {
    handleCancel() {
      this.previewVisible = false;
    },
    handleChange(info) {
      if (info.file.status === "uploading") {
        this.loading = true;
        return;
      }
      if (info.file.status === "done") {
        // Get this url from response in real world.
        getBase64(info.file.originFileObj, (imageUrl) => {
          this.imageUrl = imageUrl;
          this.loading = false;
        });
      }
    },
    beforeUpload(file) {
      const isJpgOrPng =
        file.type === "image/jpeg" || file.type === "image/png";
      if (!isJpgOrPng) {
        this.$message.error("You can only upload JPG file!");
      }
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isLt2M) {
        this.$message.error("Image must smaller than 2MB!");
      }
      return isJpgOrPng && isLt2M;
    },
    dummyRequest(f) {
      let formData = new FormData();
      formData.append("file", f.file);
      UserService.uploadDp(formData).then((f) => {
        this.$notification.open({
          message: "Image Upload",
          description: "Your image has been uploaded",
          class: "success-notification",
        });
      });
      setTimeout(() => {
        f.onSuccess("ok");
      }, 0);
    },
    getUserDetails() {
      UserService.detail().then((user) => {
        this.imageUrl = user.image_url;
        this.user = user;
      });
    },
  },
  mounted() {
    this.getUserDetails();
  },
};
</script>

<style >
.preview-dp {
  max-height: 100px;
  max-width: 100px;
}
</style>