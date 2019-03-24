<template>
<div class="line-lock-wrap" @click="clickMethod">
  <div class="link-lock icon" :class="activeClass"></div>
</div>
</template>

<script>
import { mapState, mapMutations } from 'vuex';

export default {
  data() {
    return {
      // isLocked: true
    };
  },
  watch: {
    lockedLaunch(_new) {
      if (_new) {
        this.clickMethod();
      }
    }
  },
  computed: {
    ...mapState('chinaMap', ['lockedStatus', 'lockedLaunch']),
    activeClass() {
      return this.lockedStatus ? 'link-locked' : '';
    }
  },

  methods: {
    ...mapMutations('chinaMap', ['SET_LOCKED']),
    clickMethod() {
      this.$store.commit('chinaMap/SET_LOCKED', !this.lockedStatus);
      this.$emit('change-lock');
    }
  },

  mounted() {
    // setTimeout(this.clickMethod, 1500);
  }
};
</script>

<style lang="scss">
@import 'Assets/style/functions/_common.scss';
.link-lock {
  --main-width: 8px;
  --main-height: 20px;
  --vice-height: 20px;
  --vice-width: 5px;
  --border-width: 2px;
}
.line-lock-wrap {
  width: 30px;
  height: 100px;
  position: relative;
  // background: rgba(255,255,255,0.2);
  cursor: pointer;
}
.icon {
  position: absolute;
  top: 50%;
  // left: 50%;
  // transform: translate(-50%, -50%);
  transform: translate(0, -50%);
  right: 10px;
}
.link-lock.icon {
  width: var(--main-width);
  height: var(--main-height);
  color: #fff;
  border-left: var(--border-width) solid currentColor;
  border-top: var(--border-width) solid currentColor;
  border-bottom: var(--border-width) solid currentColor;
  border-radius: var(--main-width) 0 0 var(--main-width) /
    calc(var(--main-height)/2) 0 0 calc(var(--main-height)/2);
  // transition: width 0.5s, transform 0.5s;
  transition: width 0.5s, height 0.5s, border-radius 0.5s ease;
  // transition: border-radius 1s;
}
.link-lock.icon::before {
  content: '';
  position: absolute;
  width: var(--vice-width);
  height: var(--vice-height);
  border-right: var(--border-width) solid currentColor;
  border-bottom: var(--border-width) solid currentColor;
  border-bottom-right-radius: var(--vice-width) 8px;
  top: get-opposite(var(--vice-height));
  right: get-opposite(var(--vice-width));
  transition: width 0.5s, right 0.5s;
  // transition: border-radius 1s;
}
.link-lock.icon::after {
  content: '';
  position: absolute;
  width: var(--vice-width);
  height: var(--vice-height);
  border-right: var(--border-width) solid currentColor;
  border-top: var(--border-width) solid currentColor;
  border-top-right-radius: var(--vice-width) 8px;
  bottom: get-opposite(var(--vice-height));
  right: get-opposite(var(--vice-width));
  transition: width 0.5s, right 0.5s;

}

.link-locked.icon {
  width: 2px;
  height: 30px;
  border-radius: 0 0 0 0 / 15px 0 0 15px;
  // right: 5px;
  // border-radius: 0;
  // transform: translate(calc(-50% + 8px), -50%);
}
.link-locked.icon::before, .link-locked.icon::after {
  width: 2px;
  right: 0;
}
</style>
