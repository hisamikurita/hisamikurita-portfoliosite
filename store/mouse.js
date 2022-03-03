export const state = () => ({
  isHover: false,
  isDown: false,
});

export const getters = {
  isHover(state) {
    return state.isHover;
  },
  isDown(state) {
    return state.isDown;
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
};