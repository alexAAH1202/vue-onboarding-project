<template>
  <div class="dashboard">
    <h1>Dashboard</h1>
    <div v-if="user">
      <h2>Welcome, {{ user.businessName }}</h2>
      <div class="user-details">
        <p><strong>Business Address:</strong> {{ user.businessAddress }}</p>
        <p><strong>Subscription Tier:</strong> {{ user.subscriptionTier }}</p>
        <p><strong>Subscription Length:</strong> {{ user.subscriptionLength }}</p>
        <p v-if="user.abnAcn"><strong>ABN/ACN:</strong> {{ user.abnAcn }}</p>
      </div>
    </div>
    <button @click="logout">Logout</button>
  </div>
</template>

<script>
import { computed } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'

export default {
  name: 'Dashboard',
  setup() {
    const store = useStore()
    const router = useRouter()
    const user = computed(() => store.getters.currentUser)

    if (!user.value) {
      store.dispatch('fetchUserData').catch(() => {
        router.push('/login')
      })
    }

    const logout = () => {
      store.dispatch('logout')
      router.push('/login')
    }

    return {
      user,
      logout
    }
  }
}
</script>

<style scoped>
.dashboard {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}
.user-details {
  background-color: #f0f8ff;
  padding: 20px;
  border-radius: 5px;
  margin-top: 20px;
}
button {
  margin-top: 20px;
  padding: 10px 20px;
  background-color: #4169e1;
  color: white;
  border: none;
  cursor: pointer;
}
</style>
