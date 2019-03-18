<template>
<div class="sight-pie-wrap bw-full box-shadow-1">
  <chart-title>
    <slot></slot>
  </chart-title>
  <div class="sight-pie chart-title__height"></div>
</div>
</template>

<script>
import 'echarts/lib/component/tooltip';
import 'echarts/lib/chart/pie';
import ChartTitle from './chart-title.vue';
import { initLoading, initBase } from '../js/init';

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

  methods: {
    getLevelData(sights) {
      let levelCounter = {};
      let renderData = [];
      sights.forEach(sight => {
        const level = sight.level;
        if (level) {
          if (!levelCounter[level]) {
            levelCounter[level] = 1;
          } else {
            levelCounter[level]++;
          }
        }
      });
      for (let key in levelCounter) {
        renderData.push({
          name: key,
          value: levelCounter[key]
        });
      }
      return renderData;
    },

    initLevelPie() {
      const chart = initLoading('sight-pie');

      const data = this.getLevelData(this.sightList);
      const option = {
        // title: {
        //   text: '景点级别统计',
        //   subtext: '数据来自去哪儿网'
        // },
        tooltip: {
          trigger: 'item'
        },
        legend: {
          orient: 'horizontal',
          x: 'center',
          bottom: '8%',
          // textStyle: {
          //   color: '#fff'
          // }
        },
        series: [
          {
            type: 'pie',
            data,
            radius: [0, '60%']
          }
        ]
      };
      initBase(chart, option, { legend: true });
    }
  },

  mounted() {
    this.initLevelPie();
  }
};
</script>

<style>
.sight-pie {
  width: 100%;
}
</style>
