import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import Dashboard from '../views/Dashboard.vue'
import UserDashboard from '@/components/UserDashboard.vue'
import store from '../store'
import WorkFlowAutomation from '@/components/WorkFlowAutomation.vue'
import DynamicFormCreation from '@/components/DynamicFormCreation.vue'
import DocumentGeneration from '@/components/DocumentGeneration.vue'

import Features from '@/views/Features.vue'
import Pricing from '@/views/Pricing.vue'
import Help from '@/views/Help.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: UserDashboard,
    meta: { requiresAuth: true }
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
  }
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: Dashboard,
    meta: { requiresAuth: true }
    children: [
      { path: 'workflows', component: WorkflowAutomation },
      { path: 'forms', component: DynamicForms },
      { path: 'documents', component: DocumentGeneration }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!store.getters.isAuthenticated) {
      next('/login')
    } else {
      next()
    }
  } else {
    next()
  }
})

export default router
