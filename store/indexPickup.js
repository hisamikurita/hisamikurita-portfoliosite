/**
 *
 *トップページのピックアップシーンの状態管理
 *
 */

export const state = () => ({
  isCurrent: false,
  pickupPos : 0,
});

export const getters = {
  state(state) {
    return state.isCurrent;
  },
  pos(state) {
    return state.pickupPos;
  }
};

export const mutations = {
  enter(state) {
    state.isCurrent = true;
  },
  leave(state) {
    state.isCurrent = false;
  },
  setPickupPos(state, pos) {
    state.pickupPos = pos;
  }
};