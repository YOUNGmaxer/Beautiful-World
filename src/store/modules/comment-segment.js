import axios from 'axios';
import { convertObj2Array } from 'Util/convert';

export default {
  namespaced: true,
  state: {
    segmentData: null,
    aWordData: null,
    nWordData: null,
    vWordData: null,
    nsWordData: null
  },
  mutations: {
    SET_SEGMENTDATA(state, data) {
      state.segmentData = data;
    },
    SET_A_WORD(state, data) {
      state.aWordData = data;
    },
    SET_N_WORD(state, data) {
      state.nWordData = data;
    },
    SET_V_WORD(state, data) {
      state.vWordData = data;
    },
    SET_NS_WORD(state, data) {
      state.nsWordData = data;
    }
  },
  actions: {
    async getSegmentData({ commit }, rid) {
      const url = `//localhost:3002/hanlp/api/segment/${rid}`;
      const { data } = await axios.get(url);
      if (data) {
        commit('SET_SEGMENTDATA', data);
      }
    },

    async sepSegmentData({ state, commit }) {
      if (state.segmentData.a) {
        let list = convertObj2Array(state.segmentData.a);
        commit('SET_A_WORD', list);
      }
      if (state.segmentData.n) {
        let list = convertObj2Array(state.segmentData.n);
        commit('SET_N_WORD', list);
      }
      if (state.segmentData.v) {
        let list = convertObj2Array(state.segmentData.v);
        commit('SET_V_WORD', list);
      }
      if (state.segmentData.ns) {
        let list = convertObj2Array(state.segmentData.ns);
        commit('SET_NS_WORD', list);
      }
    }
  }
};
