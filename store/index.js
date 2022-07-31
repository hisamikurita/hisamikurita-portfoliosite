export const state = () => ({
  projectData: {},
  contactData: {},
  pickupData: {},
  awardData: {},
  awardDataLength: {},
});

export const actions = {
  async nuxtServerInit({ commit }, { app }) {

    const projectResponse = await app.$axios.$get(`https://${process.env.serviceDomain}.microcms.io/api/v1/works?limit=200`, {
      headers: {
        'X-MICROCMS-API-KEY': process.env.apiKey
      }
    })
    const contactResponse = await app.$axios.$get(`https://${process.env.serviceDomain}.microcms.io/api/v1/contact?limit=200`, {
      headers: {
        'X-MICROCMS-API-KEY': process.env.apiKey
      }
    })
    const pickupData = projectResponse.contents.filter((v) => v.pickup.pickupFlag)
    const awardResponse = await app.$axios.$get(`https://${process.env.serviceDomain}.microcms.io/api/v1/award?limit=200`, {
      headers: {
        'X-MICROCMS-API-KEY': process.env.apiKey
      }
    })
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
