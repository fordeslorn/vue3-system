<script setup lang="ts">
import { ref } from 'vue'
import { RouterLink } from 'vue-router'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

const email = ref('')
const password = ref('')
const confirmPassword = ref('')

function handleRegister() {
  // 在这里处理注册逻辑
  console.log('Email:', email.value)
  console.log('Password:', password.value)
  console.log('Confirm Password:', confirmPassword.value)
  alert(`注册中... \n邮箱: ${email.value}\n密码: ${password.value}\n确认密码: ${confirmPassword.value}`)

  password.value = ''  // 清空密码字段
  confirmPassword.value = ''  // 清空确认密码字段
}
</script>

<template>
<div class="relative min-h-screen flex items-center justify-center bg-cover bg-center bg-no-repeat" style="background-image: url('/bg3.png')">  
  <div class="absolute inset-0 bg-black/40"></div>
    <Card class="w-full max-w-sm relative z-10 bg-zinc-950 backdrop-blur-sm border border-white/20 text-white transform -translate-x-35">
      <CardHeader>
        <CardTitle class="text-2xl text-center">
          Create your Account
        </CardTitle>
        <CardDescription>
          Please enter your email and password to create your account.
        </CardDescription>
      </CardHeader>
      <CardContent class="grid gap-4">
        <div class="grid gap-2">
          <Label for="email">Email</Label>
          <Input id="email" v-model="email" type="email" placeholder="m@example.com" required />
        </div>
        <div class="grid gap-2">
          <Label for="password">Password</Label>
          <Input id="password" v-model="password" type="password" placeholder="Enter your password" required />
        </div>
        <div class="grid gap-2">
          <Label for="confirm-password">Confirm Password</Label>
          <Input id="confirm-password" v-model="confirmPassword" type="password" placeholder="Confirm your password" required />
        </div>
      </CardContent>
      <CardFooter class="grid gap-4 justify-items-center">
        <Button class="w-full bg-gray-700/50 hover:bg-gray-700/80 active:bg-indigo-700 text-white shadow-sm hover:shadow-md focus-visible:ring-2 focus-visible:ring-indigo-300/50 transition duration-150 transform hover:-translate-y-0.5" @click="handleRegister">
          Sign up
        </Button>
        <Label>Already have an account? <RouterLink to="/login" class="text-indigo-400 hover:underline">Log in</RouterLink></Label>
      </CardFooter>
    </Card>
  </div>
</template>