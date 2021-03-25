<template>
  <a-list item-layout="horizontal" :loading="loading" :data-source="data">
    <a-list-item
      v-on:mouseover.once="markAsRead(item.id)"
      slot="renderItem"
      slot-scope="item"
    >
      <a-list-item-meta :ellipsis="true" :description="item.message">
        <a slot="title" v-on:click="redirect(item)">{{ item.sender.name }}</a>
        <!-- <a-avatar
                slot="avatar"
                src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
        />-->
      </a-list-item-meta>
    </a-list-item>
  </a-list>
</template>

<script>
import NotificationService from "~/services/Api/NotificationService";
export default {
  props: ["data", "loading"],
  components: {},
  methods: {
    markAsRead(id) {
      NotificationService.markAsRead(id);
    },
    redirect(item) {
      return this.$router.push({ path: item.url });
    },
  },
};
</script>