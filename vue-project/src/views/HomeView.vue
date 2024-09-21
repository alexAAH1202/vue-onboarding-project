<template>
  <div class="home">
    <header class="header">
      <nav class="nav-container" :class="{ 'nav-open': isNavOpen }">
        <div class="logo">
          <router-link to="/" aria-label="Home">YourLogo</router-link>
        </div>
        <button class="nav-toggle" @click="toggleNav" aria-label="Toggle navigation">
          <span class="sr-only">Menu</span>
          <span class="icon-bar"></span>
          <span class="icon-bar"></span>
          <span class="icon-bar"></span>
        </button>
        <ul class="nav-links">
          <li><router-link to="/">Home</router-link></li>
          <li><router-link to="/features">Features</router-link></li>
          <li><router-link to="/pricing">Pricing</router-link></li>
          <li><router-link to="/help">Help</router-link></li>
        </ul>
        <div class="auth-buttons">
          <button @click="openSignUp" class="btn btn-primary">Get Started</button>
          <button @click="openLogin" class="btn btn-secondary">Login</button>
        </div>
      </nav>
    </header>

    <main>
      <h1>Welcome to Our Platform</h1>
      <p>Discover the amazing features we offer to boost your productivity.</p>
      <button @click="openSignUp" class="btn btn-large btn-primary">Get Started Now</button>
    </main>

    <!-- Sign-up/Enquiry Form Modal -->
    <div v-if="showSignUpModal" class="modal" @click.self="closeSignUp">
      <div class="modal-content" role="dialog" aria-labelledby="signUpModalTitle">
        <h2 id="signUpModalTitle">Sign Up</h2>
        <!-- Add your sign-up form here -->
        <button @click="closeSignUp" class="btn btn-secondary">Close</button>
      </div>
    </div>

    <!-- Login Modal -->
    <div v-if="showLoginModal" class="modal" @click.self="closeLogin">
      <div class="modal-content" role="dialog" aria-labelledby="loginModalTitle">
        <h2 id="loginModalTitle">Login</h2>
        <!-- Add your login form here -->
        <button @click="closeLogin" class="btn btn-secondary">Close</button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  name: 'Home',
  setup() {
    const isNavOpen = ref(false)
    const showSignUpModal = ref(false)
    const showLoginModal = ref(false)

    const toggleNav = () => {
      isNavOpen.value = !isNavOpen.value
    }

    const openSignUp = () => {
      showSignUpModal.value = true
    }

    const closeSignUp = () => {
      showSignUpModal.value = false
    }

    const openLogin = () => {
      showLoginModal.value = true
    }

    const closeLogin = () => {
      showLoginModal.value = false
    }

    return {
      isNavOpen,
      showSignUpModal,
      showLoginModal,
      toggleNav,
      openSignUp,
      closeSignUp,
      openLogin,
      closeLogin
    }
  }
})
</script>

<style scoped>
.home {
  font-family: Arial, sans-serif;
  line-height: 1.6;
  color: #333;
}

.header {
  background-color: #f8f9fa;
  padding: 1rem;
}

.nav-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1200px;
  margin: 0 auto;
}

.logo a {
  font-size: 1.5rem;
  font-weight: bold;
  color: #007bff;
  text-decoration: none;
}

.nav-toggle {
  display: none;
}

.nav-links {
  display: flex;
  list-style-type: none;
  margin: 0;
  padding: 0;
}

.nav-links li {
  margin-left: 1rem;
}

.nav-links a {
  color: #333;
  text-decoration: none;
  font-weight: 500;
}

.auth-buttons {
  display: flex;
  gap: 1rem;
}

.btn {
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-weight: bold;
}

.btn-primary {
  background-color: #007bff;
  color: white;
}

.btn-secondary {
  background-color: #6c757d;
  color: white;
}

.btn-large {
  font-size: 1.2rem;
  padding: 0.75rem 1.5rem;
}

main {
  max-width: 800px;
  margin: 2rem auto;
  text-align: center;
}

h1 {
  font-size: 2.5rem;
  margin-bottom: 1rem;
}

.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-content {
  background-color: white;
  padding: 2rem;
  border-radius: 4px;
  max-width: 500px;
  width: 100%;
}

.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border-width: 0;
}

@media (max-width: 768px) {
  .nav-container {
    flex-direction: column;
    align-items: flex-start;
  }

  .nav-toggle {
    display: block;
    background: none;
    border: none;
    font-size: 1.5rem;
    cursor: pointer;
    position: absolute;
    top: 1rem;
    right: 1rem;
  }

  .icon-bar {
    display: block;
    width: 25px;
    height: 3px;
    background-color: #333;
    margin: 5px 0;
  }

  .nav-links {
    display: none;
    flex-direction: column;
    width: 100%;
  }

  .nav-open .nav-links {
    display: flex;
  }

  .nav-links li {
    margin: 0.5rem 0;
  }

  .auth-buttons {
    flex-direction: column;
    width: 100%;
    gap: 0.5rem;
    margin-top: 1rem;
  }

  .nav-open .auth-buttons {
    display: flex;
  }
}
</style>
