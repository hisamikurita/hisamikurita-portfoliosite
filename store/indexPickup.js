/**
 *
 *トップページのピックアップシーンの状態管理
 *
 */

export const state = () => ({
  isCurrent: false,
  pickupPos: 0,
  projectAnimation: '',
});

export const getters = {
  state(state) {
    return state.isCurrent;
  },
  pos(state) {
    return state.pickupPos;
  },
  projectAnimationState(state) {
    return state.projectAnimation;
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
  },
  setProjectAnimationState(state, progress) {
    state.projectAnimation = progress;
  }
};