import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/views/Home.vue'
import Features from '@/views/Features.vue'
import Pricing from '@/views/Pricing.vue'
import Help from '@/views/Help.vue'
import SignUpForm from '@/views/SignUpForm.vue'
import Login from '@/views/Login.vue'
import Dashboard from '@/views/Dashboard.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/features',
    name: 'Features',
    component: Features
  },
  {
    path: '/pricing',
    name: 'Pricing',
    component: Pricing
  },
  {
    path: '/help',
    name: 'Help',
    component: Help
  },
  {
    path: '/signup',
    name: 'SignUp',
    component: SignUpForm
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: Dashboard,
    meta: { requiresAuth: true }
  }
  // ... other authenticated routes
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
  const isAuthenticated = localStorage.getItem('user-token') // You might want to use a more secure method
  if (to.matched.some(record => record.meta.requiresAuth) && !isAuthenticated) {
    next('/login')
  } else {
    next()
  }
})

export default router
