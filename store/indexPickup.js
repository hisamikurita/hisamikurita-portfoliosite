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
  isTransition: false,
  isCurrnetNumber: 0,
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
  },
  transition(state) {
    return state.isTransition;
  },
  currnetNumber(state) {
    return state.isCurrnetNumber
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
  },
  transition(state, transition) {
    state.isTransition = transition;
  },
  setCurrentNumber(state, number) {
    state.isCurrnetNumber = number;
  }
};
