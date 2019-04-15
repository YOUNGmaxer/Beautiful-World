<template>
<div class="header-stats header-top bw-flex">
  <!-- <div class="header-logo">
    <Logo></Logo>
  </div> -->
  <div class="header-topstats bw-flex bw-flex--center">
    <top-stats :statsData="sightStats">景点数</top-stats>
    <top-stats :statsData="commentStats">评论人数</top-stats>
  </div>
</div>
</template>

<script>
import Logo from 'Components/logo.vue';
import TopStats from './stats-top.vue';
import axios from 'axios';
import _url from 'Util/url';

export default {
  components: {
    Logo,
    TopStats
  },
  data() {
    return {
      sightStats: 0,
      commentStats: 0
    };
  },
  methods: {
    async getStatsData(dbName) {
      const url = _url.getUrl(`/api/count/${dbName}`);
      const { data } = await axios.get(url);
      console.log(data);
      return data;
    },

    async setStatsData() {
      this.sightStats = await this.getStatsData('sights');
      this.commentStats = await this.getStatsData('comments');
    }
  },
  mounted() {
    this.setStatsData();
  }
};
</script>

<style lang="scss">
.header-stats {
  width: 100%;
  height: 80px;
  // background: rgba(255,255,255,0.1);
  z-index: 2;
}
.header-top {
  position: absolute;
  top: 0;
  left: 0;
}
.header-logo {
  display: flex;
  height: 100%;
  width: 200px;
  justify-content: center;
  align-items: center;
}
.header-topstats {
  height: 100%;
  flex: 1;
  .stats-top {
    margin: 0 16px;
  }
}
</style>
