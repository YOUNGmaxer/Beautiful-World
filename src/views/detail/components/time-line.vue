<template>
<div class="time-line-wrap box-shadow-1">
  <chart-title>评论时间分布</chart-title>
  <div class="time-line" :class="specialClass"></div>
</div>

</template>

<script>
import _groupBy from 'lodash/groupBy';
import moment from 'moment';
import { mapState, mapActions } from 'vuex';
import echarts from 'echarts/lib/echarts';
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/dataZoom';
import 'echarts/lib/chart/line';
import ChartTitle from './chart-title.vue';
import init from '../js/init';

export default {
  components: {
    ChartTitle
  },
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

  data() {
    return {
      specialClass: `time-line-${this.groupType}`
    };
  },


  computed: {
    ...mapState('comment', ['comments', 'timeList', 'seasonList'])
  },

  methods: {
    ...mapActions('comment', ['groupTimeBySeason']),

    // 按月份进行分组
    groupTimeByMonth(timeList) {
      const groupedTimeList = _groupBy(timeList, item => {
        return moment(item).format('YYYY-MM');
      });
      return groupedTimeList;
    },

    groupTimeBySeason(timeList) {
      const groupedTimeList = _groupBy(timeList, item => {
        const seasonSeries = ['春', '夏', '秋', '冬'];
        const timeMoment = moment(item);
        const month = timeMoment.month();
        const year = timeMoment.year();
        const season = this.seasonList[month];
        const seasonIndex = seasonSeries.indexOf(season) + 1;
        const seasonWeight = 1 - Number((1 / seasonIndex).toFixed(2));
        return timeMoment.format(`YYYY-${season}-${year + seasonWeight}`);
      });
      console.log(groupedTimeList);
      return groupedTimeList;
    },

    async initLineChart() {
      // 获取时间列表
      let list = [];
      let timeList = [];
      let valueList = [];
      switch (this.groupType) {
        case 'month':
          list = this.groupTimeByMonth(this.timeList);
          // 将时间列表对象分为两个对应数组
          timeList = Object.keys(list).sort((a, b) => {
            return new Date(a) - new Date(b);
          });
          valueList = timeList.map(time => list[time].length);
          break;
        case 'season':
          list = this.groupTimeBySeason(this.timeList);
          timeList = Object.keys(list).sort((a, b) => {
            const aWeight = Number(a.split('-')[2]);
            const bWeight = Number(b.split('-')[2]);
            return aWeight - bWeight;
          });
          valueList = timeList.map(time => list[time].length);
          timeList = timeList.map(time => {
            const nameArr = time.split('-');
            return `${nameArr[0]}-${nameArr[1]}`;
          });
          break;
        default:
          break;
      }

      const option = {
        tooltip: {
          trigger: 'axis'
        },
        grid: {
          show: false,
          top: '10%'
        },
        xAxis: {
          type: 'category',
          data: timeList,
          axisLabel: {
            // interval: 1
          }
        },
        yAxis: {
          type: 'value',
          axisTick: {
            show: false
          }
        },
        dataZoom: [
          {
            type: 'slider',
            start: 20,
            end: 80,
            textStyle: {
              color: '#aaa'
            }
          }
        ],
        series: [
          {
            type: 'line',
            data: valueList
          }
        ]
      };
      init(this.specialClass, option);
    }
  },

  mounted() {
    this.initLineChart();
    this.groupTimeBySeason(this.timeList);
  }
};
</script>

<style>
.time-line-wrap {
  height: 100%;
}
.time-line {
  height: calc(100% - var(--chart-title-height));
}
</style>
