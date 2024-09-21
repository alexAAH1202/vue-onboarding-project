<template>
  <header class="header">
    <div class="logo">
      <router-link to="/">YourLogo</router-link>
    </div>
    <nav class="nav-menu" :class="{ 'active': isMenuOpen }">
      <ul>
        <li><router-link to="/">Home</router-link></li>
        <li><router-link to="/features">Features</router-link></li>
        <li><router-link to="/pricing">Pricing</router-link></li>
        <li><router-link to="/help">Help</router-link></li>
      </ul>
    </nav>
    <div class="cta-button">
      <router-link to="/register" class="btn-primary">Get Started</router-link>
    </div>
    <button class="menu-toggle" @click="toggleMenu" aria-label="Toggle menu">
      <span></span>
      <span></span>
      <span></span>
    </button>
  </header>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  name: 'Header',
  setup() {
    const isMenuOpen = ref(false)

    const toggleMenu = () => {
      isMenuOpen.value = !isMenuOpen.value
    }

    return {
      isMenuOpen,
      toggleMenu
    }
  }
})
</script>

<style scoped>
.header {
  background-color: var(--white);
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.logo a {
  color: var(--primary-purple);
  font-size: 1.5rem;
  font-weight: bold;
  text-decoration: none;
}

.nav-menu ul {
  display: flex;
  list-style: none;
  margin: 0;
  padding: 0;
}

.nav-menu li {
  margin-left: 1.5rem;
}

.nav-menu a {
  color: #333;
  text-decoration: none;
  font-weight: 500;
}

.nav-menu a:hover {
  color: var(--primary-blue);
}

.btn-primary {
  background-color: var(--primary-blue);
  color: var(--white);
  padding: 0.5rem 1rem;
  border-radius: 4px;
  text-decoration: none;
  font-weight: bold;
}

.menu-toggle {
  display: none;
  flex-direction: column;
  justify-content: space-around;
  width: 2rem;
  height: 2rem;
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 0;
}

.menu-toggle span {
  width: 2rem;
  height: 0.25rem;
  background-color: #333;
}

@media (max-width: 768px) {
  .nav-menu {
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    background-color: #ffffff;
    flex-direction: column;
    align-items: center;
    padding: 1rem;
    display: none;
  }

  .nav-menu.active {
    display: flex;
  }

  .nav-menu ul {
    flex-direction: column;
    align-items: center;
  }

  .nav-menu li {
    margin: 0.5rem 0;
  }

  .menu-toggle {
    display: flex;
  }

  .cta-button {
    display: none;
  }
}
</style>
