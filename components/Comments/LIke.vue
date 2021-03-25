<template>
  <b-button class="text-success" v-on:click="likes(comment.id)" variant="link">
    <a-icon
      type="heart"
      style="vertical-align: middle"
      :theme="filledLike ? 'filled' : 'outlined'"
      v-if="!likeLoading"
    />
    <a-spin size="small" v-if="likeLoading" />
    {{likeCount}}
  </b-button>
</template>

<script>
import CommentLikeServices from "~/services/Api/CommentLikeServices";

export default {
  props: { comment: { default: {} } },
  data() {
    return {
      isLike: false,
      likeLoading: false,
      likeCount: null
    };
  },
  computed: {
    filledLike() {
      return this.isLike || this.comment.liked;
    }
  },
  methods: {
    likes(id) {
      this.likeLoading = true;
      CommentLikeServices.save(id)
        .then(res => {
          this.isLike = true;
          this.updateLike(true);
        })
        .catch(e => {
          this.isLike = false;
          this.updateLike(false);
        })
        .then(() => (this.likeLoading = false));
    },
    updateLike(frontLikes) {
      if (frontLikes) {
        return (this.likeCount = this.likeCount + 1);
      }
      return (this.likeCount = this.likeCount - 1);
    }
  },
  mounted() {
    this.likeCount = this.comment.likes;
  }
};
</script>