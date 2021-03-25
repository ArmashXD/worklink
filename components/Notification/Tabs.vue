<template>
  <div>
    <a-tabs default-active-key="1" @change="tabChange" :loading="loading">
      <a-tab-pane key="1" tab="Messages">
        <List :data="data" :loading="loading" />
      </a-tab-pane>

      <a-tab-pane key="2" tab="Comments" force-render>
        <List :data="data" :loading="loading" />
      </a-tab-pane>
    </a-tabs>
  </div>
</template>


<script>
import NotificationService from "~/services/Api/NotificationService";
import List from "~/components/Notification/NotificationList";
export default {
  props: {
    count: {
      default() {
        return 0;
      },
    },
  },
  components: { List },
  data() {
    return {
      data: [],
      loading: false,
    };
  },
  methods: {
    tabChange(type) {
      this.getNotifications(type);
    },

    getNotifications(type) {
      this.loading = true;
      this.count > 0
        ? NotificationService.getNotifications({ type })
            .then((notification) => {
              this.data = notification.data;
            })
            .then(() => (this.loading = false))
        : (this.loading = false);
    },
    markAsRead(id) {
      this.loading = true;
      NotificationService.markAsRead(id).then(() => (this.loading = false));
    },
  },
  mounted() {
    this.getNotifications(1);
  },
};
</script>

<style scoped>
.ant-tabs-tabpane,
.ant-tabs-tabpane-active {
  min-height: 11px;
}
</style>