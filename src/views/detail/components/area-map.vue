<template>
<div class="area-map bw-flex bw-flex--center">
  
</div>
</template>

<script>
import echarts from 'echarts/lib/echarts';
import 'echarts/lib/chart/map';
import axios from 'axios';
import { mapActions } from 'vuex';
import _url from 'Util/url';

export default {
  props: {
    
  },

  data() {
    return {
      code: 11
    }
  },

  methods: {
    ...mapActions(['getProvinceMap']),


    async renderAreaMap() {
      const areaDom = document.getElementsByClassName('area-map')[0];
      const myChart = echarts.init(areaDom);
      myChart.showLoading();

      // 根据 /detail/code 来选择加载哪个地区的地图，默认情况下加载北京地图
      const pathCode = _url.getPath(2);
      const code = pathCode ? pathCode : this.code;
      const geoJson = await this.getProvinceMap({ code });
      const areaName = geoJson.name;

      myChart.hideLoading();
      echarts.registerMap('BeiJing', geoJson);
      let option = {};
      myChart.setOption(option = {
        title: {
          text: `${areaName}地图`,
          left: 'center'
        },
        tooltip: {
          // 提示类型
          trigger: 'item'
        },
        series: [
          {
            name: areaName,
            type: 'map',
            mapType: 'BeiJing',
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
          },
          {
            name: '销量',
            type: 'scatter',
          }
        ]
      });
    }
  },

  mounted() {
    this.renderAreaMap();
  }
}
</script>

<style>
.area-map {
  width: 100%;
  height: 100%;
}
</style>
