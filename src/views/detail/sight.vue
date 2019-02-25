<template>
<div class="sight-container bw-flex">
  <div class="sight-left">
    <sight-card
      v-if="sightData"
      :sightData="sightData"
    ></sight-card>
  </div>
  <div class="sight-right">
    <word-cloud
      v-if="rid"
      :rid="rid"
    ></word-cloud>
    <div class="sight-right--bottom">
      <div class="right__time-line">
        <time-line
          v-if="rid"
          :rid="rid"
        ></time-line>
      </div>
      <div class="right__time-week">
        <time-week>
        </time-week>
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
import axios from 'axios';
import _url from 'Util/url';

export default {
  components: {
    SightCard,
    WordCloud,
    TimeLine,
    TimeWeek
  },
  data() {
    return {
      sightData: null,
      sid: '1174758904',
      rid: ''
    };
  },

  beforeMount() {
    const sid = _url.getPath(2);
    this.sid = sid || '1174758904';
    const url = _url.getUrl(`/api/sight/${this.sid}`);
    axios
      .get(url)
      .then(res => {
        console.log('sight', res.data);
        this.sightData = res.data;
        this.rid = (this.sightData && this.sightData.rid) || '';
      });
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
}
.sight-right {
  height: 100%;
  flex: 1;
}
.sight-right--bottom {
  height: calc(100% - 400px);
}
.right__time-line, .right__time-week {
  /* display: inline-block; */
  float: left;
  width: 50%;
  height: 50%;
}
body {
  overflow: hidden;
}
</style>
