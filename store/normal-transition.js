export const state = () => ({
  isTransition: false,
});

export const getters = {
  state(state) {
    return state.isTransition;
  },
};

export const mutations = {
  start(state) {
    state.isTransition = true;
  },
  end(state) {
    state.isTransition = false;
  },
};