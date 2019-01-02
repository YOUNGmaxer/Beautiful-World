<template>
<div class="echart__hot-map"></div>
</template>

<script>
import store from 'Store';
import { mapActions } from 'vuex';

export default {
  methods: {
    ...mapActions(['getSightsData']),

    // 渲染百度地图和热力图
    loadHeatMap(points) {
      const container = document.getElementsByClassName('echart__hot-map')[0];
      const map = new BMap.Map(container);
      const point = new BMap.Point(117.078, 23.421412);

      map.centerAndZoom(point, 8);

      const heatmapOverlay = new BMapLib.HeatmapOverlay({ radius: 10 });
      map.addOverlay(heatmapOverlay);
      heatmapOverlay.setDataSet({ data: points, max: 100 });
      heatmapOverlay.show();
    },

    // 动态加载热力图资源脚本
    addHeatMapScript() {
      const scriptDom = document.createElement('script');
      scriptDom.type = 'text/javascript';
      scriptDom.src = 'http://api.map.baidu.com/library/Heatmap/2.0/src/Heatmap_min.js';
      document.body.appendChild(scriptDom);
    }
  },
  created() {
    this.addHeatMapScript();
  },
  mounted() {
    this.getSightsData().then(res => {
      // 处理数据以适应热力图
      const data = res.data;
      const points = data.map(sight => {
        const point = sight.sight_point;
        return {
          lng: point[0],
          lat: point[1],
          count: sight.sight_sale_count
        }
      });

      setTimeout(this.loadHeatMap, 100, points);
    })
  }
}
</script>

<style>
.echart__hot-map {
  width: 100%;
  height: 100%;
}
</style>
