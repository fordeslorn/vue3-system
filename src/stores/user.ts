import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import router from '@/router'
import apiClient from '@/api'

// 使用 'user' 作为第一个参数，这是 store 的唯一 ID
export const useUserStore = defineStore('user', () => {
    // State (状态)
    const userId = ref<string | null>(null)
    const userName = ref<string | null>(null)

    const isLoggedIn = computed(() => !!userId.value)

    // Actions (方法)
    /**
   * [核心] 尝试恢复会话
   * 当用户刷新页面或首次访问时调用，检查用户是否已经有有效的登录凭证（如 cookie）
   */
    async function restoreSession() {
        // 如果正在检查，或已经登录了，就没必要再检查了
        if (isLoggedIn.value) return

        try {
            const response = await apiClient.get('/me');
            if (response.data) {
                setUser({ id: response.data.id, name: response.data.username });
        }
        } catch (error) {
            console.error('用户未登录或 token 失效', error)
        }
    }

    // 设置用户信息并更新登录状态
    function setUser(userData: { id: string; name: string }) {
        userId.value = userData.id
        userName.value = userData.name
    }

    async function logout() {
        try{
            await apiClient.post('/logout');
        } catch (error) {
            console.error('登出失败', error)
        } finally {
            userId.value = null
            userName.value = null
            // 退出后，强制跳转到未登录的首页
            router.push('/')
        }
    }

    return {
    userId,
    userName,
    isLoggedIn,
    setUser,
    logout,
    restoreSession,
  }
})