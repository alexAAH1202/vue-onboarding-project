<template>
  <div class="login">
    <h1>Login</h1>
    <form @submit.prevent="handleLogin">
      <input v-model="email" type="email" placeholder="Email" required>
      <input v-model="password" type="password" placeholder="Password" required>
      <button type="submit">Login</button>
    </form>
  </div>
</template>

<script>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

export default {
  setup() {
    const router = useRouter()
    const email = ref('')
    const password = ref('')

    const handleLogin = async () => {
      // Here you would typically make an API call to authenticate
      // For this example, we'll just simulate a successful login
      localStorage.setItem('user-token', 'dummy-token')
      router.push('/dashboard')
    }

    return {
      email,
      password,
      handleLogin
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
