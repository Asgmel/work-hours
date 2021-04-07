import Vue from 'vue'

export const state = () => ({
  projects: {},
  activeProject: null,
})

export const mutations = {
  create(state, { _id, project }) {
    Vue.set(state.projects, _id, project)
  },
  update(state, { _id, project }) {
    Vue.set(state.projects, _id, project)
  },
  delete(state, _id) {
    Vue.delete(state.projects, _id)
  },
  setActive(state, _id) {
    state.activeProject = _id
  },
}

export const getters = {
  getAll(state) {
    return Object.keys(state.projects).map((_id) => {
      return { _id, ...state.projects[_id] }
    })
  },
  getAllObjects(state) {
    return state.projects
  },
  getActive(state) {
    const _id = state.activeProject
    return _id ? { _id, ...state.projects[_id] } : {}
  },
}

export const actions = {
  create(state, project) {
    return new Promise((resolve, reject) => {
      this.$axios
        .$post(`${this.$axios.defaults.baseURL}/project`, project)
        .then((res) => {
          if (typeof res !== 'string') {
            state.commit('create', { _id: res._id, project })
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

  update(state, project) {
    const _id = project._id
    delete project._id

    state.commit('update', { _id, project })

    return new Promise((resolve, reject) => {
      this.$axios
        .$patch(`${this.$axios.defaults.baseURL}/project/${_id}`, project)
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
        .$delete(`${this.$axios.defaults.baseURL}/project/${_id}`)
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
        .$get(`${this.$axios.defaults.baseURL}/project`)
        .then((res) => {
          res.forEach(({ _id, name, color, department }) => {
            state.commit('create', {
              _id,
              project: { name, color, department },
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
