<script setup lang="ts">
import { useNotificationStore } from '@/stores/notification'
import { computed } from 'vue'

const notificationStore = useNotificationStore()
 
// 根据通知类型计算背景颜色
const notificationClass = computed(() => {
  switch (notificationStore.type) {
    case 'error':
      return 'text-[#4b1113] bg-[#ffebec] border-[1.4px] border-[#FF3238]'
    case 'success':
      return 'text-[#003100] bg-[#e6f6e6] border-[1.4px] border-[#009400]'
    default:
      return 'text-[#193c47] bg-[#eef9fd] border-[1.4px] border-[#4cb3d4]'
  }

})
</script>

<template>
  <!-- 使用 Transition 组件实现平滑的进入和离开动画 -->
  <Transition
    enter-active-class="transition ease-out duration-300"
    enter-from-class="transform -translate-y-full opacity-0"
    enter-to-class="transform translate-y-0 opacity-100"
    leave-active-class="transition ease-in duration-300"
    leave-from-class="transform translate-y-0 opacity-100"
    leave-to-class="transform -translate-y-full opacity-0"
  >
    <div
      v-if="notificationStore.isVisible"
      :class="[
        'fixed top-0 left-1/2 -translate-x-1/2 w-auto max-w-md mt-4 px-6 py-3 rounded-lg shadow-lg z-[9999]',
        notificationClass,
      ]"
    >
      <p>{{ notificationStore.message }}</p>
    </div>
  </Transition>
</template>