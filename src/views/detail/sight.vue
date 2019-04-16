<template>
<div class="sight-container">
  <Spin v-if="!sightData" size="large" fix></Spin>
  <star-bg v-if="ready"></star-bg>
  <sight-header @change-sight-view="toggleSightRightBottom"></sight-header>
  <div class="sight-main bw-flex">
    <div class="sight-left">
      <sight-card
        v-if="sightData"
        :sightData="sightData"
      ></sight-card>
    </div>
    <div class="sight-right">
      <div class="sight-right--top">
        <word-cloud v-if="isSegmentDataNotEmpty" :rid="rid">景点词云</word-cloud>
      </div>
      <!-- 两个同类组件需要切换显示 -->
      <div class="sight-right--bottom bw-flex" :class="{ hidden: !isCommentView }">
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
      <div class="sight-right--bottom bw-flex" :class="{ hidden: !isSegmentView }">
        <div class="right__chart--h100 right__word-rank">
          <word-rank v-if="isSegmentDataNotEmpty"></word-rank>
        </div>
        <div class="right__chart--h100 right__word-comment">
          <word-comment></word-comment>
        </div>
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
import SightHeader from './components/header-sight.vue';
import WordRank from './components/word-rank.vue';
import WordComment from './components/word-comment.vue';
import StarBg from 'Components/bg/star.vue';
import axios from 'axios';
import _url from 'Util/url';
import trigger from 'Util/trigger';
import { mapActions, mapState } from 'vuex';
import { Spin } from 'iview';

export default {
  components: {
    SightCard,
    WordCloud,
    TimeLine,
    TimeWeek,
    TimeSeason,
    WordRank,
    WordComment,
    StarBg,
    Spin,
    SightHeader
  },
  data() {
    return {
      sightData: null,
      sid: '1174758904',
      rid: '',
      ready: false,
      sightViewTag: '评论',
      mySegmentData: {}
    };
  },

  computed: {
    ...mapState('comment', ['comments', 'timeList']),
    ...mapState('commentSegment', ['segmentData']),
    isCommentView() {
      return this.sightViewTag === '评论';
    },
    isSegmentView() {
      return this.sightViewTag === '分词';
    },
    segmentDataLength() {
      return Object.keys(this.segmentData).length;
    },
    isSegmentDataNotEmpty() {
      // return Boolean(Object.keys(this.segmentData).length);
      return Boolean(Object.keys(this.mySegmentData).length);
    }
  },

  methods: {
    ...mapActions('comment', ['getCommentData', 'getCommentTimeList']),
    ...mapActions('commentSegment', ['getSegmentData']),

    toggleSightRightBottom(label) {
      this.sightViewTag = label;
      trigger('resize');
    },
    async initData() {
      const sid = _url.getPath(2);
      this.sid = sid || '1174758904';
      const url = _url.getUrl(`/api/sight/${this.sid}`);
      const res = await axios.get(url);
      this.sightData = res.data;
      // 确认数据库有该数据
      if (this.sightData) {
        this.rid = (this.sightData && this.sightData.rid) || '';
        // TODO: 处理没有评论数据的情况
        if (!this.rid) {
          console.warn('Oh! 数据库没有该景点评论数据');
        }
        await this.getCommentData(this.rid);
        await this.getCommentTimeList();
        await this.getSegmentData(this.rid);
        this.mySegmentData = this.segmentData;
        this.ready = true;
      } else { // 如果数据库没有该数据
        console.warn('数据库暂无该景点数据!');
      }
    }

    // async initSegmentData() {
    //   await this.getSegmentData();
    //   console.log(this.segmentData);
    // }
  },

  beforeMount() {
    this.initData();
  }
};
</script>

<style lang="scss">
@import 'Assets/style/functions/_common.scss';
.sight-container {
  width: 100vw;
  height: 100vh;
}
.sight-main {
  --diff-offset: 20px;
  height: calc(100% - var(--sight-header-h) + var(--diff-offset));
  margin-top: get-opposite(var(--diff-offset));
}
.sight-left {
  width: 450px;
  height: 100%;
  padding: 20px;
}
.sight-right {
  --right-top-h: 41.5%;
  height: 100%;
  flex: 1;
}
.sight-right--top {
  height: var(--right-top-h);
  padding: 20px 20px 10px 10px;
}
.sight-right--bottom {
  height: calc(100% - var(--right-top-h));
  flex-wrap: wrap;
  padding: 10px 10px 10px 0;
}
.right__chart {
  height: 50%;
  padding: 10px;
}
.right__chart--h100 {
  height: 100%;
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
.right__word-rank {
  width: 300px;
}
.right__word-comment {
  // width: 600px;
  width: calc(100% - 300px);
}
body {
  overflow: hidden;
}
</style>
