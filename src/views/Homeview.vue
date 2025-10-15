<script setup lang="ts">
import { useUserStore } from '@/stores/user';
import LandingPage from '@/components/pages/LandingPage.vue';
import DashboardPage from '@/components/pages/DashboardPage.vue';

const userStore = useUserStore();
</script>
<template>
  <div>
    <DashboardPage v-if="userStore.isLoggedIn" />
    <LandingPage v-else />
  </div>
</template>