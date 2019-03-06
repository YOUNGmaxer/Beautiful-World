<template>
<div class="pie-container">
  <div class="sight-nut-pie"></div>
</div>
</template>

<script>
import echarts from 'echarts/lib/echarts';
import 'echarts/lib/component/tooltip';
import 'echarts/lib/chart/pie';
import init from '../js/init';

export default {
  props: {
    pieData: {
      type: Array,
      default: () => []
    }
  },

  methods: {
    initPie() {

      const legendData = this.pieData.map(item => item.name);
      const option = {
        legend: {
          orient: 'vertical',
          x: 'left',
          bottom: '10',
          left: '15',
          data: legendData
        },
        series: [
          {
            name: '评价分布',
            type: 'pie',
            radius: ['50%', '70%'],
            data: this.pieData
          }
        ]
      };
      init('sight-nut-pie', option, { legend: true });
    }
  },

  mounted() {
    this.initPie();
  }
};
</script>

<style>
.pie-container {
  width: 100%;
  padding-bottom: 80%;
  height: 0;
  position: relative;
}
.sight-nut-pie {
  width: 100%;
  height: 100%;
  position: absolute;
}
</style>
