<template>
<div class="title__statistics bw-flex">
  <div class="data-box bw-flex bw-flex--col bw-flex--center"
    v-for="(item, index) in dataBox"
    :key="index"
  >
    <span class="data-number">{{ item.number }}</span>
    <span class="data-name">{{ item.name }}</span>
  </div>
</div>
</template>

<script>
import { mapState } from 'vuex';
export default {
  props: {
    dataBox: {
      type: Array,
      default: () => []
    },
    sightNum: {
      type: Number,
      default: 0
    }
  },
  computed: {
    // ...mapState('sight', ['sightList'])
  }
};
</script>

<style>
.title__statistics {
  width: 100%;
  height: 100%;
}
.data-box {
  flex: 1;
  font-size: 40px;
}
.data-number {
  font-size: 70px;
}
.data-name {
  font-size: 12px;
}
</style>
