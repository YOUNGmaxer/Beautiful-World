<template>
  <div class="area-container bw-flex">
    <div class="ac--left bw-flex bw-flex--center">
      left
    </div>
    <div class="ac--center bw-flex bw-flex--center">
      <area-map></area-map>
    </div>
    <div class="ac--right bw-flex bw-flex--center">
      right
    </div>
  </div>
</template>

<script>
import AreaMap from './components/area-map.vue';

export default {
  components: {
    AreaMap
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
