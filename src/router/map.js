import Map from 'Views/map/index.vue';
import ChinaMap from 'Views/map/components/china-map.vue';

export default {
  path: '/map',
  component: Map,
  children: [
    {
      path: 'china',
      component: ChinaMap
    }
  ]
};
