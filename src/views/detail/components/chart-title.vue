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
  --chart-title-height: 32px;
}
.chart-title {
  background: rgb(30, 25, 50);
  font-size: 16px;
  font-weight: 300;
  line-height: var(--chart-title-height);
  height: var(--chart-title-height);
  color: #fff;
}
.chart-title__split {
  width: 3px;
  height: 18px;
  background: rgb(145, 129, 18);
  margin-left: 8px;
  margin-right: 10px;
}
.chart-title__text {
}
div .chart-title__height {
  height: calc(100% - var(--chart-title-height));
}
</style>
