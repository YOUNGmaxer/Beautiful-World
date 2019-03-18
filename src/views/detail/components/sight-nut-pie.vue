<template>
<!-- <div class="pie-container"> -->
  <div class="sight-nut-pie"></div>
<!-- </div> -->
</template>

<script>
import echarts from 'echarts/lib/echarts';
import 'echarts/lib/component/tooltip';
import 'echarts/lib/chart/pie';
import { initLoading, initBase } from '../js/init';

export default {
  props: {
    pieData: {
      type: Array,
      default: () => []
    }
  },

  methods: {
    initPie() {
      const chart = initLoading('sight-nut-pie');

      const legendData = this.pieData.map(item => item.name);
      const option = {
        legend: {
          orient: 'vertical',
          x: 'left',
          bottom: '10',
          left: '15',
          data: legendData
        },
        tooltip: {
          show: true,
          // 使 tooltip 居中
          position: (point, params, dom, rect, size) => {
            const { contentSize, viewSize } = size;
            const left = (viewSize[0] - contentSize[0]) / 2;
            const top = (viewSize[1] - contentSize[1]) / 2;
            return { left, top };
          },
          formatter: (params) => {
            // console.log(params.percent);
            // 显示评论占比和评论数
            return `
              ${params.percent}%<br/>
              <p style="font-size: 14px; line-height: 14px; text-align: center; font-weight: 400;">(${params.value})</p>
            `;
          },
          backgroundColor: 'rgba(0,0,0,0)',
          textStyle: {
            fontWeight: 'lighter',
            fontSize: 42
          }
        },
        series: [
          {
            name: '评价分布',
            type: 'pie',
            radius: ['50%', '70%'],
            data: this.pieData,
            label: {
              position: 'outside'
            },
            emphasis: {
              label: {
                fontSize: 20
              }
            }
          }
        ]
      };
      initBase(chart, option, { legend: true });
    }
  },

  mounted() {
    this.initPie();
  }
};
</script>

<style>
/* .pie-container {
  width: 100%;
  padding-bottom: 40%;
  height: 0;
  position: relative;
} */
.sight-nut-pie {
  width: 100%;
  height: 100%;
  /* position: absolute; */
}
</style>
