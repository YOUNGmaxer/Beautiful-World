<template>
<div class="chart-title bw-flex bw-flex--align-c">
  <div class="chart-title__split"></div>
  <p class="chart-title__text">
    <slot></slot>
  </p>
  <div class="chart-button" :class="buttonClass" v-if="hasButton" @click="emitClick"></div>
  <div class="chart-tab" v-if="hasTab">
    <slot name="tab"></slot>
  </div>
  <div class="chart-control__view">
    <div class="view__minus view__icon--active"></div>
    <div class="view__plus"></div>
  </div>
</div>
</template>

<script>
export default {
  props: {
    hasButton: {
      type: Boolean,
      default: false
    },
    hasTab: {
      type: Boolean,
      default: false
    }
  },

  data() {
    return {
      buttonStatus: false
    };
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

<style lang="scss">
:root {
  --chart-title-height: 32px;
}
.chart-title {
  /* background: rgb(30, 25, 50); */
  /* background: rgb(60, 40, 90); */
  background: rgb(43, 35, 54);
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

.chart-tab {
  height: 20px;
  position: absolute;
  right: 10px;
  display: flex;
  align-items: center;
  color: orange;
}

.chart-control__view {
  position: absolute;
  right: 10px;
  display: flex;
  align-items: center;

  .view__plus, .view__minus {
    height: 20px;
    width: 20px;
    position: relative;
    mask-repeat: no-repeat;
    mask-position: center;
    mask-size: 80%;
    background-color: white;
    cursor: pointer;
  }

  .view__plus {
    // mask-image: url('data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBzdGFuZGFsb25lPSJubyI/PjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+PHN2ZyB0PSIxNTU2NzE5OTc0MzM4IiBjbGFzcz0iaWNvbiIgc3R5bGU9IiIgdmlld0JveD0iMCAwIDEwMjQgMTAyNCIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHAtaWQ9Ijg0NjMiIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCI+PGRlZnM+PHN0eWxlIHR5cGU9InRleHQvY3NzIj48L3N0eWxlPjwvZGVmcz48cGF0aCBkPSJNNjk2IDQ4MEg1NDRWMzI4YzAtNC40LTMuNi04LTgtOGgtNDhjLTQuNCAwLTggMy42LTggOHYxNTJIMzI4Yy00LjQgMC04IDMuNi04IDh2NDhjMCA0LjQgMy42IDggOCA4aDE1MnYxNTJjMCA0LjQgMy42IDggOCA4aDQ4YzQuNCAwIDgtMy42IDgtOFY1NDRoMTUyYzQuNCAwIDgtMy42IDgtOHYtNDhjMC00LjQtMy42LTgtOC04eiIgcC1pZD0iODQ2NCI+PC9wYXRoPjxwYXRoIGQ9Ik01MTIgNjRDMjY0LjYgNjQgNjQgMjY0LjYgNjQgNTEyczIwMC42IDQ0OCA0NDggNDQ4IDQ0OC0yMDAuNiA0NDgtNDQ4Uzc1OS40IDY0IDUxMiA2NHogbTAgODIwYy0yMDUuNCAwLTM3Mi0xNjYuNi0zNzItMzcyczE2Ni42LTM3MiAzNzItMzcyIDM3MiAxNjYuNiAzNzIgMzcyLTE2Ni42IDM3Mi0zNzIgMzcyeiIgcC1pZD0iODQ2NSI+PC9wYXRoPjwvc3ZnPg==');
    // 第二套icon
    mask-image: url('data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBzdGFuZGFsb25lPSJubyI/PjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+PHN2ZyB0PSIxNTU2NzIyNTI4NzY4IiBjbGFzcz0iaWNvbiIgc3R5bGU9IiIgdmlld0JveD0iMCAwIDEwMjQgMTAyNCIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHAtaWQ9IjEyNjAiIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCI+PGRlZnM+PHN0eWxlIHR5cGU9InRleHQvY3NzIj48L3N0eWxlPjwvZGVmcz48cGF0aCBkPSJNODMxLjk2MTc1NCA1MjIuMjMzMDYyIDE5Mi4wMzcyMjMgNTIyLjIzMzA2MmMtNS42NTE3MiAwLTEwLjIzMzA2Mi00LjU4MjM2NS0xMC4yMzMwNjItMTAuMjMzMDYyIDAtNS42NTE3MiA0LjU4MTM0Mi0xMC4yMzMwNjIgMTAuMjMzMDYyLTEwLjIzMzA2Mmw2MzkuOTI0NTMxIDBjNS42NTE3MiAwIDEwLjIzMzA2MiA0LjU4MTM0MiAxMC4yMzMwNjIgMTAuMjMzMDYyQzg0Mi4xOTQ4MTYgNTE3LjY1MTcyIDgzNy42MTM0NzQgNTIyLjIzMzA2MiA4MzEuOTYxNzU0IDUyMi4yMzMwNjJ6IiBwLWlkPSIxMjYxIj48L3BhdGg+PHBhdGggZD0iTTUyMi4yMzI1NSAxOTIuMDM3NzM0bDAgNjM5LjkyNDUzMWMwIDUuNjUxNzItNC41ODIzNjUgMTAuMjMzMDYyLTEwLjIzMzA2MiAxMC4yMzMwNjItNS42NTE3MiAwLTEwLjIzMzA2Mi00LjU4MTM0Mi0xMC4yMzMwNjItMTAuMjMzMDYybDAtNjM5LjkyNDUzMWMwLTUuNjUxNzIgNC41ODEzNDItMTAuMjMzMDYyIDEwLjIzMzA2Mi0xMC4yMzMwNjJDNTE3LjY1MDE4NSAxODEuODA0NjcyIDUyMi4yMzI1NSAxODYuMzg2MDE0IDUyMi4yMzI1NSAxOTIuMDM3NzM0eiIgcC1pZD0iMTI2MiI+PC9wYXRoPjwvc3ZnPg==');
  }

  .view__minus {
    margin-right: 5px;
    // mask-image: url('data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBzdGFuZGFsb25lPSJubyI/PjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+PHN2ZyB0PSIxNTU2NzIwMDg0NDc3IiBjbGFzcz0iaWNvbiIgc3R5bGU9IiIgdmlld0JveD0iMCAwIDEwMjQgMTAyNCIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHAtaWQ9Ijg2NzYiIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCI+PGRlZnM+PHN0eWxlIHR5cGU9InRleHQvY3NzIj48L3N0eWxlPjwvZGVmcz48cGF0aCBkPSJNNjk2IDQ4MEgzMjhjLTQuNCAwLTggMy42LTggOHY0OGMwIDQuNCAzLjYgOCA4IDhoMzY4YzQuNCAwIDgtMy42IDgtOHYtNDhjMC00LjQtMy42LTgtOC04eiIgcC1pZD0iODY3NyI+PC9wYXRoPjxwYXRoIGQ9Ik01MTIgNjRDMjY0LjYgNjQgNjQgMjY0LjYgNjQgNTEyczIwMC42IDQ0OCA0NDggNDQ4IDQ0OC0yMDAuNiA0NDgtNDQ4Uzc1OS40IDY0IDUxMiA2NHogbTAgODIwYy0yMDUuNCAwLTM3Mi0xNjYuNi0zNzItMzcyczE2Ni42LTM3MiAzNzItMzcyIDM3MiAxNjYuNiAzNzIgMzcyLTE2Ni42IDM3Mi0zNzIgMzcyeiIgcC1pZD0iODY3OCI+PC9wYXRoPjwvc3ZnPg==');
    // 第二套icon
    mask-image: url('data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBzdGFuZGFsb25lPSJubyI/PjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+PHN2ZyB0PSIxNTU2NzIyNTQzNjM5IiBjbGFzcz0iaWNvbiIgc3R5bGU9IiIgdmlld0JveD0iMCAwIDEwMjQgMTAyNCIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHAtaWQ9IjEzNzciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCI+PGRlZnM+PHN0eWxlIHR5cGU9InRleHQvY3NzIj48L3N0eWxlPjwvZGVmcz48cGF0aCBkPSJNODMxLjk2MTc1NCA1MjIuMjMzMDYyIDE5Mi4wMzcyMjMgNTIyLjIzMzA2MmMtNS42NTE3MiAwLTEwLjIzMzA2Mi00LjU4MjM2NS0xMC4yMzMwNjItMTAuMjMzMDYyIDAtNS42NTE3MiA0LjU4MTM0Mi0xMC4yMzMwNjIgMTAuMjMzMDYyLTEwLjIzMzA2Mmw2MzkuOTI0NTMxIDBjNS42NTE3MiAwIDEwLjIzMzA2MiA0LjU4MTM0MiAxMC4yMzMwNjIgMTAuMjMzMDYyQzg0Mi4xOTQ4MTYgNTE3LjY1MTcyIDgzNy42MTM0NzQgNTIyLjIzMzA2MiA4MzEuOTYxNzU0IDUyMi4yMzMwNjJ6IiBwLWlkPSIxMzc4Ij48L3BhdGg+PC9zdmc+');
  }

  .view__icon--active {
    &::after {
      content: '';
      width: 20px;
      height: 20px;
      border: 1px solid #fff;
      border-radius: 50%;
      position: absolute;
      top: 0;
      left: 0;
    }
  }
}
</style>
