import Vue from 'vue';
import Vuex from 'vuex';
import actions from './actions';

Vue.use(Vuex);

// 公共的 store
export default new Vuex.Store({
  actions
});
