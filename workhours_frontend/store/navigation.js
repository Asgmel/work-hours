export const state = () => ({
  drawer: null,
  routes: [
    { title: 'Dashboard', link: '/dashboard', icon: 'mdi-view-dashboard' },
    { title: 'Projects', link: '/projects', icon: 'mdi-folder' },
    { title: 'Statistics', link: '/statistics', icon: 'mdi-clipboard-clock' },
  ],
})

export const mutations = {
  invertDrawer(state) {
    state.drawer = !state.drawer
  },
  setDrawer(state, value) {
    state.drawer = value
  },
}

export const getters = {
  getDrawerState(state) {
    return state.drawer
  },
  getRoutes(state) {
    return state.routes
  },
}

export const actions = {
  invertDrawerState(state) {
    if (state.state.drawer === null) {
      state.commit('setDrawer', false)
    } else {
      state.commit('invertDrawer')
    }
  },
  setDrawerState(state, value) {
    state.commit('setDrawer', value)
  },
}
