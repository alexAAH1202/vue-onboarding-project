<template>
  <div class="dashboard">
    <header>
      <h1>Dashboard</h1>
      <button @click="logout" class="logout-btn">Logout</button>
    </header>
    <nav>
      <router-link to="/dashboard/user">User Dashboard</router-link>
      <router-link to="/dashboard/workflow">Workflow Automation</router-link>
      <router-link to="/dashboard/documents">Document Generation</router-link>
      <router-link to="/dashboard/forms">Dynamic Form Creation</router-link>
    </nav>
    <router-view></router-view>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'

export default defineComponent({
  name: 'Dashboard',
  setup() {
    const store = useStore()
    const router = useRouter()

    const logout = async () => {
      try {
        await store.dispatch('logout')
        router.push('/login')
      } catch (error) {
        console.error('Logout failed:', error)
        // Optionally, you can show an error message to the user
      }
    }

    return {
      logout
    }
  }
})
</script>

<style scoped>
.dashboard {
  padding: 20px;
}

header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

nav {
  margin-bottom: 20px;
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

nav a {
  text-decoration: none;
  color: #333;
  padding: 5px 10px;
  border-radius: 4px;
  background-color: #f0f0f0;
}

nav a.router-link-active {
  font-weight: bold;
  background-color: #e0e0e0;
}

.logout-btn {
  padding: 5px 10px;
  background-color: #f44336;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.logout-btn:hover {
  background-color: #d32f2f;
}
</style>
