import Vue from 'vue'

export const state = () => ({
  addHour: false,
  addProject: false,
  addDepartment: false,
  warning: false,
  warningData: {
    title: '',
    text: '',
    accept: () => {},
  },
})

export const mutations = {
  setAddHour(state, value) {
    state.addHour = value
  },
  setAddProject(state, value) {
    state.addProject = value
  },
  setAddDepartment(state, value) {
    state.addDepartment = value
  },
  setWarningState(state, value) {
    state.warning = value
  },
  setWarningData(state, value) {
    Vue.set(state.warningData, 'title', value.title)
    Vue.set(state.warningData, 'text', value.text)
    Vue.set(state.warningData, 'accept', value.accept)
  },
}

export const getters = {
  getAddHour(state) {
    return state.addHour
  },
  getAddProject(state) {
    return state.addProject
  },
  getAddDepartment(state) {
    return state.addDepartment
  },
  getWarningState(state) {
    return state.warning
  },
  getWarningData(state) {
    return state.warningData
  },
}

export const actions = {
  setAddHour(state, value) {
    state.commit('setAddHour', value)
  },
  setAddProject(state, value) {
    state.commit('setAddProject', value)
  },
  setAddDepartment(state, value) {
    state.commit('setAddDepartment', value)
  },
  setWarningState(state, value) {
    state.commit('setWarningState', value)
  },
  setWarningData(state, value) {
    state.commit('setWarningData', value)
  },
}
