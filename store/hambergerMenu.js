/**
 *
 *ハンバーガーメニューの状態管理
 *
 */

export const state = () => ({
  isOpen: false,
  isDisable: false,
  isPickup: false,
});

export const getters = {
  state(state) {
    return state.isOpen;
  },
  pickup(state) {
    return state.isPickup;
  },
  disable(state) {
    return state.isDisable;
  }
};

export const mutations = {
  open(state) {
    state.isOpen = true;
  },
  pickupOpen(state){
    state.isPickup = true;
  },
  close(state) {
    state.isOpen = false;
  },
  pickupClose(state){
    state.isPickup = false;
  },
  enable(state) {
    state.isDisable = false;
  },
  disable(state) {
    state.isDisable = true;
  },
};
