export default {
  namespaced: true,
  state: {
    emitResizeFlag: false
  },
  mutations: {
    SET_FLAG(state, flag) {
      state.emitResizeFlag = flag;
      console.log(state.emitResizeFlag);
    }
  }
};
