import { mount } from '@vue/test-utils'
import SubscriptionFlow from '@/components/SubscriptionFlow.vue'
import { createStore } from 'vuex'

// Mock store
const store = createStore({
  state: {
    user: null,
    subscription: null
  },
  mutations: {
    setUser(state, user) {
      state.user = user
    },
    setSubscription(state, subscription) {
      state.subscription = subscription
    }
  }
})

describe('SubscriptionFlow', () => {
  it('calculates correct price for monthly tier 1', async () => {
    const wrapper = mount(SubscriptionFlow, {
      global: {
        plugins: [store]
      }
    })
    await wrapper.setData({ selectedTier: 'tier1', billingCycle: 'monthly' })
    expect(wrapper.vm.calculatedPrice).toBe(9.99)
  })

  it('calculates correct price for yearly tier 2', async () => {
    const wrapper = mount(SubscriptionFlow, {
      global: {
        plugins: [store]
      }
    })
    await wrapper.setData({ selectedTier: 'tier2', billingCycle: 'yearly' })
    expect(wrapper.vm.calculatedPrice).toBe(199.99)
  })

  it('applies GST correctly', async () => {
    const wrapper = mount(SubscriptionFlow, {
      global: {
        plugins: [store]
      }
    })
    await wrapper.setData({ selectedTier: 'tier1', billingCycle: 'monthly' })
    expect(wrapper.vm.totalWithGST).toBe(10.99) // Assuming 10% GST
  })

  it('collects and stores business details correctly', async () => {
    const wrapper = mount(SubscriptionFlow, {
      global: {
        plugins: [store]
      }
    })
    await wrapper.setData({
      businessName: 'Test Company',
      businessAddress: '123 Test St, Test City',
      abnAcn: '12345678901'
    })
    await wrapper.vm.submitBusinessDetails()
    expect(store.state.user.businessName).toBe('Test Company')
    expect(store.state.user.businessAddress).toBe('123 Test St, Test City')
    expect(store.state.user.abnAcn).toBe('12345678901')
  })
})
