<template>
<div class="city-container bw-flex">
  <div class="cc--left">
    left
  </div>
  <div class="cc--right">
    <div class="cc__statistics">statistics</div>
    <div class="cc__charts bw-flex">
      <div class="chart--left">left</div>
      <div class="chart--right">right</div>
    </div>
  </div>
</div>
</template>

<script>
export default {

};
</script>

<style>
.city-container {
  width: 100vw;
  height: 100vh;
}
.cc--left {
  height: 100%;
  width: 40%;
}
.cc--right {
  height: 100%;
  width: 60%;
}
.cc__statistics {
  height: 30%;
}
.cc__charts {
  width: 100%;
  height: 70%;
}
.chart--left, .chart--right {
  width: 50%;
  height: 100%;
}
</style>
