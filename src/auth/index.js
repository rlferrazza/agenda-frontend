import { createStore } from 'vuex'

const store = createStore({
  state() {
    return {
      isAuthenticated: false,
      token: null,
      userId: null,
      userRole: null
    }
  },
  mutations: {
    login(state, payload) {
      state.isAuthenticated = true
      const { token, userId, userRole } = payload
      state.token = token
      state.userId = userId
      state.userRole = userRole

      localStorage.setItem('authState', JSON.stringify(true))
      localStorage.setItem('token', token)
      localStorage.setItem('userId', userId)
      localStorage.setItem('userRole', userRole)
    },
    logout(state) {
      state.isAuthenticated = false
      state.token = null
      state.userId = null
      state.userRole = null
    }
  },
  actions: {
    login({ commit }, payload) {
      commit('login', payload)
    },
    logout({ commit }) {
      commit('logout')
    },
    checkAuthentication({ getters }) {
      const isAuthenticated = getters.isAuthenticated

      if (isAuthenticated) {
        return true
      } else {
        return false
      }
    }
  },
  getters: {
    isAuthenticated(state) {
      return state.isAuthenticated
    }
  }
})

export default store
