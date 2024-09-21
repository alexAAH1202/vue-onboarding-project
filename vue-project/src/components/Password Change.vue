<template>
  <div class="password-change">
    <h2>Change Password</h2>
    <form @submit.prevent="changePassword">
      <div class="form-group">
        <label for="current-password">Current Password:</label>
        <input type="password" id="current-password" v-model="passwordData.currentPassword" required>
      </div>
      <div class="form-group">
        <label for="new-password">New Password:</label>
        <input type="password" id="new-password" v-model="passwordData.newPassword" required>
      </div>
      <div class="form-group">
        <label for="confirm-password">Confirm New Password:</label>
        <input type="password" id="confirm-password" v-model="passwordData.confirmPassword" required>
      </div>
      <button type="submit" :disabled="isChanging">Change Password</button>
    </form>
    <p v-if="changeMessage" :class="{ 'success': changeSuccess, 'error': !changeSuccess }">
      {{ changeMessage }}
    </p>
  </div>
</template>

<script>
import { defineComponent, ref, reactive } from 'vue'
import { useStore } from 'vuex'

export default defineComponent({
  name: 'PasswordChange',
  setup() {
    const store = useStore()
    const passwordData = reactive({
      currentPassword: '',
      newPassword: '',
      confirmPassword: ''
    })
    const isChanging = ref(false)
    const changeMessage = ref('')
    const changeSuccess = ref(false)

    const changePassword = async () => {
      if (passwordData.newPassword !== passwordData.confirmPassword) {
        changeMessage.value = 'New passwords do not match.'
        changeSuccess.value = false
        return
      }

      isChanging.value = true
      changeMessage.value = ''
      try {
        // Call API to change password
        await store.dispatch('changeUserPassword', {
          currentPassword: passwordData.currentPassword,
          newPassword: passwordData.newPassword
        })
        changeSuccess.value = true
        changeMessage.value = 'Password changed successfully!'
        // Clear form
        passwordData.currentPassword = ''
        passwordData.newPassword = ''
        passwordData.confirmPassword = ''
      } catch (error) {
        changeSuccess.value = false
        changeMessage.value = 'Failed to change password. Please try again.'
        console.error('Password change error:', error)
      } finally {
        isChanging.value = false
      }
    }

    return {
      passwordData,
      isChanging,
      changeMessage,
      changeSuccess,
      changePassword
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
