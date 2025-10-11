// filepath: src/router/index.ts
import { createRouter, createWebHistory } from 'vue-router'
import Login from '@/components/Login.vue'
import Register from '@/components/Register.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/login' // 默认重定向到登录页
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/signup',
      name: 'signup',
      component: Register
    }
  ]
})

export default router