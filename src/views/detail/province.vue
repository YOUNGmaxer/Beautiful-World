<template>
<div>
<common-header>{{ areaName }}</common-header>
<div class="area-container bw-flex">
  <Spin v-if="!isListPrepared" size="large" fix></Spin>
  <star-bg></star-bg>
  <div class="ac--left bw-flex bw-flex--col">
    <div class="ac--left-box">
      <sight-bar v-if="isListPrepared" :sight-list="sightList">景点销量排行</sight-bar>
    </div>
    <div class="ac--left-box">
      <sight-flexbar v-if="isListPrepared"></sight-flexbar>
    </div>
    <div class="ac--left-box">
      <sight-pie v-if="isListPrepared" :sight-list="sightList">景点级别统计</sight-pie>
    </div>
  </div>
  <div class="ac--center bw-flex bw-flex--center">
    <area-map v-if="isListPrepared" :code="code" :sight-list="sightList"></area-map>
  </div>
  <div class="ac--right bw-flex bw-flex--col">
    <div class="ac--right-box">
      <sight-multi-bar v-if="isListPrepared" :sight-list="sightList">
        景点城市分布
      </sight-multi-bar>
    </div>
    <div class="ac--right-box">
      <sight-cloud v-if="isListPrepared"></sight-cloud>
    </div>
    <div class="ac--right-box">
      <sight-polar-bar v-if="isListPrepared" :sight-list="sightList">
        景点评论最多
      </sight-polar-bar>
    </div>
  </div>
</div>
</div>

</template>

<script>
import AreaMap from './components/area-map.vue';
import SightBar from './components/sight-bar.vue';
import SightFlexbar from './components/sight-flexbar.vue';
import SightPie from './components/sight-pie.vue';
import SightMultiBar from './components/sight-multi-bar.vue';
import SightPolarBar from './components/sight-polar-bar.vue';
import StarBg from 'Components/bg/star.vue';
import SightCloud from './components/sight-cloud.vue';
import CommonHeader from './components/header-common.vue';
import { mapActions, mapState, mapMutations } from 'vuex';
import _url from 'Util/url';
import { Spin } from 'iview';

export default {
  components: {
    AreaMap,
    SightBar,
    SightFlexbar,
    SightPie,
    SightMultiBar,
    SightPolarBar,
    SightCloud,
    StarBg,
    Spin,
    CommonHeader
  },
  data() {
    return {
      code: '11',
      sightList: []
    };
  },
  computed: {
    ...mapState('sight', ['areaName']),
    // ...mapMutations('sight', ['SET_SIGHTLIST_SORTED_BY_COMMENT']),
    isListPrepared() {
      return this.sightList && this.sightList.length;
    }
  },
  methods: {
    ...mapActions('sight', ['getProvSights']),
    async getSightsData() {
      // 根据 /detail_province/code 来选择加载哪个地区的地图，默认情况下加载北京地图
      const pathCode = _url.getPath(2);
      this.code = pathCode || '11';
      const data = await this.getProvSights({ code: this.code });
      this.sightList = data;
      // 对 sightList 进行排序
      // this.$store.commit('sight/SET_SIGHTLIST_SORTED_BY_COMMENT');
    }
  },
  // beforeRouteEnter(to, from, next) {
  //   // 判断是否是从城市页面返回的，如果是就直接使用缓存数据而不重新加载数据
  //   if (from.name === 'detail_city') {
  //     to.meta.isBack = true;
  //   }
  //   next();
  // },
  created() {
    this.getSightsData();
  }
  // activated() {
  //   if (!this.$route.meta.isBack) {
  //     this.getSightsData();
  //   }
  //   this.$route.meta.isBack = false;
  // }
};
</script>

<style style="scss">
.area-container {
  width: 100vw;
  height: calc(100vh - var(--sight-common-h));
  position: relative;
}
.ac--left, .ac--right {
  width: 25%;
  max-width: 400px;
}
.ac--left-box, .ac--right-box {
  width: 100%;
  /* height: 50%; */
  flex: 1;
  padding: 0 10px 10px 10px;
}
.ac--center {
  flex: 1;
}

/* 自定义 spin 组件样式 */
div .ivu-spin-fix {
  background-color: rgba(255,255,255,0.1);
}
div .ivu-spin-large .ivu-spin-dot {
  width: 80px;
  height: 80px;
}
</style>
