import Vue from 'vue';
import Vuex from 'vuex';
import actions from './actions';
import map from './modules/map';

Vue.use(Vuex);

const debug = process.env.NODE_ENV !== 'production';

// 公共的 store
export default new Vuex.Store({
  modules: {
    map
  },
  actions,
  strict: debug
});
