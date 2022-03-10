export const state = () => ({
  isTransition: false,
  index: '',
});

export const getters = {
  state(state) {
    return state.isTransition;
  },
  index(state) {
    return state.index;
  },
};

export const mutations = {
  start(state, index) {
    state.isTransition = true;
    state.index = index;
  },
  end(state) {
    state.isTransition = false;
  },
};