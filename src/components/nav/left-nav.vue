<template>
  <div class="l-nav">
    <ul>
      <li
        :class="tabCls(tabIndex)"
        v-for="(tabItem, tabIndex) in tabList"
        :key="tabIndex"
        @click="handleTabChange(tabIndex)"
      >{{ tabItem }}</li>
      <slot></slot>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    // tab 选项列表
    tabList: {
      type: Array,
      default: ['无']
    }
  },
  data() {
    return {
      // 用于表示当前选中的 tab
      currentTab: -1
    }
  },
  methods: {
    // 用于动态绑定 class，便于通过 class 来控制 tab 样式
    tabCls(tabIndex) {
      return [
        'l-nav__item',
        {
          ['l-nav__item--active']: tabIndex === this.currentTab 
        }
      ]
    },
    handleTabChange(tabIndex) {
      this.currentTab = tabIndex;
      // 一个扩展的事件，方便外层父组件做一些事情，比如路由
      this.$emit('on-click', tabIndex);
    }
  }
}
</script>

<style>
.l-nav {
  position: fixed;
  width: 160px;
  height: 100vh;
  background: darkcyan;
  color: white;
}

.l-nav__item {
  height: 60px;
  line-height: 60px;
  text-align: center;
  cursor: pointer;
}

.l-nav__item:hover {
  background: dimgray;
}

.l-nav__item--active {
  background: darkolivegreen;
}
</style>
