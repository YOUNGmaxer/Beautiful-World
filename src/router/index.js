/**
 * 路由入口文件
 */
import Vue from 'vue';
import Router from 'vue-router';
import Home from 'Views/home/index.vue';
import HomeMain from 'Views/home/components/main.vue';
import HotMap from 'Views/home/components/hot-map.vue';
import BarMap from 'Views/home/components/bar-map-top.vue';
import BarMap1 from 'Views/home/components/bar-map-num.vue';
import Map from 'Views/map/index.vue';
import ChinaMap from 'Views/map/components/china-map.vue';

// 如果在一个模块化工程中使用它，必须要通过 Vue.use() 明确地安装路由功能
Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      component: Home,
      children: [
        {
          path: 'hot-map',
          component: HotMap
        },
        {
          path: 'bar-map-top',
          component: BarMap
        },
        {
          path: 'bar-map-num',
          component: BarMap1
        }
        // {
        //   path: ':tabName?',
        //   component: HomeMain
        // }
      ]
    },
    {
      path: '/map',
      component: Map,
      children: [
        {
          path: 'china',
          component: ChinaMap
        }
      ]
    }
  ]
});
