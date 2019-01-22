import Home from 'Views/home/index.vue';
import HotMap from 'Views/home/components/hot-map.vue';
import BarMap from 'Views/home/components/bar-map-top.vue';
import BarMap1 from 'Views/home/components/bar-map-num.vue';

export default {
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
  ]
};
