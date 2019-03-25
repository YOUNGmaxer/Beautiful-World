import NoData from 'Views/exception/no-data.vue';

export default {
  path: '/exp',
  // 这里的 component 不能省略
  component: NoData,
  children: [
    {
      path: 'no-data',
      component: NoData
    }
  ]
};
