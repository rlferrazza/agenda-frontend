import { createRouter, createWebHistory } from 'vue-router'
import store from '@/auth'

const routes = [
  {
    path: '/',
    name: 'login',
    component: () => import('../views/LoginView.vue')
  },
  {
    path: '/home',
    name: 'Menus',
    component: () => import('../views/HomeView.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/profile',
    name: 'Perfil',
    component: () => import('../views/ProfileView.vue'),
    meta: { requiresAuth: true }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes: routes
})

router.beforeEach((to, from, next) => {
  const authState = JSON.parse(localStorage.getItem('authState'))

  if (authState) {
    const token = localStorage.getItem('token')
    const userId = localStorage.getItem('userId')
    const payload = { token, userId }
    store.commit('login', payload)
  }
  const isAuthenticated = store.getters.isAuthenticated

  if (to.matched.some((record) => record.meta.requiresAuth) && !isAuthenticated) {
    next({ path: '/' })
  } else {
    next()
  }
})

export default router
