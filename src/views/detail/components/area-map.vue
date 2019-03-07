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
import init from '../js/init';

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
      areaName: ''
    };
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

    // 提取省级 geoJson 中的城市名称和code
    getGeoJsonCities(geoJson) {
      const features = geoJson.features || [];
      const nameMapForCode = {};
      const nameMap = {};
      // 这里增加一个对象，方便统计每个区域的景点数，同时用来兼容直辖市以及该区域没有景点的情况
      const nameMapForCounter = {};
      features.forEach(feature => {
        const name = feature.properties.name;
        const minName = name.replace('市', '');
        const id = feature.properties.id;
        nameMapForCode[name] = id;
        nameMap[name] = minName;
        nameMapForCounter[minName] = 0;
      });
      return { nameMap, nameMapForCode, nameMapForCounter };
    },

    async initAreaMap() {
      // 获取地图数据
      const geoJson = await this.getProvinceMap({ code: this.code });
      this.areaName = geoJson.name;
      // 获取省级区域的城市
      const { nameMap, nameMapForCode, nameMapForCounter } = this.getGeoJsonCities(geoJson);
      const cityCounter = this.countCitySights(this.sightList, nameMapForCounter);

      cityCounter.forEach(item => {
        const code = nameMapForCode[item.name] || nameMapForCode[`${item.name}市`];
        item.code = code;
      });

      echarts.registerMap(this.areaName, geoJson);

      const renderData = this.sightList.map(sight => {
        return {
          name: sight.name,
          value: Number(sight.sale_count)
        };
      });
      const geoData = {};
      this.sightList.forEach(sight => {
        if (sight.point) {
          geoData[sight.name] = [Number(sight.point[0]), Number(sight.point[1])];
        }
      });
      const data = this.convertData(renderData, geoData);

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
                  地区:${params.name}<br />
                  代号:${params.data.code}<br />
                  景点数量:${params.value}
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
            data: data,
            tooltip: {
              formatter: params => {
                return `${params.name} : ${params.value[2]}`;
              }
            },
            symbolSize: val => {
              val = val[2];
              return val > 0 ? (val > 15 ? 15 : val) : 5;
            },
            // label: {
            //   normal: {
            //     show: false
            //   },
            //   emphasis: {
            //     show: true
            //   }
            // },
            itemStyle: {
              normal: {
                color: '#ddb926'
              }
            }
          }
        ]
      };

      const chart = init('area-map', option);
      // 注册点击事件
      this.registerClickEvent(chart);
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
