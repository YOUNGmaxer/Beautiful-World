<template>
  <div>
    <LeftNav :tabList="tabList" @on-click="handleTabClick"></LeftNav>
    <!-- <div class="chart-container">
      <div class="chart-container__wrap"></div>
    </div> -->
    <router-view></router-view>
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
        '热力图', '柱状图', '堆叠柱状图'
      ]
    }
  },

  mounted() {
  },

  methods: {
    handleTabClick(tabIndex) {
      console.log(tabIndex);
      this.$router.push({
        params: { tabName: tabIndex }
      });
    }
  }
}
</script>

<style>
</style>
