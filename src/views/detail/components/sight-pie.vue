<template>
<div class="sight-pie"></div>
</template>

<script>
import echarts from 'echarts/lib/echarts';
import 'echarts/lib/component/tooltip';
import 'echarts/lib/chart/pie';

export default {
  props: {
    sightList: {
      type: Array,
      default: []
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
        title: {
          text: '景点级别统计',
          subtext: '数据来自去哪儿网'
        },
        tooltip: {
          trigger: 'item'
        },
        series: [
          {
            type: 'pie',
            data
          }
        ]
      }
      chart.setOption(option);
      chart.hideLoading();
    }
  },

  mounted() {
    this.initLevelPie();
  }
}
</script>

<style>
.sight-pie {
  width: 100%;
  height: 50%;
}
</style>
