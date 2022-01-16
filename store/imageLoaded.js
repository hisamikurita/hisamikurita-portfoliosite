export const state = () => ({
  isLoaded: false,
});

export const getters = {
  isLoad(state) {
    return state.isLoaded;
  },
};

export const mutations = {
  loaded(state) {
    state.isLoaded = true;
  },
  init(state) {
    state.isLoaded = false;
  },
};