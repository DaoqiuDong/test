
const state = {
  show: false,
  showView: false,
}

const mutations = {
  SET_ALARMS: (state, {key, value}) => {
    // console.log(state, key, value)
    if (state.hasOwnProperty(key)) {
      // console.log('set')
      state[key] = value
    }
    // console.log('SET_ALARMS')
    // state[key] = value
  }
}

const actions = {
  setAlarms({ commit }, data) {
    // console.log('setAlarms', data)
    commit('SET_ALARMS', data)
  },
  alarms(state, key) {
    // console.log('alarms', key)
    return state[key]
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

