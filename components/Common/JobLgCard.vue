<template>
  <div class="col-sm-4 mt-3">
    <b-card
      :title="provider.name"
      img-src="https://picsum.photos/100/50/?image=25"
      img-alt="provider.name"
      img-top
      tag="article"
      class="text-center"
    >
      <b-card-text class="text-success"  v-b-tooltip.hover :title='provider.description'>
        <Ellipsis :text="provider.description" />
      </b-card-text>

      <b-link class="m-auto" :href="provider.url" variant="success">More Details</b-link>
    </b-card>
  </div>
</template>

<script>
import Ellipsis from "~/components/Helpers/Ellipsis.vue";
export default {
  components: { Ellipsis },
  props: ["provider"]
};
</script>