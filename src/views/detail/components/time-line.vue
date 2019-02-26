<template>
<div class="time-line"></div>
</template>

<script>
import _groupBy from 'lodash/groupBy';
import moment from 'moment';
import { mapState, mapActions } from 'vuex';
import echarts from 'echarts/lib/echarts';
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/dataZoom';
import 'echarts/lib/chart/line';

export default {
  props: {
    rid: {
      type: String,
      default: null
    },
    groupType: {
      type: String,
      default: 'month'
    }
  },

  computed: {
    ...mapState('comment', ['comments', 'timeList'])
  },

  methods: {
    ...mapActions('comment', ['groupTimeBySeason']),

    // 按月份进行分组
    groupTimeByMonth(timeList) {
      // const timeList = await this.getCommentTimeList(rid);
      // const groupedTimeList = groupBy(timeList, item => item);
      const groupedTimeList = _groupBy(timeList, item => {
        return moment(item).format('YYYY-MM');
      });
      return groupedTimeList;
    },

    async initLineChart() {
      const dom = document.getElementsByClassName('time-line')[0];
      const chart = echarts.init(dom);
      chart.showLoading();

      // 获取时间列表
      let list = [];
      switch (this.groupType) {
        case 'month':
          list = this.groupTimeByMonth(this.timeList);
          break;
        default:
          break;
      }
      console.log(list);
      // 将时间列表对象分为两个对应数组
      const timeList = Object.keys(list).sort((a, b) => {
        return new Date(a) - new Date(b);
      });
      const valueList = timeList.map(time => list[time].length);

      const option = {
        tooltip: {
          trigger: 'axis'
        },
        xAxis: {
          type: 'category',
          data: timeList
        },
        yAxis: {
          type: 'value'
        },
        dataZoom: [
          {
            type: 'slider',
            start: 20,
            end: 60
          }
        ],
        series: [
          {
            type: 'line',
            data: valueList
          }
        ]
      };
      chart.setOption(option);
      chart.hideLoading();
    }
  },

  mounted() {
    this.initLineChart();
  }
};
</script>

<style>
.time-line {
  height: 100%;
}
</style>
