<template>
<canvas id="canvas-star" class="bg-midnight"></canvas>
</template>

<script>
import RoundItem from './star';

export default {

  data() {
    return {
      roundNum: 500
    };
  },

  methods: {
    init() {
      const canvas = document.getElementById('canvas-star');
      const ctx = canvas.getContext('2d');
      const WIDTH = document.documentElement.clientWidth;
      const HEIGHT = document.documentElement.clientHeight;
      canvas.width = WIDTH;
      canvas.height = HEIGHT;
      let round = [];

      for (let i = 0; i < this.roundNum; i++) {
        round[i] = new RoundItem(i, Math.random() * WIDTH, Math.random() * HEIGHT);
        round[i].draw(ctx);
      }
    }
  },

  mounted() {
    this.init();
  }
};
</script>

<style>
#canvas-star {
  position: absolute;
  z-index: -1;
}
</style>
