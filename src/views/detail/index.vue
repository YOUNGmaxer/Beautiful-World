<template>
<div class="area-container bw-flex">
  <div class="ac--left bw-flex bw-flex--col">
    <div class="ac--left-box">
      <sight-bar v-if="isListPrepared" :sight-list="sightList">景点销量Top20</sight-bar>
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
      <sight-polar-bar v-if="isListPrepared" :sight-list="sightList">
        景点评论最多
      </sight-polar-bar>
    </div>
  </div>
</div>
</template>

<script>
import AreaMap from './components/area-map.vue';
import SightBar from './components/sight-bar.vue';
import SightPie from './components/sight-pie.vue';
import SightMultiBar from './components/sight-multi-bar.vue';
import SightPolarBar from './components/sight-polar-bar.vue';
import { mapActions } from 'vuex';
import _url from 'Util/url';

export default {
  components: {
    AreaMap,
    SightBar,
    SightPie,
    SightMultiBar,
    SightPolarBar
  },
  data() {
    return {
      code: '11',
      sightList: []
    }
  },
  computed: {
    isListPrepared() {
      return this.sightList && this.sightList.length;
    }
  },
  methods: {
    ...mapActions('sight', ['getProvSights'])
  },
  created() {
    // 根据 /detail/code 来选择加载哪个地区的地图，默认情况下加载北京地图
    const pathCode = _url.getPath(2);
    this.code = pathCode || '11';
    this.getProvSights({ code: this.code })
      .then(data => {
        this.sightList = data;
      });
  }
};
</script>

<style style="scss">
.area-container {
  width: 100vw;
  height: 100vh;
}
.ac--left, .ac--right {
  width: 25%;
  max-width: 400px;
}
.ac--left-box, .ac--right-box {
  width: 100%;
  height: 50%;
  padding: 10px;
}
.ac--center {
  flex: 1;
}
</style>
