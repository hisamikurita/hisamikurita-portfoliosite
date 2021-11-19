/**
 *
 *ハンバーガーメニューの状態管理
 *
 */

export const state = () => ({
  isOpen: false,
  isDisable: false,
});

export const getters = {
  state(state) {
    return state.isOpen;
  },
  disable(state) {
    return state.isDisable;
  }
};

export const mutations = {
  open(state) {
    state.isOpen = true;
  },
  close(state) {
    state.isOpen = false;
  },
  enable(state) {
    state.isDisable = false;
  },
  disable(state) {
    state.isDisable = true;
  },
};