<template>
  <div class="map-container">
    <left-nav :tabList="tabList" :routeTag="false"></left-nav>
  </div>
</template>

<script>
import { Button } from 'iview';
import LeftNav from 'Components/nav';

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
      }]
    }
  }
}
</script>

<style>

</style>
