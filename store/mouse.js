export const state = () => ({
  isHover: false,
  isDown: false,
  isLoad: false,
});

export const getters = {
  isHover(state) {
    return state.isHover;
  },
  isDown(state) {
    return state.isDown;
  },
  isLoad(state) {
    return state.isLoad;
  },
};

export const mutations = {
  mouseenter(state) {
    state.isHover = true;
  },
  mouseleave(state) {
    state.isHover = false;
  },
  mousedown(state) {
    state.isDown = true;
  },
  mouseup(state) {
    state.isDown = false;
  },
  loading(state) {
    state.isLoad = true;
  },
  loadend(state) {
    state.isLoad = false;
  }
};
