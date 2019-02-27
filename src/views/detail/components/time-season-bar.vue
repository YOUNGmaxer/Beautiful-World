<template>
<div class="time-season-wrap bw-full box-shadow-1">
  <chart-title>评论时间分布（按季度）</chart-title>
  <div class="time-season">time season</div>
</div>
</template>

<script>
import echarts from 'echarts/lib/echarts';
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/grid';
import 'echarts/lib/chart/pictorialBar';
import 'echarts/lib/chart/bar';
import { mapActions, mapState } from 'vuex';
import _sum from 'lodash/sum';
import ChartTitle from './chart-title.vue';

export default {
  components: {
    ChartTitle
  },
  computed: {
    ...mapState('comment', ['timeList'])
  },

  methods: {
    ...mapActions('comment', ['groupTimeBySeason']),

    async initSeasonBar() {
      const dom = document.getElementsByClassName('time-season')[0];
      const chart = echarts.init(dom);
      chart.showLoading();

      const yData = ['春', '夏', '秋', '冬'];
      const seasonData = await this.groupTimeBySeason(this.timeList);
      console.log('seasonData', seasonData);
      const xData = yData.map(item => {
        return seasonData[item].length;
      });
      const xDataSum = _sum(xData);
      const xPersentData = xData.map(item => {
        return (item / xDataSum).toFixed(2) * 100;
      });
      const xFullData = xData.map(() => 100);
      console.log('xData', xData, xPersentData);

      const option = {
        grid: {
          containLabel: true
        },
        tooltip: {
          trigger: 'axis',
          formatter: (params) => {
            return `
              ${params[1].name}</br>
              评论数：${seasonData[params[1].name].length}</br>
              评论数占比：${params[1].value}%
            `;
          }
        },
        yAxis: {
          data: yData,
          axisLine: { show: false },
          axisTick: { show: false },
          axisLabel: {
            textStyle: {
              fontSize: 15
            }
          }
        },
        xAxis: {
          splitLine: { show: false },
          axisLabel: { show: false },
          axisTick: { show: false },
          axisLine: { show: false }
        },
        series: [
          {
            name: 'hintBg',
            type: 'pictorialBar',
            symbol: 'rect',
            itemStyle: {
              normal: {
                color: 'rgba(3, 147, 114, 0.27)'
              }
            },
            symbolRepeat: true,
            symbolSize: 14,
            data: xFullData,
            label: {
              normal: {
                show: true,
                formatter: (series) => {
                  return `${xPersentData[series.dataIndex]}%`;
                },
                position: 'insideTopRight',
                textStyle: {
                  color: 'rgb(206, 118, 90)'
                },
                offset: [0, -10]
              }
            }
          },
          {
            type: 'pictorialBar',
            symbol: 'rect',
            symbolRepeat: true,
            symbolSize: 14,
            data: xPersentData

          }
        ]
      };

      chart.setOption(option);
      chart.hideLoading();
      window.addEventListener('resize', chart.resize);
    }
  },

  mounted() {
    this.initSeasonBar();
  }
};
</script>

<style>
.time-season {
  height: calc(100% - var(--chart-title-height));
}
</style>
