<template>
<div class="bw-logo" :class="posClass">
  Beautiful China
</div>
</template>

<script>
export default {
  props: {
    posType: {
      type: String,
      default: ''
    }
  },

  computed: {
    posClass() {
      switch (this.posType) {
        case 'fixed':
          return 'logo-fixed';
        default:
          return '';
      }
    }
  }
};
</script>

<style>
.bw-logo {
  font-size: 24px;
  /* font-family: Helvetica; */
  font-style: italic;
  font-weight: 300;
  color: #fff;
}

.logo-fixed {
  position: fixed;
  top: 20px;
  left: 40px;
}
</style>
