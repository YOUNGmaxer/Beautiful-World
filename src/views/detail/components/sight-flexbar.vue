<template>
<div class="sight-flexbar-wrap bw-full box-shadow-1">
  <chart-title>
    景点评论量排行
  </chart-title>
  <div class="sight-flexbar"></div>
</div>
</template>

<script>
import 'echarts/lib/component/tooltip';
import ChartTitle from './chart-title.vue';
import { mapState, mapMutations } from 'vuex';
import { initLoading, initBase } from '../js/init';
import { transArray } from 'Util/convert';

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

  computed: {
    ...mapState('sight', ['sightListSortedByComment']),
    ...mapMutations('sight', ['SET_SIGHTLIST_SORTED_BY_COMMENT'])
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

    getTopCommentSights(topLevel = 20) {
      if (!this.sightListSortedByComment) {
        this.$store.commit('sight/SET_SIGHTLIST_SORTED_BY_COMMENT');
      }
      let topData = this.sightListSortedByComment.slice(0, topLevel);
      let nameList = [];
      let commentList = [];
      topData.forEach(sight => {
        nameList.push(sight.name);
        let commentArr = this.mapCommentToArray(sight.comment);
        commentList.push(commentArr);
      });
      let commentReferList = transArray(commentList);
      // console.log('commentReferList', commentReferList);
      return {
        name: nameList,
        value: commentReferList
      };
    },
    initCommentRankFlexbar() {
      const chart = initLoading('sight-flexbar');
      const barData = this.getTopCommentSights(10);
      console.log('sight-flexbar', barData);
      const option = {
        tooltip: {
          trigger: 'axis'
        },
        grid: {
          containeLabel: true,
          left: '20%',
          right: '8%',
          top: '10%',
          bottom: '20%'
        },
        legend: {
          orient: 'horizontal',
          top: '0',
          itemWidth: 10,
          itemHeight: 10,
          textStyle: {
            color: '#eee'
          }
        },
        yAxis: {
          type: 'value'
        },
        xAxis: {
          type: 'category',
          data: barData.name,
          axisLabel: {
            rotate: -50,
            fontSize: 10
          }
        },
        series: this.commentRefer.slice(1).map((commentType, i) => {
          return {
            name: commentType,
            type: 'bar',
            stack: '总量',
            data: barData.value[i + 1]
          };
        })
      };

      initBase(chart, option);
    }
  },

  mounted() {
    this.initCommentRankFlexbar();
  }
};
</script>


<style>
.sight-flexbar {
  width: 100%;
  height: calc(100% - var(--chart-title-height));
}
</style>
