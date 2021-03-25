<template>
  <!-- -----comemnts--- -->
  <div class="mt-3 p-2 comment-container">
    <!-- -----comemnts list--- -->
    <TileList @onClose="onCloseComment()" :comments="comments" />
    <!-- <TileList :hasResponse="false" /> -->
    <!-- -----comemnts list--- -->
  </div>
  <!-- -----comemnts--- -->
</template>


<style lang='scss' >
.comment-container {
  .comment-list {
    > .comment-tile {
      margin-bottom: 1em;
      .text-container {
        padding-left: 2em;
        margin-bottom: 5px;
      }
      .tile-action {
        .btn {
          font-size: 14px;
          text-decoration: none;
        }
      }
    }
  }
}
</style>

<script>
import CommentServices from "~/services/Api/CommentServices";
import TileList from "~/components/Comments/_tile_list";
export default {
  data() {
    return {
      comments: [],
    };
  },
  components: { TileList },
  props: ["providerId"],
  methods: {
    loadComments() {
      CommentServices.getProviderComments(this.providerId).then((comments) => {
        this.comments = comments.data;
      });
    },
    onCloseComment() {
      this.loadComments();
    },
    reloadComments() {
      this.loadComments();
    },
  },
  mounted() {
    this.$emit("getCommentReload", this.reloadComments);
    this.loadComments();
  },
};
</script>