import City from 'Views/detail/city.vue';

export default {
  path: '/detail_city/:code?',
  component: City,
  name: 'detail_city',
  meta: {
    // keepAlive: true,
    isBack: false
  }
};
