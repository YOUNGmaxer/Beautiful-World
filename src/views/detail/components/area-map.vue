<template>
<div class="area-map bw-flex bw-flex--center"></div>
</template>

<script>
import echarts from 'echarts/lib/echarts';
import 'echarts/lib/chart/map';
import 'echarts/lib/chart/scatter';
import 'echarts/lib/component/geo';
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/visualMap';
import axios from 'axios';
import { mapActions, mapState } from 'vuex';
import _url from 'Util/url';

export default {
  props: {
    code: {
      type: String,
      default: '11'
    },
    sightList: {
      type: Array,
      default: []
    }
  },

  data() {
    return {
    }
  },

  computed: {
  },

  methods: {
    ...mapActions(['getProvinceMap']),
    ...mapActions('sight', ['getProvSights']),

    /**
     * 处理数据，将数据转化为 {name, value} 格式
     */
    convertData(data, geoData) {
      let res = [];
      for (let i = 0; i < data.length; i++) {
        const geoCoord = geoData[data[i].name];
        if (geoCoord) {
          res.push({
            name: data[i].name,
            value: geoCoord.concat(data[i].value)
          });
        }
      }
      return res;
    },

    async initAreaMap() {
      const areaDom = document.getElementsByClassName('area-map')[0];
      const myChart = echarts.init(areaDom);
      myChart.showLoading();

      const geoJson = await this.getProvinceMap({ code: this.code });
      const areaName = geoJson.name;

      echarts.registerMap('ningxia', geoJson);

      // 获取景点数据
      // const sightsData = await this.getProvSights(this.code);
      const renderData = this.sightList.map(sight => {
        return {
          name: sight.name,
          value: Number(sight.sale_count)
        };
      });
      const geoData = {};
      this.sightList.forEach(sight => {
        geoData[sight.name] = [Number(sight.point[0]), Number(sight.point[1])];
      });
      const data = this.convertData(renderData, geoData);
      console.log(data);

      myChart.hideLoading();
      let option = {};
      myChart.setOption(option = {
        title: {
          text: `${areaName}地图`,
          left: 'center'
        },
        tooltip: {
          // 提示类型
          trigger: 'item',
          formatter: params => `${params.name} : ${params.value[2]}`
        },
        visualMap: {
          min: 0,
          max: 200,
          calculable: true,
          inRange: {
            color: ['#50a3ba', '#eac736', '#d94e5d'],
          },
          textStyle: {
            color: '#fff'
          }
        },
        geo: {
          map: 'ningxia',
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
            // name: areaName,
            type: 'map',
            mapType: 'ningxia',
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
            name: '景点销量',
            type: 'scatter',
            coordinateSystem: 'geo',
            data: data,
            symbolSize: val => {
              val = val[2];
              return val > 0 ? (val > 15 ? 15 : val) : 5;
            },
            label: {
              normal: {
                show: false
              },
              emphasis: {
                show: true
              }
            },
            itemStyle: {
              normal: {
                color: '#ddb926'
              }
            }
          }
        ]
      });
    },
  },

  mounted() {
    this.initAreaMap();
  }
}
</script>

<style>
.area-map {
  width: 100%;
  height: 100%;
}
</style>
