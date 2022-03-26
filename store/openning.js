export const state = () => ({
  isOpenningEnd: false,
});

export const getters = {
  state(state) {
    return state.isOpenningEnd;
  },
};

export const mutations = {
  end(state) {
    state.isOpenningEnd = true;
  },
};