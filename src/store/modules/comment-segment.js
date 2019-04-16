import axios from 'axios';
import { convertObj2Array } from 'Util/convert';

export default {
  namespaced: true,
  state: {
    segmentData: {},
    segmentDetailData: {},
    aWordData: null,
    nWordData: null,
    vWordData: null,
    nsWordData: null,
    curFocusWord: '',
    curFocusWordType: ''
  },
  mutations: {
    SET_SEGMENT_DETAILDATA(state, data) {
      state.segmentDetailData = data;
    },
    SET_SEGMENT_DATA(state) {
      const keys = Object.keys(state.segmentDetailData);
      keys.forEach(key => {
        state.segmentData[key] = {};
        for (let word in state.segmentDetailData[key]) {
          state.segmentData[key][word] = state.segmentDetailData[key][word].length;
        }
      });
      console.log('segmentData', state.segmentData);
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
    },
    SET_CURFOCUS_WORD(state, word) {
      state.curFocusWord = word;
    },
    SET_CURFOCUS_TYPE(state, type) {
      state.curFocusWordType = type;
    }
  },
  actions: {
    async getSegmentData({ commit }, rid) {
      const url = `//localhost:3002/hanlp/api/segment/detail/${rid}`;
      const { data } = await axios.get(url);
      if (data) {
        commit('SET_SEGMENT_DETAILDATA', data);
        commit('SET_SEGMENT_DATA');
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

      let existList = state.aWordData || state.nWordData || state.vWordData || state.nsWordData;
      if (existList) {
        commit('SET_CURFOCUS_WORD', existList[0][0]);
        console.log('sep', state.curFocusWord);
      }
    }
  }
};
