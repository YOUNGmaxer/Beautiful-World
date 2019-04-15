<template>
<div class="stats-top">
  <p class="stats-data">{{ statsData }}</p>
  <p class="stats-info"><slot></slot></p>
</div>
</template>

<script>
// TODO: 添加一个未获取到数据前的loading
export default {
  props: {
    statsData: {
      type: [String, Number],
      default: '2888'
    }
  }
};
</script>

<style>
.stats-top {
  color: #fff;
}
.stats-data {
  text-align: center;
  font-size: 26px;
  font-weight: 300;
}
.stats-info {
  text-align: center;
}
</style>
