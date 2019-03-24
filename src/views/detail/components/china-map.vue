<template>
<div class="china-map"></div>
</template>

<script>
import axios from 'axios';
import _url from 'Util/url';
import echarts from 'echarts/lib/echarts';
import 'echarts/lib/chart/map';
import 'echarts/lib/chart/scatter';
import 'echarts/lib/chart/effectScatter';
import 'echarts/lib/component/geo';
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/visualMap';
import { initLoading, initBase } from '../js/init';
import { getGeoJsonCities, convertObj2Data, generateSightMapData } from '../js/convert';
import { mapState, mapMutations } from 'vuex';

export default {
  props: {
    sightList: {
      type: Array,
      default: () => []
    }
  },

  data() {
    return {
      localSightList: null,
      chart: null,
      sightMapData: null,
      sightMapDataNormalize: null
    };
  },

  computed: {
    ...mapState('chinaMap', ['emitResizeFlag'])
  },

  watch: {
    sightList(_new, _old) {
      this.sightMapData = generateSightMapData(_new);
      this.normalizaSightMapData(this.sightMapData);
      if (this.chart) {
        this.renderSightData(this.sightMapData);
      }
    },
    // 检测并触发 resize
    emitResizeFlag(_new, _old) {
      if (_new) {
        setTimeout(this.chart.resize, 100);
        this.$store.commit('chinaMap/SET_FLAG', false);
      }
    }
  },

  methods: {
    ...mapMutations('chinaMap', ['SET_FLAG', 'SET_LAUNCH']),

    // 注册点击事件
    registerClickEvent(chart) {
      chart.on('click', params => {
        if (params.seriesType === 'map') {
          this.$router.push(`/detail_province/${params.value}`);
        }
        if (params.seriesType === 'scatter' || params.seriesType === 'effectScatter') {
          const sightObj = this.sightList.find((sight) => {
            return sight.name === params.name;
          });
          this.$router.push(`/detail_sight/${sightObj.sid}`);
        }
      });
    },

    extractCommentNum(_sightList) {
      const commentNumList = [];
      _sightList.forEach(sight => {
        const { comment } = sight;
        if (comment && comment['全部']) {
          commentNumList.push(comment['全部']);
        }
      });
      return commentNumList;
    },

    // 对景点数据的评论量进行归一化处理
    normalizaSightMapData(sightMapData) {
      let maxCommentNum = sightMapData[0].value[3];
      let minCommentNum = sightMapData[0].value[3];

      sightMapData.forEach(item => {
        let commentNum = item.value[3];
        if (maxCommentNum < commentNum) {
          maxCommentNum = commentNum;
        }
        if (minCommentNum > commentNum) {
          minCommentNum = commentNum;
        }
      });

      this.sightMapDataNormalize = sightMapData.slice(0);
      for (let i = 0, len = this.sightMapDataNormalize.length; i < len; i++) {
        let commentNum = this.sightMapDataNormalize[i].value[3];
        this.sightMapDataNormalize[i].value[4] = (commentNum - minCommentNum) / (maxCommentNum - minCommentNum);
      }
      console.log(this.sightMapDataNormalize);
      return this.sightMapDataNormalize;
    },

    // 将渲染景点数据分割开，避免等待加载整个页面的 loading 过久
    renderSightData(sightMapData) {
      const formatter = (params) => {
        return `
          景点：${params.name}<br/>
          销量：${params.value[2]}<br/>
          评论量：${params.value[3]}<br/>
          归一值：${params.value[4]}
        `;
      };

      const option = {
        tooltip: {
          formatter: params => {
            return `
              省份：${params.name}
            `;
          }
        },
        series: [
          // 注意，这里需要传入一个 {}，这样才不会把原来的配置覆盖掉，setOption 默认会 merge 配置
          {},
          {
            name: '热门景点',
            type: 'scatter',
            coordinateSystem: 'geo',
            data: sightMapData,
            tooltip: {
              formatter
            },
            symbolSize: val => {
              let commentVal = val[4];
              let computedVal = commentVal * 1000;
              return val[3] < 10000 ? (computedVal > 25 ? 25 : computedVal) : 0;
            },
            itemStyle: {
              color: '#996699'
            }
          },
          {
            name: '热门景点Top',
            type: 'effectScatter',
            coordinateSystem: 'geo',
            tooltip: {
              formatter
            },
            data: sightMapData.filter(item => {
              return item.value[3] >= 10000;
            }),
            symbolSize: (val) => {
              let baseVal = 25;
              let computedVal = Math.floor(val[3] / 10000) / 2;
              return baseVal + computedVal;
            },
            // 线条效果更明显
            rippleEffect: {
              brushType: 'stroke'
            },
            hoverAnimation: true,
            itemStyle: {
              color: '#cc9999'
            }
          }
        ]
      };
      this.chart.setOption(option);
      // 初始化页面加载完数据后展开侧栏
      this.$store.commit('chinaMap/SET_LAUNCH', true);
    },

    async initMap() {
      let chart = initLoading('china-map');

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
        tooltip: {
          trigger: 'item'
        },
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

      // 初始化渲染 chart
      this.chart = initBase(chart, option);
      this.registerClickEvent(this.chart);
      if (this.sightMapData) {
        this.renderSightData(this.sightMapData);
      }
    }
  },

  mounted() {
    this.localSightList = this.sightList.slice(0);
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
