export const state = () => ({
  email: '',
  name: '',
  error: '',
})

export const mutations = {
  setEmail(state, email) {
    state.email = email
  },
  setName(state, name) {
    state.name = name
  },
}

export const getters = {
  email(state) {
    return state.email
  },
  name(state) {
    return state.name
  },
}

export const actions = {
  getUser(state) {
    this.$axios.get(`${this.$axios.defaults.baseURL}/user/me`).then((res) => {
      state.commit('setEmail', res.data.email)
      state.commit('setName', res.data.name)
    })
  },
  login(state, credentials) {
    return new Promise((resolve, reject) => {
      this.$axios
        .$post(`${this.$axios.defaults.baseURL}/user/login`, credentials)
        .then((res) => {
          if (typeof res !== 'string') {
            localStorage.setItem('token', res.token)
            state.commit('setEmail', res.user.email)
            state.commit('setName', res.user.name)
            resolve()
          } else {
            reject(new Error(res))
          }
        })
        .catch(() => {
          reject(new Error('Internal Server Error.'))
        })
    })
  },
  logout(state) {
    return new Promise((resolve, reject) => {
      this.$axios
        .$post(`${this.$axios.defaults.baseURL}/user/logout`)
        .then((res) => {
          localStorage.removeItem('token')
          state.commit('setEmail', '')
          state.commit('setName', '')
          resolve()
        })
        .catch(() => {
          reject(new Error('Internal Server Error.'))
        })
    })
  },
  register(state, credentials) {
    return new Promise((resolve, reject) => {
      this.$axios
        .$post(`${this.$axios.defaults.baseURL}/user`, credentials)
        .then((res) => {
          state.commit('setEmail', res.email)
          state.commit('setName', res.name)
          resolve()
        })
        .catch(() => {
          reject(new Error('Internal Server Error.'))
        })
    })
  },
  test(state) {
    return new Promise((resolve, reject) => {
      this.$axios
        .$get(`${this.$axios.defaults.baseURL}/test`)
        .then((res) => {
          localStorage.setItem('token', res.token)
          state.commit('setEmail', res.user.email)
          state.commit('setName', res.user.name)
          resolve()
        })
        .catch(() => {
          reject(new Error('Internal Server Error.'))
        })
    })
  },
}
