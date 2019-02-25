<template>
<div class="word-cloud">

</div>
</template>

<script>
import loadJs from 'Util/asyncLoadJs.js';
import axios from 'axios';
import { LoadingBar } from 'iview';

export default {
  components: {
    LoadingBar
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
      LoadingBar.start();
      const url = 'https://cdn.bootcss.com/wordcloud2.js/1.1.0/wordcloud2.js';
      await loadJs(url);
      const dom = document.getElementsByClassName('word-cloud')[0];
      const list = await this.getCommentSegment(this.rid);
      console.log(list);
      WordCloud(dom, { list });
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
  /* width: 100%; */
  height: 400px;
  padding: 20px 40px 20px 10px;
  box-sizing: border-box;
}
</style>
