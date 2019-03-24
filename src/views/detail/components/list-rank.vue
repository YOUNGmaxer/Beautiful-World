<template>
<div class="list-rank-wrap bw-flex" :class="activeClass">
  <div class="list-lock bw-flex bw-flex--align-c">
    <link-lock @change-lock="lockedChanged"></link-lock>
  </div>
  <div class="list-container">
  </div>
</div>

</template>

<script>
import LinkLock from 'Components/icon/line-lock.vue';
import trigger from 'Util/trigger';

export default {
  components: {
    LinkLock
  },
  data() {
    return {
      isLocked: false
    };
  },
  computed: {
    activeClass() {
      return this.isLocked ? 'list-rank-locked list-rank-locked-adapt' : '';
    }
  },
  methods: {
    lockedChanged(status) {
      this.isLocked = status;
      if (this.isLocked === false) {
        this.$emit('resize-map');
      } else {
        trigger('resize');
      }
    }
  },

  mounted() {

  }
};
</script>

<style>
.list-rank-wrap {
  width: 260px;
  height: 100vh;
  transition: transform 1s ease 0.5s;
}
.list-container {
  background: rgba(255,255,255,0.4);
  flex: 1;
}
div.list-rank-locked {
  margin-left: -230px;
  transform: translateX(230px);
  transition: transform 1s;
}
/* html, body {
  width: 500px !important;
} */
</style>
