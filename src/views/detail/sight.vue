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
  </div>
</div>
</template>

<script>
import SightCard from './components/sight-card.vue';
import WordCloud from './components/word-cloud.vue';
import axios from 'axios';
import _url from 'Util/url';

export default {
  components: {
    SightCard,
    WordCloud
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
</style>
