<template>
<div class="chart-title bw-flex bw-flex--align-c">
  <div class="chart-title__split"></div>
  <p class="chart-title__text">
    <slot></slot>
  </p>
</div>
</template>

<script>
export default {

};
</script>

<style>
:root {
  --chart-title-height: 28px;
}
.chart-title {
  background: rgb(248, 248, 248);
  font-size: 16px;
  font-weight: 400;
  line-height: 28px;
  height: var(--chart-title-height);
}
.chart-title__split {
  width: 3px;
  height: 18px;
  background: rgb(56, 219, 133);
  margin-left: 8px;
  margin-right: 10px;
}
.chart-title__text {
}
</style>
