<template>
<div class="time-line"></div>
</template>

<script>
import _url from 'Util/url';
import axios from 'axios';
import groupBy from 'lodash/groupBy';
import moment from 'moment';
import echarts from 'echarts/lib/echarts';
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/dataZoom';
import 'echarts/lib/chart/line';

export default {
  props: {
    rid: {
      type: String,
      default: null
    }
  },

  methods: {
    // 获取景点所有评论数据
    async getCommentData(rid) {
      const url = _url.getUrl(`/api/sight/comment/${rid}`);
      const res = await axios.get(url);
      return res.data;
    },

    // 获取景点所有评论的时间
    async getCommentTimeList(rid) {
      const commentList = await this.getCommentData(rid);
      const timeList = commentList.map(comment => comment.date);
      console.log(timeList);
      return timeList;
    },

    // 按时间进行分组
    async groupTime(rid) {
      const timeList = await this.getCommentTimeList(rid);
      // const groupedTimeList = groupBy(timeList, item => item);
      const groupedTimeListMonth = groupBy(timeList, item => {
        return moment(item).format('YYYY-MM');
      });
      return groupedTimeListMonth;
    },

    async initLineChart() {
      const dom = document.getElementsByClassName('time-line')[0];
      const chart = echarts.init(dom);
      chart.showLoading();

      // 获取时间列表
      const list = await this.groupTime(this.rid);
      console.log(list);
      // 将时间列表对象分为两个对应数组
      const timeList = Object.keys(list).sort((a, b) => {
        return new Date(a) - new Date(b);
      });
      const valueList = timeList.map(time => list[time].length);
      // console.log('timeList', timeList);
      // console.log('valueList', valueList);

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
