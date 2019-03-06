<template>
<div class="sight-pie-wrap bw-full box-shadow-1">
  <chart-title>
    <slot></slot>
  </chart-title>
  <div class="sight-pie chart-title__height"></div>
</div>
</template>

<script>
import echarts from 'echarts/lib/echarts';
import 'echarts/lib/component/tooltip';
import 'echarts/lib/chart/pie';
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
      const dom = document.getElementsByClassName('sight-pie')[0];
      const chart = echarts.init(dom);
      chart.showLoading();

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
          bottom: '8%'
        },
        series: [
          {
            type: 'pie',
            data,
            radius: [0, '60%']
          }
        ]
      };
      chart.setOption(option);
      chart.hideLoading();
      window.addEventListener('resize', chart.resize);
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
