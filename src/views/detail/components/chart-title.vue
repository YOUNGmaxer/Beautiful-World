<template>
<div class="chart-title bw-flex bw-flex--align-c">
  <div class="chart-title__split"></div>
  <p class="chart-title__text">
    <slot></slot>
  </p>
  <div class="chart-button" :class="buttonClass" v-if="hasButton" @click="emitClick"></div>
</div>
</template>

<script>
export default {
  props: {
    hasButton: {
      type: Boolean,
      default: false
    }
  },

  data() {
    return {
      buttonStatus: false
    }
  },

  computed: {
    buttonClass() {
      return this.buttonStatus ? '' : 'chart-button__close';
    }
  },

  methods: {
    emitClick() {
      this.buttonStatus = !this.buttonStatus;
      this.$emit('trigger-click');
    }
  },

  mounted() {
    this.buttonStatus = this.hasButton;
  }
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
  position: relative;
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
.chart-button {
  width: 20px;
  height: 20px;
  background: skyblue;
  position: absolute;
  right: 20px;
  border-radius: 50%;
  cursor: pointer;
}
.chart-button__close {
  background: #538ea6;
  box-shadow: inset 0 0 3px rgba(0,0,0,0.8);
}
</style>
