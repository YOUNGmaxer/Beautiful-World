<template>
<div class="echart__hot-map"></div>
</template>

<script>
export default {
  
  methods: {
    loadBMap() {
      const container = document.getElementsByClassName('echart__hot-map')[0];
      const map = new BMap.Map(container);
      const point = new BMap.Point(116.404, 39.915);

      map.centerAndZoom(point, 5);
    }
  },
  mounted() {
    this.loadBMap();
  }
}
</script>

<style>
.echart__hot-map {
  width: 100%;
  height: 100%;
}
</style>
