import { createStore } from 'vuex'

export default createStore({
  state: {
    user: null,
    isAuthenticated: false
  },
  getters: {
    isAuthenticated: state => state.isAuthenticated
  },
  mutations: {
    SET_USER(state, user) {
      state.user = user
      state.isAuthenticated = !!user
    }
  },
  actions: {
    login({ commit }, user) {
      // Perform login logic here
      commit('SET_USER', user)
    },
    logout({ commit }) {
      // Perform logout logic here
      commit('SET_USER', null)
    }
  }
})
