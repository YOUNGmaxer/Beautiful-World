<template>
<div class="china-map"></div>
</template>

<script>
import axios from 'axios';
import _url from 'Util/url';
import echarts from 'echarts/lib/echarts';
import 'echarts/lib/chart/map';
import 'echarts/lib/chart/scatter';
import 'echarts/lib/component/geo';
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/visualMap';
import init from '../js/init';

export default {
  methods: {
    async initMap() {
      const url = _url.getUrl('/api/map/china');
      const { data } = await axios.get(url);
      const geoJson = data[0];

      const mapName = 'china';
      // 注册可用的地图（形成一个地图名和数据的映射）
      echarts.registerMap(mapName, geoJson);

      const option = {
        geo: {
          map: mapName,
          itemStyle: {
            normal: {
              areaColor: '#323c48',
              borderColor: '#111'
            },
            emphasis: {
              areaColor: '#2a333d'
            }
          }
        },
        series: [
          {
            name: mapName,
            type: 'map',
            mapType: mapName,
            itemStyle: {
              // 设置区域填充颜色
              areaColor: '#090A19',
              color: 'rgb(0, 0, 128)',
              borderColor: '#0062FF',
              borderWidth: 0,
              borderType: 'dotted',
              shadowColor: 'rgb(255, 255, 0)',
              shadowBlur: 2
            }
          }
        ]
      };

      init('china-map', option);
      console.log(geoJson);
    }
  },

  beforeMount() {
    this.initMap();
  }
};
</script>

<style>
.china-map {
  width: 100%;
  height: 100%;
}
</style>
