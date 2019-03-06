import Detail from 'Views/detail/index.vue';

export default {
  path: '/detail/:code?',
  component: Detail,
  name: 'detail',
  meta: {
    keepAlive: true,
    isBack: false // 用于判断是否是从上一个页面返回
  }
};
