<template>
<div class="sight-container bw-flex">
  <star-bg v-if="ready"></star-bg>
  <div class="sight-left">
    <sight-card
      v-if="sightData"
      :sightData="sightData"
    ></sight-card>
  </div>
  <div class="sight-right">
    <div class="sight-right--top">
      <word-cloud v-if="rid" :rid="rid">景点词云</word-cloud>
    </div>
    <div class="sight-right--bottom bw-flex">
      <div class="right__chart right__time-line">
        <time-line v-if="ready" groupType="month"></time-line>
      </div>
      <div class="right__chart right__time-week">
        <time-week v-if="ready"></time-week>
      </div>
      <div class="right__chart right__time-line-season">
        <time-line v-if="ready" groupType="season"></time-line>
      </div>
      <div class="right__chart right__time-season">
        <time-season v-if="ready"></time-season>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import SightCard from './components/sight-card.vue';
import WordCloud from './components/word-cloud.vue';
import TimeLine from './components/time-line.vue';
import TimeWeek from './components/time-week.vue';
import TimeSeason from './components/time-season-bar.vue';
import StarBg from 'Components/bg/star.vue';
import axios from 'axios';
import _url from 'Util/url';
import { mapActions, mapState } from 'vuex';

export default {
  components: {
    SightCard,
    WordCloud,
    TimeLine,
    TimeWeek,
    TimeSeason,
    StarBg
  },
  data() {
    return {
      sightData: null,
      sid: '1174758904',
      rid: '',
      ready: false
    };
  },

  computed: {
    ...mapState('comment', ['comments', 'timeList'])
  },

  methods: {
    ...mapActions('comment', ['getCommentData', 'getCommentTimeList']),

    async initData() {
      const sid = _url.getPath(2);
      this.sid = sid || '1174758904';
      const url = _url.getUrl(`/api/sight/${this.sid}`);
      const res = await axios.get(url);
      console.log('sight', res.data);
      this.sightData = res.data;
      this.rid = (this.sightData && this.sightData.rid) || '';
      await this.getCommentData(this.rid);
      await this.getCommentTimeList();
      this.ready = true;
    }
  },

  beforeMount() {
    this.initData();
  }
};
</script>

<style>
.sight-container {
  width: 100vw;
  height: 100vh;
}
.sight-left {
  width: 500px;
  height: 100%;
  padding: 20px;
}
.sight-right {
  height: 100%;
  flex: 1;
}
.sight-right--top {
  height: 400px;
  padding: 20px 20px 10px 10px;
}
.sight-right--bottom {
  height: calc(100% - 400px);
  flex-wrap: wrap;
  padding: 10px 10px 10px 0;
}
.right__chart {
  height: 50%;
  padding: 10px;
}
.right__time-line {
  width: 60%;
}
.right__time-week {
  width: 40%;
}
.right__time-line-season {
  width: 60%;
}
.right__time-season {
  width: 40%;
}
body {
  overflow: hidden;
}
</style>
