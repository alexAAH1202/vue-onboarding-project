<template>
  <div class="home">
    <header>
      <nav>
        <router-link to="/">Home</router-link>
        <router-link to="/features">Features</router-link>
        <router-link to="/pricing">Pricing</router-link>
        <router-link to="/help">Help</router-link>
        <router-link to="/signup" class="btn">Sign Up</router-link>
        <router-link to="/login" class="btn">Login</router-link>
      </nav>
    </header>
    <main>
      <h1>Welcome to Our Platform</h1>
      <p>Discover our amazing features and pricing plans.</p>
    </main>
  </div>
</template>

<script>
export default {
  name: 'Home'
}
</script>

<style scoped>
.home {
  text-align: center;
}

nav {
  padding: 20px;
}

nav a {
  margin: 0 10px;
  text-decoration: none;
  color: #333;
}

.btn {
  padding: 10px 20px;
  background-color: #007bff;
  color: white;
  border-radius: 5px;
}
</style>
