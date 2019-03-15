<template>
<div class="detail-map-container">
  <star-bg></star-bg>
  <china-map></china-map>
</div>
</template>

<script>
import ChinaMap from './components/china-map.vue';
import StarBg from 'Components/bg/star.vue';

export default {
  components: {
    ChinaMap,
    StarBg
  },

  // mounted() {
  //   document.body.setAttribute('class', 'bg-lemon-twist');
  // }
};
</script>

<style>
.detail-map-container {
  width: 100%;
  height: 100vh;
}
</style>
