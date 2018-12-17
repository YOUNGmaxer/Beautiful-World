import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';

// 设置为 false 以阻止 vue 在启动时生成生产提示
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  /**
   * render 函数主要来生成渲染的结构的，有了 render 就没有必要用 el 和 template
   * 注意 render 的参数默认是一个 createElement 的函数，这个函数顾名思义就是来创建 DOM
   */
  render: h => h(App)

  // 如果 Vue 实例在实例化时没有收到 el 选项，则它处于“未挂载”状态，没有关联的 DOM 元素。
  // 可以使用 vm.$mount() 手动地挂载一个未挂载的实例。
}).$mount('#app');
