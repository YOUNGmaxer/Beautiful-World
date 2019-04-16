import axios from 'axios';
import _url from 'Util/url';

export default {
  namespaced: true,
  state: {
    sightList: [],
    sightListSortedByComment: null,
    areaName: ''
  },

  mutations: {
    SET_SIGHT_LIST(state, list) {
      state.sightList = list;
    },
    SET_AREA_NAME(state, name) {
      state.areaName = name;
    },
    SET_SIGHTLIST_SORTED_BY_COMMENT(state) {
      state.sightListSortedByComment = state.sightList.slice(0);
      state.sightListSortedByComment.sort((a, b) => {
        if (!a.comment) {
          a.comment = { 全部: 0 };
        }
        if (!b.comment) {
          b.comment = { 全部: 0 };
        }
        return b.comment['全部'] - a.comment['全部'];
      });
    }
  },

  actions: {
    /**
     * @description: 请求某个省的所有景点数据
     * @param code {String} 省级代号
     * @return: 景点数据列表
     */
    async getProvSights({ commit }, { code, type = 'prov' }) {
      const cacheData = localStorage.getItem(code);
      if (!cacheData) {
        let url;
        switch (type) {
          case 'prov':
            url = _url.getUrl(`/api/sight/prov/${code}`);
            break;
          case 'city':
            url = _url.getUrl(`/api/sight/city/${code}`);
            break;
          default:
            break;
        }
        const res = await axios.get(url);
        localStorage.setItem(code, JSON.stringify(res.data));
        commit('SET_SIGHT_LIST', res.data);
        return res.data;
      }
      let listData = JSON.parse(cacheData);
      commit('SET_SIGHT_LIST', listData);
      return listData;
    }
  }
};
