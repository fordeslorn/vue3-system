<script setup lang="ts">
import { useUserStore } from '@/stores/user';
import LandingPage from '@/components/pages/LandingPage.vue';
import DashboardPage from '@/components/pages/DashboardPage.vue';

const userStore = useUserStore();
</script>
<template>
  <div>
    <!-- 如果正在检查登录状态，显示一个加载动画 -->
    <div v-if="userStore.isRestoringSession" class="flex items-center justify-center h-screen">
      <p>正在加载...</p>
    </div>
    <!-- 检查完毕后，根据登录状态显示不同组件 -->
    <DashboardPage v-else-if="userStore.isLoggedIn" />
    <LandingPage v-else />
  </div>
</template>