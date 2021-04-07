export const state = () => ({
  active: false,
  content: 'Placeholder',
  icon: 'mdi-information',
  color: 'indigo',
  timeout: 5000,
})

export const mutations = {
  setActive(state, active) {
    state.active = active
  },
  setContent(state, content) {
    state.content = content
  },
  setTimeout(state, timeout) {
    state.timeout = timeout
  },
  setIcon(state, icon) {
    state.icon = icon
  },
  setColor(state, color) {
    state.color = color
  },
}

export const getters = {
  getActive(state) {
    return state.active
  },
  getContent(state) {
    return state.content
  },
  getTimeout(state) {
    return state.timeout
  },
  getIcon(state) {
    return state.icon
  },
  getColor(state) {
    return state.color
  },
  getAll(state) {
    return {
      active: state.active,
      content: state.content,
      timeout: state.timeout,
      icon: state.icon,
      color: state.color,
    }
  },
}

export const actions = {
  setAll(state, data) {
    state.commit('setContent', data.content || 'Placeholder')
    state.commit('setTimeout', data.timeout || 3000)
    state.commit('setIcon', data.icon || 'mdi-information')
    state.commit('setColor', data.color || 'indigo')
    state.commit('setActive', data.active || false)
  },
  setSuccess(state, content) {
    state.commit('setContent', content)
    state.commit('setTimeout', 3000)
    state.commit('setIcon', 'mdi-check-circle')
    state.commit('setColor', 'success')
    state.commit('setActive', true)
  },
  setInformation(state, content) {
    state.commit('setContent', content)
    state.commit('setTimeout', 3000)
    state.commit('setIcon', 'mdi-information')
    state.commit('setColor', 'indigo')
    state.commit('setActive', true)
  },
  setError(state, content) {
    state.commit('setContent', content)
    state.commit('setTimeout', 3000)
    state.commit('setIcon', 'mdi-alert')
    state.commit('setColor', 'error')
    state.commit('setActive', true)
  },
  setActive(state, active) {
    state.commit('setActive', active)
  },
  setContent(state, content) {
    state.commit('setContent', content)
  },
  setTimeout(state, timeout) {
    state.commit('setTimeout', timeout)
  },
  setIcon(state, icon) {
    state.commit('setIcon', icon)
  },
  setColor(state, color) {
    state.commit('setColor', color)
  },
}
