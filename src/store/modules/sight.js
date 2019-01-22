import axios from 'axios';
import _url from 'Util/url';

export default {
  namespaced: true,
  state: {
    sightList: []
  },

  mutations: {
    SET_SIGHT_LIST(state, list) {
      state.sightList = list;
    }
  },

  actions: {
    /**
     * @description: 请求某个省的所有景点数据
     * @param code {String} 省级代号
     * @return: 景点数据列表
     */
    async getProvSights({ commit }, code) {
      const cacheData = localStorage.getItem(code);
      if (!cacheData) {
        const url = _url.getUrl(`/api/sight/prov/${code}`);
        const res = await axios.get(url);
        localStorage.setItem(code, JSON.stringify(res.data));
        commit('SET_SIGHT_LIST', res.data);
        return res.data;
      }
      return JSON.parse(cacheData);
    }
  }
};
