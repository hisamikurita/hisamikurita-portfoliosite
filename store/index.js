export const state = () => ({
  projectData: {},
  contactData: {},
  pickupData: {},
  awardData: {},
  awardDataLength: {},
});

export const actions = {
  async nuxtServerInit({ commit }, { app }) {

    const projectResponse = await app.$microcms.get({endpoint: `works`,})
    const contactResponse = await app.$microcms.get({endpoint: `contact`,})
    const pickupData = projectResponse.contents.filter((v) => v.pickup.pickupFlag)
    const awardResponse = await app.$microcms.get({endpoint: `award`,queries: { limit: 30 }})

    let awwwwardsLength = 0
    let cssdesignawardsLength = 0
    let csswinnerLength = 0

    awardResponse.contents.forEach((v) => {
      if (v.group === 'AWWWARDS') {
        awwwwardsLength++
      } else if (v.group === 'CSS DESIGN AWARDS') {
        cssdesignawardsLength++
      } else if (v.group === 'CSS WINNER') {
        csswinnerLength++
      }
    })

    const awardDataLength = {
      awwwwardsTotalLength: awwwwardsLength,
      cssdesignawardsTotalLength: cssdesignawardsLength,
      csswinnerTotalLength: csswinnerLength,
    }

    commit('getProjectData', projectResponse.contents)
    commit('getContactData', contactResponse.contents)
    commit('getPickupData', pickupData)
    commit('getAwardData', awardResponse.contents)
    commit('getAwardDataLength', awardDataLength)
  }
}

export const mutations = {
  getProjectData(state, data) {
    state.projectData = data
  },
  getContactData(state, data) {
    state.contactData = data
  },
  getPickupData(state, data) {
    state.pickupData = data
  },
  getAwardData(state, data) {
    state.awardData = data
  },
  getAwardDataLength(state, data) {
    state.awardDataLength = data
  },
}

export const getters = {
  projectData(state) {
    return state.projectData;
  },
  contactData(state) {
    return state.contactData;
  },
  pickupData(state) {
    return state.pickupData;
  },
  awardData(state) {
    return state.awardData;
  },
  awardDataLength(state) {
    return state.awardDataLength;
  },
};