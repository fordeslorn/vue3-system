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
      component: Login,
      meta: { guestOnly: true }
    },
    {
      path: '/signup',
      name: 'signup',
      component: Register,
      meta: { guestOnly: true }
    }
     
  ]
})

// 全局导航守卫
router.beforeEach(async (to, from, next) => {
  const userStore = useUserStore();  
  
  if (to.meta.guestOnly && userStore.isLoggedIn) {
    // 如果用户已登录，但想访问登录/注册页，则将他们重定向到首页
    next({ name: 'home' });
  } else {
    // 否则正常放行
    next();
  }
});
export default router