export const state = () => ({
  isTransition: false,
  color: '#ffffff',
});

export const getters = {
  state(state) {
    return state.isTransition;
  },
  color(state) {
    return state.color;
  },
};

export const mutations = {
  start(state, color) {
    state.isTransition = true;
    state.color = color;
  },
  end(state) {
    state.isTransition = false;
  },
};