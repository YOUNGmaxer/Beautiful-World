<template>
<div class="sight-multi-bar-wrap bw-full box-shadow-1">
  <chart-title>
    <slot></slot>
  </chart-title>
  <div class="sight-multi-bar chart-title__height">multi bar</div>
</div>
</template>

<script>
import echarts from 'echarts/lib/echarts';
import 'echarts/lib/component/tooltip';
import 'echarts/lib/chart/bar';
import ChartTitle from './chart-title.vue';

export default {
  components: {
    ChartTitle
  },
  props: {
    sightList: {
      type: Array,
      default: () => []
    }
  },

  data() {
    return {
      levelRefer: ['1A景区', '2A景区', '3A景区', '4A景区', '5A景区']
    };
  },

  methods: {

    // TODO: 可以优化下这段逻辑，使复杂度降低，使实现更优雅
    getCitySightsNum(sights) {
      let cityCounter = {};
      let cityRank = [];
      let nameList = [];
      let levelList = [[], [], [], [], []];
      // 按城市进行景点级别的提取，并统计数量
      sights.forEach(sight => {
        const city = sight.city || '';
        const level = sight.level;
        if (city) {
          if (!cityCounter[city]) {
            cityCounter[city] = {};
            cityCounter[city].sum = 0;
          }
          if (level) {
            let temp = cityCounter[city];
            temp[level] = temp[level] ? temp[level] + 1 : 1;
            temp.sum++;
          }
        }
      });

      // 将城市按景点数量进行排序
      for (let key in cityCounter) {
        if (Object.prototype.hasOwnProperty.call(cityCounter, key)) {
          cityRank.push({
            name: key,
            sum: cityCounter[key].sum
          });
        }
      }
      cityRank.sort((a, b) => {
        return b.sum - a.sum;
      });

      // 生成 echarts 可用的数据形式
      cityRank.forEach((v, i) => {
        const cityName = v.name;
        nameList.push(cityName);
        this.levelRefer.forEach((_v, _i) => {
          const levelTemp = cityCounter[cityName][_v];
          if (levelTemp) {
            levelList[_i].push(levelTemp);
          } else {
            levelList[_i].push(0);
          }
        });
      });
      return {
        name: nameList,
        value: levelList
      };
    },

    initLevelMultiBar() {
      const dom = document.getElementsByClassName('sight-multi-bar')[0];
      const chart = echarts.init(dom);
      chart.showLoading();

      const data = this.getCitySightsNum(this.sightList);
      const option = {
        // title: {
        //   text: '景点城市分布'
        // },
        tooltip: {
          trigger: 'axis'
        },
        grid: {
          containLabel: true,
          bottom: '10%',
          top: '10%'
        },
        xAxis: {
          type: 'value'
        },
        yAxis: {
          type: 'category',
          data: data.name,
          inverse: true
        },
        series: this.levelRefer.map((v, i) => {
          return {
            name: v,
            type: 'bar',
            stack: '总量',
            data: data.value[i]
          };
        })
      };

      chart.setOption(option);
      chart.hideLoading();
      window.addEventListener('resize', chart.resize);
    }
  },

  mounted() {
    this.initLevelMultiBar();
    // this.getCitySightsNum(this.sightList);
  }
};
</script>

<style>
.sight-multi-bar {
  width: 100%;
  height: 100%;
}
</style>
