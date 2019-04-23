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
import { getScaleList } from '../js/convert';

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
      this.getCloudList();
      const list = this.sightCloudList.slice(0, 100);
      // console.log('list', list);
      const scaleList = getScaleList(list, 1, 40);
      console.log('scaleList', scaleList);
      this.renderWordCloud(scaleList, this.cloudDom);
    },

    renderWordCloud(list, dom) {
      const that = this;
      const wordOption = {
        list,
        backgroundColor: 'rgba(255,255,255,0.8)',
        minSize: 1,
        click: function routeToSight(item, dimension, event) {
          const sightName = item[0];
          const sightObj = that.sightListSortedByComment.find(sight => {
            return sight.name === sightName;
          });
          that.$router.push(`/detail_sight/${sightObj.sid}`);
          // console.log(item, sightName, sightObj);
          // console.log('clickWord', item, dimension, event);
        }
      };
      WordCloud(dom, wordOption);
    }
  },

  mounted() {
    this.initSightCloud();
  }
};
</script>

<style lang="scss">
.sight-cloud {
  overflow: hidden;

  span {
    cursor: pointer;
  }
}
</style>
