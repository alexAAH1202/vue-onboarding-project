<template>
  <div class="settings">
    <h1>Settings</h1>
    <div class="settings-sections">
      <ProfileSettings />
      <PasswordChange />
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import ProfileSettings from '@/components/ProfileSettings.vue'
import PasswordChange from '@/components/PasswordChange.vue'

export default defineComponent({
  name: 'Settings',
  components: {
    ProfileSettings,
    PasswordChange
  }
})
</script>

<style scoped>
.settings-sections {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}
</style>
