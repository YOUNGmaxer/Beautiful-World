<template>
<div class="detail-wrap bw-flex">
  <star-bg></star-bg>
  <div class="detail-map-container">
    <china-map :sightList="sightList"></china-map>
  </div>
  <!-- <div class="detail-feeds-container"> -->
  <list-rank :sightList="sightList" @resize-map="emitChartResize"></list-rank>
  <!-- </div> -->
</div>

</template>

<script>
import ChinaMap from './components/china-map.vue';
import ListRank from './components/list-rank.vue';
import StarBg from 'Components/bg/star.vue';
import axios from 'axios';
import _url from 'Util/url';
import { mapMutations } from 'vuex';

export default {
  components: {
    ChinaMap,
    StarBg,
    ListRank
  },

  data() {
    return {
      sightList: []
    };
  },

  methods: {
    ...mapMutations('chinaMap', ['SET_FLAG']),

    async getHotSightData() {
      const url = _url.getUrl(`/api/sight/city/name/${encodeURIComponent('热门景点')}?limit=100`);
      const { data } = await axios.get(url);
      this.sightList = data;
      console.log(data);
    },

    emitChartResize() {
      console.log('emitChartResize');
      this.$store.commit('chinaMap/SET_FLAG', true);
    }
  },

  mounted() {
    this.getHotSightData();
  }
};
</script>

<style>
.detail-map-container {
  height: 100vh;
  flex: 1;
}
.detail-feeds-container {
}
</style>
