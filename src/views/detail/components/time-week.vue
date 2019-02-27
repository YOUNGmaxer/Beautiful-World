<template>
<div class="time-week-wrap bw-full box-shadow-1">
  <chart-title>评论时间分布（按星期）</chart-title>
  <div class="time-week">{{ comments.length }}</div>
</div>
</template>

<script>
import { mapState } from 'vuex';
import moment from 'moment';
import _groupBy from 'lodash/groupBy';
import echarts from 'echarts/lib/echarts';
import 'echarts/lib/component/tooltip';
import 'echarts/lib/chart/pie';
import ChartTitle from './chart-title.vue';

export default {
  components: {
    ChartTitle
  },
  computed: {
    ...mapState('comment', ['comments', 'timeList'])
  },

  data() {
    return {
      weekList: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
    }
  },

  methods: {
    groupTimeByWeek(timeList) {
      const groupedByWeek = _groupBy(timeList, time => {
        const dayIndex = moment(time).day();
        return this.weekList[dayIndex];
      });
      return groupedByWeek;
    },

    // 转换出用于外层饼图的数据
    convert4OuterPie(groupedData) {
      const ret = [];
      let maxValue = 0;
      this.weekList.forEach(day => {
        const value = groupedData[day].length;
        if (value > maxValue) maxValue = value;
        ret.push({
          name: day,
          value: value
        });
      });
      ret.forEach(item => {
        if (item.value === maxValue) {
          item.selected = true;
        }
      });
      return ret;
    },

    // 转换出用于内层饼图的数据
    convert4InnerPie(groupedData) {
      const ret = [];
      let workValue = 0;
      let weekValue = 0;
      this.weekList.forEach(day => {
        const val = groupedData[day].length;
        if (day === '周日' || day === '周六') {
          weekValue += val;
        } else {
          workValue += val;
        }
      });
      ret.push({
        name: '工作日',
        value: workValue
      });
      ret.push({
        name: '休息日',
        value: weekValue
      });
      return ret;
    },

    initWeekPie() {
      const dom = document.getElementsByClassName('time-week')[0];
      const chart = echarts.init(dom);
      chart.showLoading();

      const groupedWeek = this.groupTimeByWeek(this.timeList);
      console.log('groupedWeek', groupedWeek);
      const outerData = this.convert4OuterPie(groupedWeek);
      const innerData = this.convert4InnerPie(groupedWeek);

      const option = {};
      option.baseOption = {
        tooltip: {
          trigger: 'item'
        },
        series: [
          {
            name: '评论时间（按工作日和休息日）',
            type: 'pie',
            radius: [0, '40%'],
            label: {
              normal: {
                position: 'inner'
              }
            },
            data: innerData
          },
          {
            name: '评论时间（按星期）',
            type: 'pie',
            radius: ['50%', '70%'],
            label: {},
            data: outerData
          }
        ]
      };
      option.media = [
        {
          option: {
            query: {
              minAspectRatio: 1
            },
            series: [
              {
                center: ['50%', '50%']
              },
              {
                center: ['50%', '50%']
              }
            ]
          }
        }
      ]


      chart.setOption(option);
      chart.hideLoading();
      // 当窗口发生变动时，重新渲染图标
      window.addEventListener('resize', chart.resize);
    }
  },

  mounted() {
    this.initWeekPie();
  }
};
</script>

<style>
.time-week {
  height: calc(100% - var(--chart-title-height));
}
</style>
