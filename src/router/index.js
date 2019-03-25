/**
 * 路由入口文件
 */
import Vue from 'vue';
import Router from 'vue-router';

import home from './home';
import map from './map';
import province from './detail-province';
import city from './detail-city';
import sight from './detail-sight';
import detail from './detail';
import exception from './exception';

// 如果在一个模块化工程中使用它，必须要通过 Vue.use() 明确地安装路由功能
Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    home,
    map,
    province,
    city,
    sight,
    detail,
    exception
  ]
});
