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
import { mapActions } from 'vuex';
import { initLoading, initBase } from '../js/init';
import { getGeoJsonCities, convertData, generateSightMapData } from '../js/convert';

export default {
  props: {
    code: {
      type: String,
      default: '11'
    },
    sightList: {
      type: Array,
      default: () => []
    }
  },

  data() {
    return {
      chart: null,
      areaName: '',
      sightMapData: null
    };
  },

  computed: {
  },

  methods: {
    ...mapActions(['getProvinceMap']),
    ...mapActions('sight', ['getProvSights']),

    // 注册点击事件
    registerClickEvent(chart) {
      chart.on('click', params => {
        if (params.componentType === 'series') {
          if (params.seriesType === 'map') {
            this.$router.push(`/detail_city/${params.data.code}`);
          }
          if (params.seriesType === 'scatter') {
            const sightObj = this.sightList.find((sight) => {
              return sight.name === params.name;
            });
            this.$router.push(`/detail_sight/${sightObj.sid}`);
          }
        }
        // 进行路由跳转
        // this.$router.push(`/detail_city/${params.data.code}`);
      });
    },

    // 统计每个区域的景点数量
    // 为了兼容有些地区可能没有景点数据的问题，这里传入了 counter 模板进行兼容
    countCitySights(sights, nameCounter) {
      let res = [];
      sights.forEach(sight => {
        const city = sight.city || '';
        if (city) {
          nameCounter[city]++;
        }
      });
      for (let key in nameCounter) {
        if (Object.prototype.hasOwnProperty.call(nameCounter, key)) {
          res.push({
            name: key,
            value: nameCounter[key]
          });
        }
      }
      return res;
    },

    // 根据销量来定义点的大小
    symbolFuncBySale(val) {
      let saleValue = val[2];
      let baseValue = 1;
      if (saleValue === 0) {
        return baseValue;
      }
      else if (saleValue <= 10) {
        return baseValue + saleValue / 2;
      }
      else if (saleValue <= 100) {
        return baseValue + 5 + saleValue / 10;
      }
      else if (saleValue <= 1000) {
        return 15 + saleValue / 100 / 2;
      }
      return 25;
    },

    // 根据品论量来定义点的大小
    symbolFuncByComment(val) {
      let saleValue = val[3];
      let baseValue = 1;
      if (saleValue === 0) {
        return baseValue;
      }
      else if (saleValue <= 10) {
        return baseValue + saleValue / 2;
      }
      else if (saleValue <= 100) {
        return baseValue + 5 + saleValue / 10;
      }
      else if (saleValue <= 1000) {
        return 15 + saleValue / 100 / 2;
      }
      else if (saleValue <= 10000) {
        return 20 + saleValue / 1000 / 2;
      }
      return 25 + Math.floor(saleValue / 10000) / 2;
    },

    setTop5Symbol(sightMapData) {
      sightMapData.sort((a, b) => {
        return b.value[3] - a.value[3];
      });

      const topSymbol = sightMapData.slice(0, 5);
      const option = {
        series: [
          {},
          {},
          {
            name: '热门景点Top',
            type: 'effectScatter',
            coordinateSystem: 'geo',
            tooltip: {
              formatter: this.scatterFormatter
            },
            data: topSymbol,
            symbolSize: 30,
            rippleEffect: {
              brushType: 'stroke'
            },
            hoverAnimation: true,
            itemStyle: {
              color: '#2f5fd4'
            }
          }
        ]
      };
      this.chart.setOption(option);
    },

    scatterFormatter(params) {
      return `
        景点：${params.name}<br/>
        销量：${params.value[2]}<br/>
        评论量：${params.value[3]}
      `;
    },

    async initAreaMap() {
      const chartClassName = 'area-map';
      const chart = initLoading(chartClassName);
      this.chart = chart;

      // 获取地图数据
      const geoJson = await this.getProvinceMap({ code: this.code });
      this.areaName = geoJson.name;
      // 获取省级区域的城市
      const { nameMap, nameMapForCode, nameMapForCounter } = getGeoJsonCities(geoJson);
      const cityCounter = this.countCitySights(this.sightList, nameMapForCounter);

      cityCounter.forEach(item => {
        const code = nameMapForCode[item.name] || nameMapForCode[`${item.name}市`];
        item.code = code;
      });

      echarts.registerMap(this.areaName, geoJson);

      // 将数据转换为特定格式
      this.sightMapData = generateSightMapData(this.sightList);
      console.log(this.sightMapData);

      const option = {
        title: {
          text: `${this.areaName}`,
          left: 'center',
          top: '5%',
          textStyle: {
            color: '#fff'
          }
        },
        tooltip: {
          // 提示类型
          trigger: 'item'
        },
        // visualMap: {
        //   min: 0,
        //   max: 200,
        //   calculable: true,
        //   inRange: {
        //     color: ['#50a3ba', '#eac736', '#d94e5d'],
        //   },
        //   textStyle: {
        //     color: '#fff'
        //   }
        // },
        geo: {
          map: this.areaName,
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
            name: this.areaName,
            type: 'map',
            mapType: this.areaName,
            tooltip: {
              formatter: (params) => {
                return `
                  地区：${params.name}<br />
                  代号：${params.data.code}<br />
                  景点数量：${params.value}
                `;
              }
            },
            data: cityCounter,
            nameMap,
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
            data: this.sightMapData,
            tooltip: {
              formatter: this.scatterFormatter
            },
            // symbolSize: this.symbolFuncBySale,
            symbolSize: this.symbolFuncByComment,
            itemStyle: {
              normal: {
                color: '#ddb926'
              }
            }
          }
        ]
      };

      initBase(chart, option);
      // 注册点击事件
      this.registerClickEvent(chart);
      this.setTop5Symbol(this.sightMapData);
    }
  },

  mounted() {
    this.initAreaMap();
  }
};
</script>

<style>
.area-map {
  width: 100%;
  height: 100%;
}
</style>
