<template>
  <!-- -----Profile--- -->
  <b-card class="comment-tile" :id="'comment-' + comment.id">
    <div class="clearfix">
      <b-img
        height="30px"
        rounded="circle"
        center
        class="float-left"
        src="https://picsum.photos/125/125/?image=58"
        alt="Center image"
      ></b-img>

      <b-link class="link p-2 text-capitalize text-success">
        <b>{{ comment.user.name }}</b>
      </b-link>
    </div>
    <!-- -----Profile--- -->

    <p class="text-container">
      {{ comment.comment }}
    </p>
    <div class="tile-action text-right">
      <Like :comment="comment" />
      <b-button
        class="text-success"
        v-if="comment.isEditable"
        v-on:click="edit"
        variant="link"
      >
        <a-icon type="edit" />
      </b-button>

      <b-button
        class="text-success"
        v-if="comment.isEditable"
        v-on:click="destory(comment.id)"
        variant="link"
      >
        <a-icon type="delete" />
      </b-button>

      <div v-if="showPost">
        <CommentForm
          :commentId="comment.id"
          @onClose="showCommentForm(false)"
          :providerId="providerId"
        />
      </div>
    </div>
  </b-card>
</template>

<script>
import Like from "~/components/Comments/Like";
import CommentForm from "~/components/Comments/CommentForm";
import CommentServices from "~/services/Api/CommentServices";
import { notification } from "~/services/Utilities";
import {
  BIcon,
  BIconStarFill,
  BIconCaretUpFill,
  BIconReplyFill,
} from "bootstrap-vue";

export default {
  components: { BIconCaretUpFill, BIconReplyFill, Like, CommentForm },

  props: { hasResponse: { default: true }, comment: { default: {} } },
  data() {
    return { providerId: this.$route.params.id, showPost: false };
  },
  methods: {
    edit() {
      this.showPost = !this.showPost;
    },
    showCommentForm(value) {
      this.$emit("onClose");
      this.showPost = value;
    },
    destory(id) {
      CommentServices.destory(id)
        .then((response) => {
          this.$emit("onClose");
          this.$notification.open({ message: "Comment Deleted" });
        })
        .catch((e) => {
          //  alert(e.message)
        })
        .then(() => (this.loading = false));
    },
    goto() {
      let div = "comment-94";
      let elmntToView = document.getElementById(div);
      elmntToView.scrollIntoView();
    },
  },
  mounted() {
  
  },
};
</script>