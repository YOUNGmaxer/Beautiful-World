<template>
<div class="detail-map-container">
  <star-bg></star-bg>
  <china-map :sightList="sightList"></china-map>
</div>
</template>

<script>
import ChinaMap from './components/china-map.vue';
import StarBg from 'Components/bg/star.vue';
import axios from 'axios';
import _url from 'Util/url';

export default {
  components: {
    ChinaMap,
    StarBg
  },

  data() {
    return {
      sightList: []
    };
  },

  methods: {
    async getHotSightData() {
      const url = _url.getUrl(`/api/sight/city/name/${encodeURIComponent('热门景点')}`);
      const { data } = await axios.get(url);
      this.sightList = data;
      console.log(data);
    }
  },

  mounted() {
    this.getHotSightData();
  }
};
</script>

<style>
.detail-map-container {
  width: 100%;
  height: 100vh;
}
</style>
