<template>
  <div class="l-nav">
    <ul>
      <li
        :class="tabCls(tabIndex)"
        v-for="(tabItem, tabIndex) in tabList"
        :key="tabIndex"
        @click="handleTabChange(tabIndex, tabItem)"
      >{{ tabItem.name }}</li>
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
    },
    // 用于确定是否要添加自定义事件
    eventTag: {
      type: Boolean,
      default: false
    },
    // 用于确定是否要进行前端路由
    routeTag: {
      type: Boolean,
      default: true
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
    /**
     * @description: 点击默认进行前端路由，同时支持设置取消路由，或添加自定义事件
     */
    handleTabChange(tabIndex, tabItem) {
      this.currentTab = tabIndex;
      // 点击默认进行路由
      if (this.routeTag) {
        this.$router.push({
          path: tabItem.path
        });
      }
      if (this.eventTag) {
        console.log('促发自定义事件');
        this.$emit('on-click');
      }
    }
  }
}
</script>

<style lang='scss'>
@import 'Style/_global.scss';

.l-nav {
  position: fixed;
  left: 0;
  width: var(--left-nav-width);
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
