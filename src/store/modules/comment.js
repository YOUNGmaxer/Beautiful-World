import axios from 'axios';
import _url from 'Util/url';
import _groupBy from 'lodash/groupBy';
import moment from 'moment';

export default {
  namespaced: true,
  state: {
    comments: [],
    timeList: [],
    seasonList: ['冬', '冬', '春', '春', '春', '夏', '夏', '夏', '秋', '秋', '秋', '冬']
  },
  mutations: {
    SET_COMMENTS(state, data) {
      state.comments = data;
    },
    SET_TIMELIST(state, data) {
      state.timeList = data;
    }
  },
  actions: {
    async getCommentData({ commit }, rid) {
      const url = _url.getUrl(`/api/sight/comment/${rid}`);
      const res = await axios.get(url);
      if (res.data) {
        commit('SET_COMMENTS', res.data);
      }
    },

    async getCommentTimeList({ state, commit }) {
      const timeList = state.comments.map(comment => comment.date);
      commit('SET_TIMELIST', timeList);
    },

    // 按季度进行分组
    groupTimeBySeason({ state }, timeList) {
      const groupedTimeList = _groupBy(timeList, item => {
        const month = moment(item).month();
        return state.seasonList[month];
      });
      return groupedTimeList;
    }
  }
};
