<template>
  <div class="comment-list w-100">
    <!-- -----comment tile--- -->

    <Tile @onClose="onClose()" v-for="comment in comments" :key="comment.id" :comment="comment" />
    <!-- -----Profile--- -->
    <!-- <div v-show="hasResponse" class="response">
          
          <b-card class="clearfix comment-tile">
            <Tile />
          </b-card>
    </div>-->

    <!-- -----comment tile--- -->
  </div>
</template>

<script>
import Tile from "~/components/Comments/_tile";
export default {
  components: { Tile },
  prop: ["comments"],
  props: { hasResponse: { default: true }, comments: { default: [] } },
  data() {
    return {};
  },
  methods: {
    onClose() {
      this.$emit("onClose");
    }
  }
};
</script>