import Cookies from 'js-cookie'

const state = {
  sidebar: {
    // opened: Cookies.get('sidebarStatus') ? !!+Cookies.get('sidebarStatus') : true,
    opened: true,
    withoutAnimation: false
  },
  device: 'desktop',
  size: Cookies.get('size') || 'medium',
  showHamburger: Cookies.get('showHamburger') ? !!+Cookies.get('showHamburger') : true,
}

const mutations = {
  TOGGLE_SIDEBAR: state => {
    state.sidebar.opened = !state.sidebar.opened
    state.sidebar.withoutAnimation = false
    // if (state.sidebar.opened) {
    //   Cookies.set('sidebarStatus', 1)
    // } else {
    //   Cookies.set('sidebarStatus', 0)
    // }
  },
  CLOSE_SIDEBAR: (state, withoutAnimation) => {
    Cookies.set('sidebarStatus', 0)
    state.sidebar.opened = false
    state.sidebar.withoutAnimation = withoutAnimation
  },
  TOGGLE_DEVICE: (state, device) => {
    state.device = device
  },
  SET_SIZE: (state, size) => {
    state.size = size
    Cookies.set('size', size)
  },
  SET_SHOW_HAMBURGER: (state, show) => {
    state.showHamburger = show
    if (state.showHamburger) {
      Cookies.set('showHamburger', 1)
    } else {
      Cookies.set('showHamburger', 0)
    }
  }
}

const actions = {
  toggleSideBar({ commit }) {
    commit('TOGGLE_SIDEBAR')
  },
  closeSideBar({ commit }, { withoutAnimation }) {
    commit('CLOSE_SIDEBAR', withoutAnimation)
  },
  toggleDevice({ commit }, device) {
    commit('TOGGLE_DEVICE', device)
  },
  setSize({ commit }, size) {
    commit('SET_SIZE', size)
  },
  setShowHamburger({ commit }, show) {
    commit('SET_SHOW_HAMBURGER', show)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
