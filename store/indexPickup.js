/**
 *
 *トップページのピックアップシーンの状態管理
 *
 */

export const state = () => ({
  isCurrent: false,
  pickupPos: 0,
  projectAnimation: '',
  sceneAnimation: '',
  scene: '',
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
  },
  sceneAnimationState(state) {
    return state.sceneAnimation;
  },
  scene(state) {
    return state.scene;
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
  },
  sceneAnimationState(state, progress) {
    state.sceneAnimation = progress;
  },
  setScene(state, scene) {
    state.scene = scene;
  }
};