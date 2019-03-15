import Province from 'Views/detail/province.vue';

export default {
  path: '/detail_province/:code?',
  component: Province,
  name: 'detail_province',
  meta: {
    keepAlive: true,
    isBack: false // 用于判断是否是从上一个页面返回
  }
};
