<template>
<canvas id="canvas-star" class="bg-midnight star"></canvas>
</template>

<script>
import RoundItem from './star';
import _debounce from 'lodash/debounce';

export default {

  data() {
    return {
      roundNum: 500
    };
  },

  methods: {
    drawStar(ctx) {
      const WIDTH = document.documentElement.clientWidth;
      const HEIGHT = document.documentElement.clientHeight;
      let round = [];
      for (let i = 0; i < this.roundNum; i++) {
        round[i] = new RoundItem(i, Math.random() * WIDTH, Math.random() * HEIGHT);
        round[i].draw(ctx);
      }
    },

    init() {
      // const canvas = document.getElementById('canvas-star');
      let canvas = document.getElementsByClassName('star')[0];
      const ctx = canvas.getContext('2d');
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      this.drawStar(ctx);

      // 对窗口改变的回调进行防抖，可以有效提高性能，减轻卡顿
      window.addEventListener('resize', _debounce(() => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        this.drawStar(ctx);
      }, 300));
    }
  },

  mounted() {
    this.init();
    // 目前的做法会出现改变窗口时出现白底现象，因此需要动态设置 body 背景色避免这个问题
    document.body.setAttribute('class', 'bg-midnight');
  }
};
</script>

<style>
#canvas-star {
  position: absolute;
  z-index: -1;
}
</style>
