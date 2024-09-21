<template>
  <div class="login">
    <h2>Login</h2>
    <form @submit.prevent="handleSubmit">
      <div>
        <label for="email">Email:</label>
        <input type="email" id="email" v-model="email" required>
      </div>
      <div>
        <label for="password">Password:</label>
        <input type="password" id="password" v-model="password" required>
      </div>
      <button type="submit">Login</button>
    </form>
    <p v-if="error" class="error">{{ error }}</p>
  </div>
</template>

<script>
import { ref } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'

export default {
  name: 'Login',
  setup() {
    const store = useStore()
    const router = useRouter()
    const email = ref('')
    const password = ref('')
    const error = ref('')

    const handleSubmit = async () => {
      try {
        await store.dispatch('login', { email: email.value, password: password.value })
        router.push('/dashboard')
      } catch (err) {
        error.value = 'Login failed. Please check your credentials.'
      }
    }

    return {
      email,
      password,
      error,
      handleSubmit
    }
  }
}
</script>

<style scoped>
.login {
  max-width: 300px;
  margin: 0 auto;
  padding: 20px;
}
form div {
  margin-bottom: 10px;
}
label {
  display: block;
}
input {
  width: 100%;
  padding: 5px;
}
button {
  width: 100%;
  padding: 10px;
  background-color: #4169e1;
  color: white;
  border: none;
  cursor: pointer;
}
.error {
  color: red;
  margin-top: 10px;
}
</style>
