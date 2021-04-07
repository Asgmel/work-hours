import { getWeek, startOfWeek, endOfWeek, addWeeks, subWeeks } from 'date-fns'

export const state = () => ({
  startDate: startOfWeek(new Date(), { weekStartsOn: 1 }),
  endDate: endOfWeek(new Date(), { weekStartsOn: 1 }),
  week: getWeek(new Date()),
})

export const mutations = {
  addWeekStartDate(state) {
    state.startDate = addWeeks(state.startDate, 1)
  },
  subWeekStartDate(state) {
    state.startDate = subWeeks(state.startDate, 1)
  },
  addWeekEndDate(state) {
    state.endDate = addWeeks(state.endDate, 1)
  },
  subWeekEndDate(state) {
    state.endDate = subWeeks(state.endDate, 1)
  },
  addWeekWeek(state) {
    state.week = getWeek(state.startDate)
  },
  subWeekWeek(state) {
    state.week = getWeek(state.startDate)
  },
}

export const getters = {
  getStartDate(state) {
    return state.startDate
  },
  getEndDate(state) {
    return state.endDate
  },
  getWeek(state) {
    return state.week
  },
}

export const actions = {
  addWeek(state) {
    state.commit('addWeekStartDate')
    state.commit('addWeekEndDate')
    state.commit('addWeekWeek')
  },
  subWeek(state) {
    state.commit('subWeekStartDate')
    state.commit('subWeekEndDate')
    state.commit('subWeekWeek')
  },
}
