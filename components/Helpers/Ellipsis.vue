<template>
    <p class="ellipsis">{{text}}</p>
</template>

<style scoped>
.ellipsis{overflow: hidden;
text-overflow: ellipsis;
display: -webkit-box;
-webkit-line-clamp: 3;
-webkit-box-orient: vertical;}
</style>

<script>
export default {
    props:['text']
}
</script>