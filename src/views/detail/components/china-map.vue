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
import { getGeoJsonCities, convertObj2Data } from '../js/convert';

export default {
  methods: {
    // 注册点击事件
    registerClickEvent(chart) {
      chart.on('click', params => {
        this.$router.push(`/detail_province/${params.value}`);
      });
    },

    async initMap() {
      const url = _url.getUrl('/api/map/china');
      const { data } = await axios.get(url);
      const geoJson = data[0];

      const { nameMapForCode } = getGeoJsonCities(geoJson);
      // 转换得到省份名称对应 code 的数组
      const codeData = convertObj2Data(nameMapForCode);

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
            data: codeData,
            // 正常状态下不显示省份名称
            label: {
              show: false,
              fontSize: 12,
              color: '#fff'
            },
            itemStyle: {
              // 设置区域填充颜色
              areaColor: '#090A19',
              color: 'rgb(0, 0, 128)',
              borderColor: '#0062FF',
              borderWidth: 0,
              borderType: 'dotted',
              shadowColor: 'rgb(255, 255, 0)',
              shadowBlur: 2
            },
            emphasis: {
              label: {
                show: true,
                fontSize: 14,
                color: 'green',
                textShadowColor: 'transparent',
                textShadowBlur: 0
              }
            }
          }
        ]
      };

      const chart = init('china-map', option);
      this.registerClickEvent(chart);
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
