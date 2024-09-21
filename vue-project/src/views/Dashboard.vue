<template>
  <div class="dashboard">
    <h1>Welcome, {{ user.name }}</h1>
    <nav>
      <router-link v-if="canAccessWorkflows" to="/dashboard/workflows">Workflows</router-link>
      <router-link v-if="canAccessForms" to="/dashboard/forms">Forms</router-link>
      <router-link v-if="canAccessDocuments" to="/dashboard/documents">Documents</router-link>
    </nav>
    <router-view></router-view>
  </div>
</template>

<script>
import { computed } from 'vue'
import { useStore } from 'vuex'

export default {
  setup() {
    const store = useStore()
    const user = computed(() => store.state.user)

    const canAccessWorkflows = computed(() => ['practitioner', 'administrative_staff', 'systems_administrator'].includes(user.value.role))
    const canAccessForms = computed(() => ['practitioner', 'administrative_staff', 'systems_administrator', 'participant'].includes(user.value.role))
    const canAccessDocuments = computed(() => ['practitioner', 'administrative_staff', 'systems_administrator', 'plan_manager'].includes(user.value.role))

    return {
      user,
      canAccessWorkflows,
      canAccessForms,
      canAccessDocuments
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
