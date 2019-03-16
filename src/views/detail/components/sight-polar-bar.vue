<template>
<div class="sight-polar-bar-wrap bw-full box-shadow-1">
  <chart-title>
    <slot>景点评论最多</slot>
  </chart-title>
  <div class="sight-polar-bar chart-title__height"></div>
</div>
</template>

<script>
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/polar';
import 'echarts/lib/chart/bar';
import ChartTitle from './chart-title.vue';
import { axisLabelFormatter } from '../js/formatter';
import init from '../js/init';

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

  data() {
    return {
      commentRefer: ['全部', '好评', '中评', '差评'],
      localSightList: []
    };
  },

  methods: {
    // 将评论的统计对象映射到一个数组中
    mapCommentToArray(comment) {
      let res = [];
      this.commentRefer.forEach(v => {
        comment[v] ? res.push(comment[v]) : res.push(0);
      });
      return res;
    },

    getTopCommentSights(sights, topLevel = 20) {
      sights.sort((a, b) => {
        if (!a.comment) {
          a.comment = { 全部: 0 };
        }
        if (!b.comment) {
          b.comment = { 全部: 0 };
        }
        return b.comment['全部'] - a.comment['全部'];
      });
      let topData = sights.slice(0, topLevel);
      let nameList = [];
      let commentList = [];
      topData.forEach(sight => {
        nameList.push(sight.name);
        let commentArr = this.mapCommentToArray(sight.comment);
        commentList.push(commentArr);
      });
      return {
        name: nameList,
        value: commentList
      };
    },

    initCommentRankBar() {
      this.localSightList = this.sightList.slice(0);
      const data = this.getTopCommentSights(this.localSightList, 15);

      const option = {
        // title: {
        //   text: '景点评论最多'
        // },
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          orient: 'horizontal',
          bottom: '8%'
        },
        // 极坐标
        polar: {
          // radius: [0, '60%']
          radius: '60%'
        },
        // 径向轴
        radiusAxis: {},
        // 角度轴
        angleAxis: {
          type: 'category',
          data: data.name,
          axisLabel: {
            formatter: axisLabelFormatter
          }
        },
        series: this.commentRefer.map((v, i) => {
          // if (!i) return ;
          return {
            name: v,
            type: 'bar',
            data: data.value.map(_v => _v[i]),
            coordinateSystem: 'polar',
            stack: '评论分布总和'
          };
        })
      };
      init('sight-polar-bar', option, { legend: true });
    }
  },
  mounted() {
    this.initCommentRankBar();
  }
};
</script>

<style>
.sight-polar-bar {
  width: 100%;
}
</style>
