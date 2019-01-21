import axios from 'axios';

export default {
  namespaced: true,
  state: {
    // 中国地图数据
    mapData: {},
    // 地图显示地区
    mapType: '中国'
  },
  mutations: {
    SET_MAP_DATA(state, data) {
      state.mapData = data;
    },
    SET_MAP_TYPE(state, type) {
      state.mapType = type;
    }
  },
  actions: {
    async getChinaMap({ commit }) {
      const url = 'http://localhost:3001/api/map';
      const res = await axios.get(url);
      commit('SET_MAP_DATA', res.data);
      return res.data;
    }
  }
}
