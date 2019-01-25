<template>
  <div class="area-container bw-flex">
    <div class="ac--left bw-flex bw-flex--col">
      <sight-bar v-if="sightList && sightList.length" :sight-list="sightList"></sight-bar>
      <sight-pie v-if="sightList && sightList.length" :sight-list="sightList"></sight-pie>
    </div>
    <div class="ac--center bw-flex bw-flex--center">
      <area-map v-if="sightList && sightList.length" :code="code" :sight-list="sightList"></area-map>
    </div>
    <div class="ac--right bw-flex bw-flex--col">
      <sight-multi-bar v-if="sightList && sightList.length" :sight-list="sightList"></sight-multi-bar>
      <sight-polar-bar v-if="sightList && sightList.length" :sight-list="sightList"></sight-polar-bar>
    </div>
  </div>
</template>

<script>
import AreaMap from './components/area-map.vue';
import SightBar from './components/sight-bar.vue';
import SightPie from './components/sight-pie.vue';
import SightMultiBar from './components/sight-multi-bar.vue';
import SightPolarBar from './components/sight-polar-bar.vue';
import { mapActions, mapState } from 'vuex';
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
  },
  methods: {
    ...mapActions('sight', ['getProvSights'])
  },
  created() {
    // 根据 /detail/code 来选择加载哪个地区的地图，默认情况下加载北京地图
    const pathCode = _url.getPath(2);
    this.code = pathCode ? pathCode : '11';
    this.getProvSights(this.code)
      .then(data => {
        this.sightList = data;
      })
  }
}
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
.ac--center {
  flex: 1;
  border-left: 1px solid skyblue;
  border-right: 1px solid skyblue;
}
</style>
