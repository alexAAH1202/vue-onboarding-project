import { createStore, Store, StoreEnhancer } from 'vuex'
import { api } from '@/api'

const store = createStore({
  state: {
    user: {
      userInfo: null
    }
  },
  actions: {
    async renewSubscription({ commit }, renewalData) {
      try {
        // Call your API to process the renewal
        const response = await api.renewSubscription(renewalData)
        // Update the store with the new subscription info
        commit('UPDATE_USER_INFO', response.data)
      } catch (error) {
        console.error('Failed to renew subscription:', error)
        throw error
      }
    },

    async updateBusinessInfo({ commit }, updatedInfo) {
      try {
        // Call your API to update business info
        const response = await api.updateBusinessInfo(updatedInfo)
        // Update the store with the new user info
        commit('UPDATE_USER_INFO', response.data)
      } catch (error) {
        console.error('Failed to update business info:', error)
        throw error
      }
    }
  },

  mutations: {
    UPDATE_USER_INFO(state, userInfo) {
      state.user.userInfo = userInfo
    }
  }
})

export default store
