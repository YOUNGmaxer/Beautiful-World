<template>
<div class="sight-container bw-flex">
  <div class="sight-left">
    <sight-card></sight-card>
  </div>
  <div class="sight-right">
    <word-cloud></word-cloud>
  </div>
</div>
</template>

<script>
import SightCard from './components/sight-card.vue';
import WordCloud from './components/word-cloud.vue';

export default {
  components: {
    SightCard,
    WordCloud
  }
};
</script>

<style>
.sight-container {
  width: 100vw;
  height: 100vh;
}
.sight-left {
  width: 500px;
  height: 100%;
}
.sight-right {
  height: 100%;
  flex: 1;
}
</style>
