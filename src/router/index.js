/**
 * 路由入口文件
 */
import Vue from 'vue';
import Router from 'vue-router';
import Home from 'Views/home/index.vue';

// 如果在一个模块化工程中使用它，必须要通过 Vue.use() 明确地安装路由功能
Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    }
  ]
});
