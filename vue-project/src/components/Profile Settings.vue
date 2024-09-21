<template>
  <div class="profile-settings">
    <h2>Profile Information</h2>
    <form @submit.prevent="updateProfile">
      <div class="form-group">
        <label for="name">Name:</label>
        <input type="text" id="name" v-model="profile.name" required>
      </div>
      <div class="form-group">
        <label for="email">Email:</label>
        <input type="email" id="email" v-model="profile.email" required>
      </div>
      <div class="form-group">
        <label for="phone">Phone:</label>
        <input type="tel" id="phone" v-model="profile.phone">
      </div>
      <button type="submit" :disabled="isUpdating">Update Profile</button>
    </form>
    <p v-if="updateMessage" :class="{ 'success': updateSuccess, 'error': !updateSuccess }">
      {{ updateMessage }}
    </p>
  </div>
</template>

<script>
import { defineComponent, ref, reactive } from 'vue'
import { useStore } from 'vuex'

export default defineComponent({
  name: 'ProfileSettings',
  setup() {
    const store = useStore()
    const profile = reactive({
      name: store.state.user.name,
      email: store.state.user.email,
      phone: store.state.user.phone || ''
    })
    const isUpdating = ref(false)
    const updateMessage = ref('')
    const updateSuccess = ref(false)

    const updateProfile = async () => {
      isUpdating.value = true
      updateMessage.value = ''
      try {
        // Call API to update profile
        await store.dispatch('updateUserProfile', profile)
        updateSuccess.value = true
        updateMessage.value = 'Profile updated successfully!'
      } catch (error) {
        updateSuccess.value = false
        updateMessage.value = 'Failed to update profile. Please try again.'
        console.error('Profile update error:', error)
      } finally {
        isUpdating.value = false
      }
    }

    return {
      profile,
      isUpdating,
      updateMessage,
      updateSuccess,
      updateProfile
    }
  }
})
</script>

<style scoped>
.form-group {
  margin-bottom: 1rem;
}
label {
  display: block;
  margin-bottom: 0.5rem;
}
input {
  width: 100%;
  padding: 0.5rem;
}
.success {
  color: green;
}
.error {
  color: red;
}
</style>
