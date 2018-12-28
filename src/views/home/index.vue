<template>
  <div class="home-container bw-flex bw-flex--center">
    <LeftNav :tabList="tabList" @on-click="handleTabClick"></LeftNav>
    <div class="echart__container bw-flex bw-flex--center">
      <router-view></router-view>
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
          type: 'hot-map'
        },
        {
          name: '柱状图',
          type: 'bar-map'
        },
        {
          name: '堆叠柱状图',
          type: 'bar-map-0'
        }
      ]
    }
  },

  mounted() {
  },

  methods: {
    // 对 tab 进行路由
    handleTabClick(tabType) {
      this.$router.push({
        path: tabType
      });
    }
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
  width: 400px;
  height: 400px;
  margin: 0 auto;
  border: 1px solid skyblue;
}
</style>
