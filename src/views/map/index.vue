<template>
  <div class="map-container">
    <left-nav :tabList="tabList" :routeTag="false" :eventTag="true" @on-click="tabClickHandle"></left-nav>
    <div class="map__item bw-flex bw-flex--center">
      <keep-alive>
        <router-view></router-view>
      </keep-alive>
    </div>
  </div>
</template>

<script>
import { Button } from 'iview';
import LeftNav from 'Components/nav';
import { mapState, mapMutations } from 'vuex';

export default {
  components: {
    Button,
    LeftNav
  },

  data() {
    return {
      tabList: [{
        name: '中国',
        path: 'china'
      }, {
        name: '北京',
        path: 'beijing'
      }, {
        name: '天津',
        path: 'tianjing'
      }, {
        name: '广东',
        path: 'guangdong'
      }, {
        name: '台湾',
        path: 'taiwan'
      }, {
        name: '河北',
        path: 'hebei'
      }, {
        name: '河南',
        path: 'henan'
      }, {
        name: '山西',
        path: 'shanxi'
      }, {
        name: '内蒙古',
        path: 'neimenggu'
      }]
    }
  },

  computed: {
    ...mapState('map', ['mapType'])
  },

  methods: {
    ...mapMutations('map', ['SET_MAP_TYPE']),
    tabClickHandle(tabItem) {
      this.$store.commit('map/SET_MAP_TYPE', tabItem.name);
    }
  }
}
</script>

<style lang="scss">
.map-container {
  margin-left: var(--left-nav-width);
  height: 100vh;
}

.map__item {
  height: 100%;
}
</style>
