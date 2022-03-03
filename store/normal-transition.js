export const state = () => ({
  isTransition: false,
});

export const getters = {
  state(state) {
    return state.isTransition;
  },
};

export const mutations = {
  transition(state) {
    state.isTransition = true;
  },
};