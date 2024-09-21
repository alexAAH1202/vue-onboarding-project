<template>
  <nav v-if="isAuthenticated">
    <router-link to="/dashboard">Dashboard</router-link>
    <router-link to="/workflows">Workflows</router-link>
    <router-link to="/forms">Forms</router-link>
    <router-link to="/documents">Documents</router-link>
    <router-link to="/clients">Clients</router-link>
    <router-link to="/calendar">Calendar</router-link>
    <router-link to="/reports">Reports</router-link>
    <router-link to="/settings">Settings</router-link>
    <a href="#" @click.prevent="logout">Logout</a>
  </nav>
</template>

<script>
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'

export default {
  setup() {
    const router = useRouter()
    const store = useStore()

    const isAuthenticated = computed(() => store.getters.isAuthenticated)

    const logout = async () => {
      await store.dispatch('logout')
      router.push('/login')
    }

    return { 
      isAuthenticated,
      logout 
    }
  }
}
</script>

<style scoped>
/* ... styles ... */
</style>
