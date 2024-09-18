<template>
  <div class="user-dashboard">
    <h1>User Dashboard</h1>
    <button @click="async () => {
      if (await logout()) {
        // Handle successful logout, e.g., show a message
        console.log('Logged out successfully')
      }
    }">Logout</button>
    <div v-if="loading">Loading...</div>
    <div v-else-if="error">{{ error }}</div>
    <div v-else class="dashboard-content">
      <h2>Business Information</h2>
      <p><strong>Business Name:</strong> {{ userInfo?.businessName }}</p>
      <p><strong>Business Address:</strong> {{ userInfo?.businessAddress }}</p>
      <p v-if="userInfo?.abnAcn"><strong>ABN/ACN:</strong> {{ userInfo?.abnAcn }}</p>
      
      <h2>Subscription Details</h2>
      <p><strong>Selected Tier:</strong> {{ userInfo?.subscriptionTier }}</p>
      <p><strong>Billing Frequency:</strong> {{ userInfo?.billingFrequency }}</p>
      <p><strong>Base Price:</strong> ${{ (userInfo?.basePrice ?? 0).toFixed(2) }}</p>
      <p><strong>GST:</strong> ${{ (userInfo?.gst ?? 0).toFixed(2) }}</p>
      <p><strong>Total Price:</strong> ${{ (userInfo?.totalPrice ?? 0).toFixed(2) }}</p>
      <p><strong>Next Payment Date:</strong> {{ formatDate(userInfo?.nextPaymentDate) }}</p>

      <div v-if="isSubscriptionExpiringSoon" class="renewal-prompt">
        <h3>Your subscription is expiring soon!</h3>
        <button @click="showRenewalModal = true">Renew Now</button>
      </div>

      <button @click="showUpdateBusinessInfoModal = true">Update Business Info</button>
    </div>

    <!-- Renewal Modal -->
    <div v-if="showRenewalModal" class="modal">
      <h2>Renew Your Subscription</h2>
      <select v-model="newSubscriptionTier">
        <option value="basic">Basic</option>
        <option value="pro">Pro</option>
        <option value="enterprise">Enterprise</option>
      </select>
      <select v-model="newBillingFrequency">
        <option value="monthly">Monthly</option>
        <option value="yearly">Yearly</option>
      </select>
      <p><strong>New Price:</strong> ${{ calculateNewPrice() }}</p>
      <button @click="renewSubscription">Confirm Renewal</button>
      <button @click="showRenewalModal = false">Cancel</button>
    </div>

    <!-- Update Business Info Modal -->
    <div v-if="showUpdateBusinessInfoModal" class="modal">
      <h2>Update Business Information</h2>
      <input v-model="newBusinessName" placeholder="Business Name">
      <input v-model="newBusinessAddress" placeholder="Business Address">
      <input v-model="newAbnAcn" placeholder="ABN/ACN">
      <button @click="updateBusinessInfo">Update</button>
      <button @click="showUpdateBusinessInfoModal = false">Cancel</button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'

export default defineComponent({
  setup() {
    const store = useStore()
    const router = useRouter()

    // Define your reactive properties
    const userInfo = computed(() => store.state.user.userInfo)
    const loading = ref(false)
    const error = ref('')
    const showRenewalModal = ref(false)
    const showUpdateBusinessInfoModal = ref(false)
    const newSubscriptionTier = ref('')
    const newBillingFrequency = ref('')
    const newBusinessName = ref('')
    const newBusinessAddress = ref('')
    const newAbnAcn = ref('')

    // Define your methods
    const logout = async () => {
      try {
        loading.value = true
        await store.dispatch('logout')
        router.push('/login')
        return true
      } catch (err) {
        console.error('Logout failed:', err)
        error.value = 'Logout failed. Please try again.'
        return false
      } finally {
        loading.value = false
      }
    }

    const formatDate = (date: string) => {
      // Implement date formatting
    }

    const isSubscriptionExpiringSoon = computed(() => {
      const expirationDate = new Date(userInfo.value?.nextPaymentDate || '')
      const today = new Date()
      const daysUntilExpiration = Math.ceil((expirationDate.getTime() - today.getTime()) / (1000 * 3600 * 24))
      return daysUntilExpiration <= 7 // Consider "soon" as within 7 days
    })

    const calculateNewPrice = () => {
      // Implement pricing logic based on newSubscriptionTier and newBillingFrequency
      // This is a placeholder implementation
      const basePrice = newSubscriptionTier.value === 'basic' ? 10 : newSubscriptionTier.value === 'pro' ? 20 : 30
      const multiplier = newBillingFrequency.value === 'yearly' ? 10 : 1 // 2 months free for yearly
      return (basePrice * multiplier * 1.1).toFixed(2) // Including 10% GST
    }

    const renewSubscription = async () => {
      try {
        loading.value = true
        const renewalData = {
          subscriptionTier: newSubscriptionTier.value,
          billingFrequency: newBillingFrequency.value,
          businessName: newBusinessName.value,
          businessAddress: newBusinessAddress.value,
          abnAcn: newAbnAcn.value
        }
        await store.dispatch('renewSubscription', renewalData)
        showRenewalModal.value = false
        // Optionally, show a success message
      } catch (err) {
        console.error('Renewal failed:', err)
        error.value = 'Renewal failed. Please try again.'
      } finally {
        loading.value = false
      }
    }

    const updateBusinessInfo = async () => {
      try {
        loading.value = true
        const updatedInfo = {
          businessName: newBusinessName.value,
          businessAddress: newBusinessAddress.value,
          abnAcn: newAbnAcn.value
        }
        await store.dispatch('updateBusinessInfo', updatedInfo)
        showUpdateBusinessInfoModal.value = false
        // Optionally, show a success message
      } catch (err) {
        console.error('Update failed:', err)
        error.value = 'Update failed. Please try again.'
      } finally {
        loading.value = false
      }
    }

    return {
      userInfo,
      loading,
      error,
      showRenewalModal,
      showUpdateBusinessInfoModal,
      newSubscriptionTier,
      newBillingFrequency,
      newBusinessName,
      newBusinessAddress,
      newAbnAcn,
      logout,
      formatDate,
      isSubscriptionExpiringSoon,
      calculateNewPrice,
      renewSubscription,
      updateBusinessInfo
    }
  }
})
</script>

<style scoped>
/* ... existing styles ... */

.renewal-prompt {
  background-color: #ffe0b2;
  padding: 15px;
  border-radius: 4px;
  margin-top: 20px;
}

.modal {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.modal input, .modal select {
  display: block;
  width: 100%;
  margin-bottom: 10px;
  padding: 5px;
}

.modal button {
  margin-right: 10px;
}
</style>
