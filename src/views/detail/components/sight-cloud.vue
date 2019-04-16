<template>
<div class="sight-cloud-wrap bw-full box-shadow-1">
  <chart-title>景点词云</chart-title>
  <div class="sight-cloud chart-title__height"></div>
</div>
</template>

<script>
import ChartTitle from './chart-title.vue';
import { mapState } from 'vuex';
import loadJs from 'Util/asyncLoadJs';
// 引入 d3 比例尺
import { scaleLinear } from 'd3';
import * as d3 from 'd3';

export default {
  components: {
    ChartTitle
  },

  data() {
    return {
      sightCloudList: [],
      cloudDom: null
    };
  },

  computed: {
    ...mapState('sight', ['sightListSortedByComment'])
  },

  methods: {
    getCloudList() {
      this.sightCloudList = this.sightListSortedByComment.map((sight) => {
        return [sight.name, Number(sight.comment['全部'])];
      });
      // console.log('sight-cloud', this.sightCloudList);
    },

    async initSightCloud() {
      const url = '//tencent.beecdn.cn/libs/wordcloud2.js/1.1.0/wordcloud2.js';
      await loadJs(url);
      this.cloudDom = document.getElementsByClassName('sight-cloud')[0];
      console.log('dom', this.cloudDom);
      this.getCloudList();
      const list = this.sightCloudList.slice(0, 100);
      const scaleList = this.getScaleList(list);
      this.renderWordCloud(scaleList, this.cloudDom);
    },

    getScaleList(list) {
      const valueList = list.map(item => item[1]);
      const maxValue = d3.max(valueList);
      const minValue = d3.min(valueList);
      const scale = scaleLinear()
        .domain([minValue, maxValue])
        .range([1, 100]);
      // console.log('scaleList', valueList, maxValue, minValue);
      // console.log('scale', scale(1000));
      const resList = list.map(item => [item[0], scale(item[1])]);
      console.log('scale list', resList);
      return resList;
    },

    renderWordCloud(list, dom) {
      const wordOption = {
        list,
        backgroundColor: 'rgba(255,255,255,1)',
        minSize: 10
      };
      WordCloud(dom, wordOption);
    }
  },

  mounted() {
    this.initSightCloud();
  }
};
</script>

<style>

</style>
