<script setup lang="ts">
import { RouterView } from 'vue-router'
import GlobalNotification from '@/components/universal/GlobalNotification.vue'
</script>

<template>
  <GlobalNotification />
  <RouterView />
</template>

<style scoped></style>
