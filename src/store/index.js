import Vue from 'vue';
import Vuex from 'vuex';
import actions from './actions';
import map from './modules/map';
import sight from './modules/sight';
import comment from './modules/comment';
import chinaMap from './modules/china-map';
import commentSegment from './modules/comment-segment';

Vue.use(Vuex);

const debug = process.env.NODE_ENV !== 'production';

// 公共的 store
export default new Vuex.Store({
  modules: {
    map,
    sight,
    comment,
    chinaMap,
    commentSegment
  },
  actions,
  strict: debug
});
