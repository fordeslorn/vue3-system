import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useNotificationStore = defineStore('notification', () => {
  // --- State ---
  const message = ref('')
  const type = ref<'success' | 'error' | 'info'>('info')
  const isVisible = ref(false)
  let timeoutId: number | null = null

  // --- Actions ---
  function showNotification(
    newMessage: string,
    newType: 'success' | 'error' | 'info' = 'error',
    duration: number = 3300
  ) {
    // 如果当前有通知，先清除
    if (timeoutId) {
      clearTimeout(timeoutId)
    }

    message.value = newMessage
    type.value = newType
    isVisible.value = true

    // 设置一个定时器，在指定时间后自动隐藏通知
    timeoutId = window.setTimeout(() => {
      hideNotification()
    }, duration)
  }

  function hideNotification() {
    isVisible.value = false
    timeoutId = null
  }

  return { message, type, isVisible, showNotification, hideNotification }
})