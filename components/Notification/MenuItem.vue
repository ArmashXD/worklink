<template>
  <a-popover trigger="click"  v-on:blur="getCount" @visibleChange="handleHoverChange" placement="bottomRight">
    <template slot="content">
      <Tabs :count="count" />
    </template>
    <a-button class="p-0">
      <a-badge small :count="count">
        <a-avatar :size="30" shape="square" icon="bell" />
      </a-badge>
    </a-button>
  </a-popover>
</template>

<script>
import NotificationService from "~/services/Api/NotificationService";
import Tabs from "~/components/Notification/Tabs";
import { isEmpty } from "~/services/Utilities";
import { isLoggedin, getUserDetails } from "~/services/Auth";
export default {
  components: { Tabs },
  data() {
    return {
      visible: false,
      count: null,
      notification: [],
    };
  },
  methods: {
    getNotifications(e) {
      e.preventDefault();
      if (this.count > 0) {
      }
    },
    handleMenuClick(e) {
      return NotificationService.markAsRead(e.key)
        .then((notification) => {
          this.getCount();
        })
        .then(() => {
          return this.$router.push("/user/messages");
        });
    },
    getCount() {
      NotificationService.getCount().then((count) => {
        this.count = count;
      });
    },
    // catchPrivateEvent() {
    //   // todo
    //   window.Echo.private("channel-comment-update").listen(
    //     "CommentNotification",
    //     (e) => {
    //       this.getCount();
    //     }
    //   );
    // },
    catchEvent() {
      if (isLoggedin()) {
        window.Echo.channel(
          `channel-comment-update-${getUserDetails().id}`
        ).listen("CommentNotification", (e) => {
          this.getCount();
        });
      }
    },
    handleHoverChange(tab) {
      if (tab) {
      }
    },
  },
  mounted() {
    this.catchEvent();
    this.getCount();
  },
};
</script>