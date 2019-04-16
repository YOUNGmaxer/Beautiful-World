<template>
<div class="header-common">
  <div class="hc-logo bw-flex bw-flex--center">
    <Logo></Logo>
  </div>
  <div class="hc-title hc-title--center">
    <slot></slot>
  </div>
  <div class="hc-option"></div>
</div>
</template>

<script>
import Logo from 'Components/logo.vue';

export default {
  components: {
    Logo
  }
};
</script>

<style>
:root {
  --sight-common-h: 60px;
}
.header-common {
  height: var(--sight-common-h);
  position: relative;

  color: #fff;
}
.hc-logo {
  width: 200px;
  height: 100%;
}
.hc-title {
  font-size: 24px;
}
.hc-title--center {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.hc-option {
  position: absolute;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
}
</style>
