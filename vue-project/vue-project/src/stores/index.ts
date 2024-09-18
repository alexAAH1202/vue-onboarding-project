import { createStore, Store } from 'vuex'
import axios from 'axios'

export interface UserInfo {
  businessName: string
  businessAddress: string
  abnAcn?: string
  subscriptionTier: string
  billingFrequency: 'monthly' | 'yearly'
  basePrice: number
  gst: number
  totalPrice: number
  nextPaymentDate: string
}

export interface State {
  token: string | null
  userInfo: UserInfo | null
}

export const store: Store<State> = createStore<State>({
  state: {
    token: localStorage.getItem('token') || null,
    userInfo: null
  },
  mutations: {
    setToken(state: State, token: string) {
      state.token = token
      localStorage.setItem('token', token)
    },
    clearToken(state: State) {
      state.token = null
      localStorage.removeItem('token')
    },
    setUserInfo(state: State, userInfo: UserInfo) {
      state.userInfo = userInfo
    }
  },
  actions: {
    async fetchUserInfo({ commit, state }) {
      try {
        const response = await axios.get<UserInfo>('http://localhost:3000/api/user-info', {
          headers: { Authorization: `Bearer ${state.token}` }
        })
        commit('setUserInfo', response.data)
      } catch (error) {
        console.error('Error fetching user info:', error)
        throw error
      }
    },
    async updateSubscription({ commit, state }, { tier, frequency }: { tier: string, frequency: 'monthly' | 'yearly' }) {
      try {
        const response = await axios.post<UserInfo>('http://localhost:3000/api/update-subscription', 
          { tier, frequency },
          { headers: { Authorization: `Bearer ${state.token}` } }
        )
        commit('setUserInfo', response.data)
      } catch (error) {
        console.error('Error updating subscription:', error)
        throw error
      }
    },
    async updateBusinessInfo({ commit, state }, { businessName, businessAddress, abnAcn }: Partial<UserInfo>) {
      try {
        const response = await axios.post<UserInfo>('http://localhost:3000/api/update-business-info', 
          { businessName, businessAddress, abnAcn },
          { headers: { Authorization: `Bearer ${state.token}` } }
        )
        commit('setUserInfo', response.data)
      } catch (error) {
        console.error('Error updating business info:', error)
        throw error
      }
    },
    async logout({ commit }): Promise<void> {
      try {
        // Call your logout API endpoint if you have one
        // await axios.post('/api/logout')
        
        commit('clearToken')
        commit('setUserInfo', null)
      } catch (error) {
        console.error('Logout failed:', error)
        throw error // Re-throw the error so it can be caught in the component
      }
    }
  },
  getters: {
    isAuthenticated: (state: State): boolean => !!state.token,
    isSubscriptionExpiringSoon: (state: State): boolean => {
      if (!state.userInfo) return false
      const nextPaymentDate = new Date(state.userInfo.nextPaymentDate)
      const today = new Date()
      const daysUntilExpiration = Math.ceil((nextPaymentDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24))
      return daysUntilExpiration <= 7 // Consider "soon" as within 7 days
    }
  }
})

export default store