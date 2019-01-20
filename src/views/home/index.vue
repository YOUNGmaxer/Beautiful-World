<template>
  <div class="home-container bw-flex bw-flex--center">
    <LeftNav :tabList="tabList" :routeTag="false"></LeftNav>
    <div class="echart__container bw-flex bw-flex--center">
      <keep-alive>
        <router-view></router-view>
      </keep-alive>
    </div>
  </div>
</template>

<script>
// TODO 这里引入 iview 在构建时出现了 unexpected token: const 的错误
// import { Button } from 'iview';
import LeftNav from 'Components/nav';

// 引入基本模版
let echarts = require('echarts/lib/echarts');
// 引入柱状图组件
require('echarts/lib/chart/bar');

export default {
  name: 'Home',

  components: {
    // Button,
    LeftNav
  },

  data() {
    return {
      tabList: [
        {
          name: '热力图',
          path: 'hot-map'
        },
        {
          name: '销量',
          path: 'bar-map-top'
        },
        {
          name: '景点数量',
          path: 'bar-map-num'
        }
      ]
    }
  },

  mounted() {
    
  },

  methods: {
  }
}
</script>

<style lang="scss">
@import 'Style/_global.scss';
.home-container {
  margin-left: var(--left-nav-width);
  height: 100vh;
  position: relative;
}

.echart__container {
  width: 600px;
  height: 600px;
  margin: 0 auto;
  border: 1px solid skyblue;
}
</style>
