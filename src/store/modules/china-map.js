export default {
  namespaced: true,
  state: {
    emitResizeFlag: false,
    // 侧栏锁定状态
    lockedStatus: true,
    // 启动标识
    lockedLaunch: false
  },
  mutations: {
    SET_FLAG(state, flag) {
      state.emitResizeFlag = flag;
    },
    SET_LOCKED(state, status) {
      state.lockedStatus = status;
    },
    CHANGE_LOCKED(state) {
      state.lockedStatus = !state.lockedStatus;
    },
    SET_LAUNCH(state, status) {
      state.lockedLaunch = status;
    }
  }
};
