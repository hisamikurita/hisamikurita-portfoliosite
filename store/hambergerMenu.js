/**
 *
 *ハンバーガーメニューの状態管理
 *
 */

export const state = () => ({
  isOpen: false,
});

export const getters = {
  state(state) {
    return state.isOpen;
  }
};

export const mutations = {
  open(state) {
    state.isOpen = true;
  },
  close(state) {
    state.isOpen = false;
  },
};