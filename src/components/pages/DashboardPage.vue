<script setup lang="ts">
import { useUserStore } from '@/stores/user';
const userStore = useUserStore();
</script>

<template>
  <div class="p-8">
    <div class="flex justify-between items-center mb-8">
      <h1 class="text-3xl font-bold">Welcome, {{ userStore.username }}!</h1>
      <button @click="userStore.logout()" class="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600">
        Logout
      </button>
    </div>
    <div class="bg-white p-6 rounded-lg shadow">
      <h2 class="text-xl font-semibold mb-4">Your Dashboard</h2>
      <p>This is where your tasks, updates, and statistics will be displayed.</p>
    </div>
  </div>
</template>