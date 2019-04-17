<template>
<div class="title__statistics bw-flex bw-full">
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
  /* padding-top: 15px; */
  padding-bottom: 15px;
  padding-right: 15px;
}
.data-box {
  flex-grow: 1;
  font-size: 40px;
  color: #ccc;
  background: rgba(255,255,255,0.1);
  margin-right: 15px;
  padding: 10px;
}
.data-box:last-child {
  margin-right: 0;
}
.data-number {
  font-size: 70px;
  font-weight: 100;
}
.data-name {
  font-size: 13px;
  font-weight: 700;
}
</style>
