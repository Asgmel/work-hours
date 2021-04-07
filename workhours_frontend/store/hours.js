import Vue from 'vue'
import { format, startOfMonth } from 'date-fns'

export const state = () => ({
  hours: {},
  activeHour: null,
  intervalStart: format(startOfMonth(new Date()), 'yyyy-MM-dd'),
  intervalEnd: format(new Date(), 'yyyy-MM-dd'),
})

export const mutations = {
  create(state, { _id, hour }) {
    Vue.set(state.hours, _id, hour)
  },
  update(state, { _id, hour }) {
    Vue.set(state.hours, _id, hour)
  },
  delete(state, _id) {
    Vue.delete(state.hours, _id)
  },
  setActive(state, _id) {
    state.activeHour = _id
  },
  setIntervalStart(state, start) {
    state.intervalStart = start
  },
  setIntervalEnd(state, end) {
    state.intervalEnd = end
  },
}

export const getters = {
  getAll(state) {
    return Object.keys(state.hours).map((_id) => {
      return { _id, ...state.hours[_id] }
    })
  },
  getWeek(state, getters, rootState) {
    const start = rootState.weeks.startDate
    const end = rootState.weeks.endDate
    const filteredHours = Object.keys(state.hours).filter((_id) => {
      return (
        start <= new Date(state.hours[_id].date) &&
        end >= new Date(state.hours[_id].date)
      )
    })
    return filteredHours.map((_id) => {
      return { _id, ...state.hours[_id] }
    })
  },
  getInterval(state) {
    const start = new Date(state.intervalStart)
    const end = new Date(state.intervalEnd)

    if (start && end) {
      const filteredHours = Object.keys(state.hours).filter((_id) => {
        return (
          start <= new Date(state.hours[_id].date) &&
          end >= new Date(state.hours[_id].date)
        )
      })
      return filteredHours.map((_id) => {
        return { _id, ...state.hours[_id] }
      })
    }
    return []
  },
  getIntervalStart(state) {
    return state.intervalStart
  },
  getIntervalEnd(state) {
    return state.intervalEnd
  },
  getActive(state) {
    const _id = state.activeHour
    return _id ? { _id, ...state.hours[_id] } : {}
  },
}

export const actions = {
  create(state, hour) {
    return new Promise((resolve, reject) => {
      this.$axios
        .$post(`${this.$axios.defaults.baseURL}/hour`, hour)
        .then((res) => {
          if (typeof res !== 'string') {
            state.commit('create', { _id: res._id, hour })
            resolve()
          } else {
            reject(res)
          }
        })
        .catch(() => {
          throw new Error('Internal Server Error.')
        })
    })
  },

  update(state, hour) {
    const _id = hour._id
    delete hour._id

    state.commit('update', { _id, hour })

    return new Promise((resolve, reject) => {
      this.$axios
        .$patch(`${this.$axios.defaults.baseURL}/hour/${_id}`, hour)
        .then((res) => {
          if (typeof res !== 'string') {
            resolve()
          } else {
            reject(res)
          }
        })
        .catch(() => {
          throw new Error('Internal Server Error.')
        })
    })
  },

  delete(state, _id) {
    state.commit('delete', _id)

    return new Promise((resolve, reject) => {
      this.$axios
        .$delete(`${this.$axios.defaults.baseURL}/hour/${_id}`)
        .then((res) => {
          if (typeof res !== 'string') {
            resolve()
          } else {
            reject(res)
          }
        })
        .catch(() => {
          throw new Error('Internal Server Error.')
        })
    })
  },

  setActive(state, _id) {
    state.commit('setActive', _id)
  },

  setIntervalStart(state, start) {
    state.commit('setIntervalStart', start)
  },

  setIntervalEnd(state, end) {
    state.commit('setIntervalEnd', end)
  },
  populate(state) {
    return new Promise((resolve, reject) => {
      this.$axios
        .$get(`${this.$axios.defaults.baseURL}/hour`)
        .then((res) => {
          res.forEach(({ _id, description, project, start, end, date }) => {
            state.commit('create', {
              _id,
              hour: { description, project, start, end, date },
            })
          })
          resolve()
        })
        .catch(() => {
          reject(new Error('Internal Server Error.'))
        })
    })
  },
}
