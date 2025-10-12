import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import router from '@/router'

// 使用 'user' 作为第一个参数，这是 store 的唯一 ID
export const useUserStore = defineStore('user', () => {
    // State (状态)
    const userId = ref<string | null>(null)
    const username = ref<string | null>(null)
    // 添加一个加载状态，防止重复检查登录状态
    const isRestoringSession = ref(false)

    const isLoggedIn = computed(() => !!userId.value)

    // Actions (方法)
    /**
   * [核心] 尝试恢复会话
   * 当用户刷新页面或首次访问时调用，检查用户是否已经有有效的登录凭证（如 cookie）
   */
    async function restoreSession() {
        // 如果正在检查，或已经登录了，就没必要再检查了
        if (isRestoringSession.value || isLoggedIn.value) return

        isRestoringSession.value = true

        try {
        // 模拟向后端发送一个请求，例如 '/api/me'，来获取当前用户信息
        // 后端会根据请求中的 cookie 来判断用户是否登录
        // 用 setTimeout 模拟一个网络延迟
            await new Promise(resolve => setTimeout(resolve, 500));

        // 在真实项目中，你会这样做：
        // const response = await fetch('/api/me');
        // if (response.ok) {
        //   const userData = await response.json();
        //   setUser(userData);
        
        // 为了演示，我们假设用户之前登录过，手动设置一个用户信息
            setUser({ id: 'user_restored_123', name: '已恢复的用户' });
        // }
      
        } catch (error) {
            console.error('恢复会话失败', error)
        } finally {
        // 无论成功与否，检查过程都结束了
            isRestoringSession.value = false
        }
    }

    // 设置用户信息并更新登录状态
    function setUser(userData: { id: string; name: string }) {
        userId.value = userData.id
        username.value = userData.name
    }

    function logout() {
        userId.value = null
        username.value = null
        // 实际项目中，这里还会调用后端接口来销毁 session 或 token
        
        // 退出后，强制跳转到未登录的首页
        router.push('/')
    }

    return {
    userId,
    username,
    isLoggedIn,
    isRestoringSession,
    setUser,
    logout,
    restoreSession,
  }
})