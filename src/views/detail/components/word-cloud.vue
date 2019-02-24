<template>
<div class="word-cloud">
aaa
</div>
</template>

<script>
import loadJs from 'Util/asyncLoadJs.js';

export default {
  methods: {
    initCloud() {
      // wordcloud2 的 cdn 链接
      const url = 'https://cdn.bootcss.com/wordcloud2.js/1.1.0/wordcloud2.js';
      loadJs(url)
        .then(() => {
          const dom = document.getElementsByClassName('word-cloud')[0];
          const list = [
            ['foo', 12],
            ['bar', 5]
          ];
          WordCloud(dom, { list });
        });
    }
  },

  mounted() {
    this.initCloud();
  }
};
</script>

<style>
.word-cloud {
  width: 100%;
  height: 400px;
}
</style>
