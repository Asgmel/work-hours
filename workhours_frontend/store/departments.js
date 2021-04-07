import Vue from 'vue'

export const state = () => ({
  departments: {},
  activeDepartment: null,
})

export const mutations = {
  create(state, { _id, department }) {
    Vue.set(state.departments, _id, department)
  },
  update(state, { _id, department }) {
    Vue.set(state.departments, _id, department)
  },
  delete(state, _id) {
    Vue.delete(state.departments, _id)
  },
  setActive(state, _id) {
    state.activeDepartment = _id
  },
}

export const getters = {
  getAll(state) {
    return Object.keys(state.departments).map((_id) => {
      return { _id, ...state.departments[_id] }
    })
  },
  getAllObjects(state) {
    return state.departments
  },
  getActive(state) {
    const _id = state.activeDepartment
    return _id ? { _id, ...state.departments[_id] } : {}
  },
}

export const actions = {
  create(state, department) {
    return new Promise((resolve, reject) => {
      this.$axios
        .$post(`${this.$axios.defaults.baseURL}/department`, department)
        .then((res) => {
          if (typeof res !== 'string') {
            const _id = res._id
            state.commit('create', { _id, department })
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

  update(state, department) {
    const _id = department._id
    delete department._id

    state.commit('update', { _id, department })

    return new Promise((resolve, reject) => {
      this.$axios
        .$patch(`${this.$axios.defaults.baseURL}/department/${_id}`, department)
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
        .$delete(`${this.$axios.defaults.baseURL}/department/${_id}`)
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
  populate(state) {
    return new Promise((resolve, reject) => {
      this.$axios
        .$get(`${this.$axios.defaults.baseURL}/department`)
        .then((res) => {
          res.forEach(({ _id, name }) => {
            state.commit('create', {
              _id,
              department: { name },
            })
          })
          resolve()
        })
        .catch((e) => {
          reject(new Error('Internal Server Error.'))
        })
    })
  },
}
