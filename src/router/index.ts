import { createRouter, createWebHistory } from 'vue-router'
import { useUserStore } from '@/stores/user'
import Login from '@/components/Login.vue'
import Register from '@/components/Register.vue'
import Homeview from '@/views/Homeview.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Homeview
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

// 全局导航守卫
router.beforeEach(async (to, from, next) => {
  const userStore = useUserStore()

  // 首次进入或刷新页面时，先尝试恢复会话
  if (!userStore.isLoggedIn && !userStore.isRestoringSession) {
    await userStore.restoreSession()
  }

  // 如果目标路由需要登录，但用户未登录
  if (to.meta.requiresAuth && !userStore.isLoggedIn) {
    // 则重定向到登录页
    next({ name: 'login' })
  } else {
    // 否则，正常放行
    next()
  }
})

export default router