<template>
<div class="word-cloud-wrap bw-full box-shadow-1">
  <chart-title :hasButton="hasButton" @trigger-click="handleChartBtn"><slot></slot></chart-title>
  <div class="word-container chart-title__height">
    <div class="word-cloud bw-full"></div>
    <div class="word-setting" :class="settingClass">
      <ul class="setting__list" v-for="wordProp in wordPropsList" :key="wordProp">
        <li class="bw-flex bw-flex--align-c bw-flex--justify-between">
          <span class="setting-name">{{ wordPropsMap[wordProp] }}</span>
          <setting-switch @on-change="change(wordProp, $event)" :value="true"></setting-switch>
        </li>
      </ul>
    </div>
  </div>
</div>
</template>

<script>
import loadJs from 'Util/asyncLoadJs.js';
import axios from 'axios';
import { LoadingBar, Switch } from 'iview';
import ChartTitle from './chart-title.vue';
import { mapActions, mapState } from 'vuex';

export default {
  components: {
    LoadingBar,
    ChartTitle,
    SettingSwitch: Switch
  },
  props: {
    rid: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      hasButton: true,
      settingStatus: false,
      // 词性英文中文映射表
      wordPropsMap: {
        a: '形容词',
        n: '名词',
        v: '动词',
        ns: '地名'
      },
      // 当前分词数据中的词性种类
      wordPropsList: [],
      // 当前显示的词性种类
      curPropsList: [],
      originSegmentData: {},
      cloudDom: {}
    };
  },

  computed: {
    ...mapState('commentSegment', ['segmentData']),
    settingClass() {
      return this.settingStatus ? '' : 'word-setting--hidden';
    }
  },

  methods: {
    ...mapActions('commentSegment', ['getSegmentData']),

    convertSegmentData(data) {
      let resList = [];
      for (let propKey in data) {
        let item = data[propKey];
        for (let key in item) {
          resList.push([key, item[key]]);
        }
      }
      return resList;
    },

    // 将对象转化为数组
    convertObj2Array(obj) {
      let arr = [];
      for (let key in obj) {
        if ({}.hasOwnProperty.call(obj, key)) {
          arr.push([key, obj[key]]);
        }
      }
      return arr;
    },

    async getCommentSegment(rid) {
      // const url = `//localhost:3002/hanlp/api/segment/${rid}`;
      // const res = await axios.get(url);
      // this.originSegmentData = res.data;
      // await this.getSegmentData(rid);
      this.originSegmentData = this.segmentData;
      console.log('segmentData', this.originSegmentData);
      this.wordPropsList = Object.keys(this.originSegmentData);
      this.curPropsList = [].concat(this.wordPropsList);
      const list = this.convertSegmentData(this.originSegmentData);
      return list;
    },

    async initCloud() {
      // wordcloud2 的 cdn 链接
      LoadingBar.config({
        color: '#fef171',
        height: 4
      });
      LoadingBar.start();
      // 这个 cdn 突然出现问题，加载不到资源，好像是 301 永久重定向了
      // const url = 'https://cdn.bootcss.com/wordcloud2.js/1.1.0/wordcloud2.js';
      const url = '//tencent.beecdn.cn/libs/wordcloud2.js/1.1.0/wordcloud2.js';
      await loadJs(url);
      this.cloudDom = document.getElementsByClassName('word-cloud')[0];
      const list = await this.getCommentSegment(this.rid);
      this.updateWordCloud(list);
      LoadingBar.finish();
    },

    updateWordCloud(list) {
      const wordOption = {
        list,
        backgroundColor: 'rgba(255, 224, 224, 0.9)',
        minSize: 8
      };
      WordCloud(this.cloudDom, wordOption);
    },

    handleChartBtn() {
      this.settingStatus = !this.settingStatus;
    },

    // switch 触发事件
    change(msg, status) {
      if (status) {
        if (!this.curPropsList.includes(msg)) {
          this.curPropsList.push(msg);
        }
      } else {
        let index = this.curPropsList.indexOf(msg);
        if (index >= 0) {
          this.curPropsList.splice(index, 1);
        }
      }

      let list = [];
      this.curPropsList.forEach((prop => {
        let item = this.originSegmentData[prop];
        let itemArr = this.convertObj2Array(item);
        list = list.concat(itemArr);
      }));

      this.updateWordCloud(list);
      // console.log(this.curPropsList);
      // console.log(list);
    }
  },

  mounted() {
    this.initCloud();
  }
};
</script>

<style>
.word-cloud-wrap {
  overflow: hidden;
}
.word-container {
  --setting-width: 140px;
  position: relative;
}
.word-cloud {
  box-sizing: border-box;
  overflow: auto;
}
.word-setting {
  width: var(--setting-width);
  height: 100%;
  position: absolute;
  right: 0;
  top: 0;
  background: rgba(0,0,0,0.6);
  transition: 1s;
}
.word-setting--hidden {
  transform: translateX(var(--setting-width));
  transition: 1s;
}
.setting__list {
  list-style: none;
}
.setting__list li {
  color: #fff;
  margin: 10px;
}
</style>
