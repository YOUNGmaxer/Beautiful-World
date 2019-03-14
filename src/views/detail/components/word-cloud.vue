<template>
<div class="word-cloud-wrap bw-full box-shadow-1">
  <chart-title><slot></slot></chart-title>
  <div class="word-cloud chart-title__height"></div>
</div>
</template>

<script>
import loadJs from 'Util/asyncLoadJs.js';
import axios from 'axios';
import { LoadingBar } from 'iview';
import ChartTitle from './chart-title.vue';

export default {
  components: {
    LoadingBar,
    ChartTitle
  },
  props: {
    rid: {
      type: String,
      default: ''
    }
  },

  methods: {
    convertSegmentData(data) {
      let resList = [];
      for (let propKey in data) {
        let item = data[propKey];
        for (let key in item) {
          resList.push([key, item[key]]);
        }
      }
      return resList;
    },

    async getCommentSegment(rid) {
      const url = `//localhost:3002/hanlp/api/segment/${rid}`;
      const res = await axios.get(url);
      console.log(res.data);
      const list = this.convertSegmentData(res.data);
      return list;
    },

    async initCloud() {
      // wordcloud2 的 cdn 链接
      LoadingBar.config({
        color: '#fef171',
        height: 4
      });
      LoadingBar.start();
      const url = 'https://cdn.bootcss.com/wordcloud2.js/1.1.0/wordcloud2.js';
      await loadJs(url);
      const dom = document.getElementsByClassName('word-cloud')[0];
      const list = await this.getCommentSegment(this.rid);
      const wordOption = {
        list,
        // backgroundColor: '#ffe0e0',
        backgroundColor: 'rgba(255, 224, 224, 0.9)'
      };
      WordCloud(dom, wordOption);
      LoadingBar.finish();
    }
  },

  mounted() {
    this.initCloud();
  }
};
</script>

<style>
.word-cloud {
  box-sizing: border-box;
  overflow: auto;
}
</style>
