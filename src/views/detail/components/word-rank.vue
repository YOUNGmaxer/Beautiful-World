<template>
<div class="word-rank bw-full box-shadow-1">
  <chart-title>
    <template v-slot:default>
      词频统计
    </template>
    <!-- 切换分词类型tab -->
    <template v-slot:tab>
      <div
        v-for="(item, index) in tabList"
        :key="index"
        class="word-tab"
        :class="{'word-tab--active':  wordTabSelected === index}"
        @click="changeWordTab(index, item)"
      >{{ item }}</div>
    </template>
  </chart-title>
  <div class="word-rank__wrap">
    <div class="wr__top-item bw-flex bw-flex--col bw-flex--justify-c hover"
      @click="clickListItem(listTopOneWord, tabList[wordTabSelected])"
    >
      <p class="word">{{ listTopOneWord }}</p>
      <p class="weight">{{ listTopOneWeight }}</p>
    </div>
    <ul class="wr__rest-list scroll-bar">
      <li
        v-for="(item, index) in tabSelectedData.slice(1)"
        class="wr__item bw-flex bw-flex--align-c hover"
        :key="index"
        @click="clickListItem(item[0], tabList[wordTabSelected])"
      >
        <div class="item-number">{{ index + 2 }}</div>
        <div class="item-word">{{ item[0] }}</div>
        <div class="item-weight">{{ item[1] }}</div>
      </li>
    </ul>
  </div>
</div>
</template>

<script>
import ChartTitle from './chart-title.vue';
import { mapActions, mapState, mapMutations } from 'vuex';

export default {
  props: {
    wordSeg: {
      type: Object,
      default: null
    }
  },
  components: {
    ChartTitle
  },
  data() {
    return {
      // 当前选中的wordTab
      wordTabSelected: 0,
      tabSelectedData: [],
      tabList: ['a', 'n', 'v', 'ns'],
      tabData: {}
    };
  },
  computed: {
    ...mapState('commentSegment', ['segmentData', 'aWordData', 'nWordData', 'vWordData', 'nsWordData', 'curFocusWord']),
    ...mapMutations('commentSegment', ['SET_CURFOCUS_WORD', 'SET_CURFOCUS_TYPE']),

    listTopOneWord() {
      return this.tabSelectedData[0] && this.tabSelectedData[0][0];
    },
    listTopOneWeight() {
      return this.tabSelectedData[0] && this.tabSelectedData[0][1];
    }
  },
  methods: {
    ...mapActions('commentSegment', ['getSegmentData', 'sepSegmentData']),

    changeWordTab(index, item) {
      this.wordTabSelected = index;
      this.tabSelectedData = this.tabData[this.tabList[index]] || [];
    },

    // 排序器
    compare(a, b) {
      return b[1] - a[1];
    },

    // 点击列表
    clickListItem(word, tab) {
      // console.log(word, tab);
      this.$store.commit('commentSegment/SET_CURFOCUS_WORD', word);
      this.$store.commit('commentSegment/SET_CURFOCUS_TYPE', tab);
    },

    async initRank() {
      await this.sepSegmentData();
      this.tabData.a = this.aWordData && this.aWordData.slice().sort(this.compare);
      this.tabData.n = this.nWordData && this.nWordData.slice().sort(this.compare);
      this.tabData.v = this.vWordData && this.vWordData.slice().sort(this.compare);
      this.tabData.ns = this.nsWordData && this.nsWordData.slice().sort(this.compare);
      this.tabSelectedData = this.tabData.a || [];
    }
  },
  mounted() {
    this.initRank();
  }
};
</script>

<style lang="scss">
.word-rank__wrap {
  --top-item-h: 90px;
  height: calc(100% - var(--chart-title-height));
  overflow: hidden;
}
.wr__top-item {
  height: var(--top-item-h);
  // background: rgba(50,50,190,0.3);
  background: rgba(32,208,142,0.7);
  color: #eee;
  .word {
    font-size: 26px;
    text-align: center;
  }
  .weight {
    font-size: 20px;
    text-align: center;
  }
}
.wr__rest-list {
  --bg-color: rgba(255,255,255,0.8);

  height: calc(100% - var(--top-item-h));
  overflow-y: scroll;
  background: var(--bg-color);

  // &::-webkit-scrollbar {
  //   width: 3px;
  //   // background: var(--bg-color);
  // }
  // &::-webkit-scrollbar-thumb {
  //   background: rgba(0,0,0,0.4);
  //   border-radius: 50px;
  // }
}
.wr__item {
  --margin-h: 10px;
  --number-length: 22px;
  position: relative;
  height: 32px;
  // background: rgba(60,75,83,0.8);
  // background: var(--bg-color);
  // color: rgb(47,95,212);
  color: rgb(60,75,83);

  .item-number {
    width: var(--number-length);
    height: var(--number-length);
    line-height: var(--number-length);
    margin: 0 var(--margin-h);
    border-radius: 50%;
    // background: skyblue;
    // color: #666;
    text-align: center;
  }
  .item-word {
    flex: 6;
    font-size: 14px;
  }
  .item-weight {
    flex: 1;
    text-align: center;
    margin: 0 var(--margin-h);
  }

  // &:not(:last-child)::after {
  &::after {
    content: "";
    position: absolute;
    bottom: 0;
    right: 0;
    width: calc(100% - var(--margin-h)*2 - var(--number-length));
    height: 1px;
    background: rgba(124,14,14,0.4);
  }
}

.word-tab {
  width: 20px;
  height: 20px;
  background: #888;
  border-radius: 50%;
  margin: 0 4px;
  font-size: 12px;
  font-weight: 500;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}
.word-tab--active {
  background: rgb(114,91,16);
}
</style>
