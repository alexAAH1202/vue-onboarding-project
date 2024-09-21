import { createStore } from 'vuex'

export default createStore({
  state: {
    user: null
  },
  mutations: {
    SET_USER(state, user) {
      state.user = user
    }
  },
  actions: {
    async logout({ commit }) {
      // Perform any necessary logout operations (e.g., API call to invalidate token)
      // Then clear the user from the state
      commit('SET_USER', null)
      // Optionally, clear any stored tokens or user data from localStorage
      localStorage.removeItem('user-token')
    }
  }
})
