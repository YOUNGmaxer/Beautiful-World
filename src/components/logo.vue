<template>
<div class="bw-logo" :class="posClass" @click="backToHome">
  Beautiful China
</div>
</template>

<script>
import trigger from 'Util/trigger';

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
  },

  methods: {
    backToHome() {
      this.$router.push('/detail');
      trigger('resize');
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
  cursor: pointer;
}

.logo-fixed {
  position: fixed;
  top: 20px;
  left: 40px;
}
</style>
