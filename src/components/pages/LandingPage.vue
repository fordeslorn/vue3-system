<script setup lang="ts">
import { RouterLink } from 'vue-router';
</script>

<template>
  <div class="flex flex-col items-center justify-center h-screen bg-gray-100 text-center">
    <h1 class="text-5xl font-bold mb-4">Hello</h1>
    <p class="text-xl text-gray-600 mb-8">A powerful, flexible, and beautiful solution.</p>
    <RouterLink to="/login">
      <button class="px-8 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700">
        Login
      </button>
    </RouterLink>
  </div>
</template>