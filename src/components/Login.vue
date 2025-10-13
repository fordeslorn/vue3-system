<script setup lang="ts">
import { ref, watch } from 'vue'
import { RouterLink, useRouter } from 'vue-router'
import { useUserStore } from '@/stores/user'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

const router = useRouter()
const userStore = useUserStore()  

const email = ref('')
const password = ref('')

// 错误信息 ref
const emailError = ref('')
const passwordError = ref('')


// 验证函数
function validateEmail() {
  // 简单的邮箱格式正则
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!email.value) {
    emailError.value = 'Email cannot be empty'
  } else if (!emailRegex.test(email.value)) {
    emailError.value = 'Please enter a valid email address'
  } else {
    emailError.value = ''
  }
}

function validatePassword() {
  // 密码要求：8位以上，包含大小写字母和数字
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/
  if (!password.value) {
    passwordError.value = 'Password cannot be empty'
  } else if (password.value.length < 8) {
    passwordError.value = 'Password must be at least 8 characters long'
  } else if (!passwordRegex.test(password.value)) {
    passwordError.value = 'Password must contain uppercase, lowercase letters, and numbers'
  } else {
    passwordError.value = ''
  }
}

// 使用 watch 监听输入变化，提供实时反馈
watch(email, validateEmail)
watch(password, validatePassword)

function handleLogin() {
  // 提交时进行最终验证
  validateEmail()
  validatePassword()

  // 如果有任何错误，则停止执行
  if (emailError.value || passwordError.value) {
    return
  }

  // 后端逻辑:(需要实现后端接口)
  // 发送用户数据发送到后端的登陆接口进行验证

  /*
  后端处理:
  后端收到请求。
  根据 email 从数据库中找到对应的用户记录。
  使用相同的哈希算法，将用户本次输入的密码与数据库中存储的加密密码进行比对。
  如果比对成功，则身份验证通过。
   */

   /*
  后端 -> 前端:
  如果验证成功，后端会返回一个成功的响应，并附带该用户的非敏感信息，例如：{"success": true, "user": {"id": "user-xyz-789", "username": "张三"}}。
  后端通常还会设置一个 HttpOnly 的 cookie，作为后续请求的身份凭证。
   */

  // 假设登录成功，从后端获取了用户信息
  const userDataFromBackend = {
    id: 'user_abc123',
    name: '张三',
  }

  // 将后端返回的 id 和 username 存入 Pinia 全局状态
  userStore.setUser(userDataFromBackend)

  // 以上逻辑成功后跳转到主页面
  router.push('/')  
}
</script>

<template>
<div class="relative min-h-screen flex items-center justify-center bg-cover bg-center bg-no-repeat" style="background-image: url('/bg3.png')">  
  <div class="absolute inset-0 bg-black/40"></div>
    <Card class="w-full max-w-sm relative z-10 bg-zinc-950 backdrop-blur-sm border border-white/20 text-white transform -translate-x-35">
      <CardHeader>
        <CardTitle class="text-2xl text-center">
          Welcome
        </CardTitle>
        <CardDescription>
          Please enter your email and password to log in to your account.
        </CardDescription>
      </CardHeader>
      <CardContent class="grid gap-4">
        <div class="grid gap-2">
          <Label for="email">Email</Label>
          <Input id="email" v-model="email" type="email" placeholder="m@example.com" required />
          <p v-if="emailError" class="text-sm text-red-400">{{ emailError }}</p>
        </div>
        <div class="grid gap-2">
          <Label for="password">Password</Label>
          <Input id="password" v-model="password" type="password" placeholder="Enter your password" required />
          <p v-if="passwordError" class="text-sm text-red-400">{{ passwordError }}</p>
        </div>
      </CardContent>
      <CardFooter class="grid gap-4 justify-items-center">
        <Button class="w-full bg-gray-700/50 hover:bg-gray-700/80 active:bg-gray-600 text-white shadow-sm hover:shadow-md focus-visible:ring-2 focus-visible:ring-indigo-300/50 transition duration-150 transform hover:-translate-y-0.5" @click="handleLogin">
          Log in
        </Button>
        <Label>Don't have an account? <RouterLink to="/signup" class="text-indigo-400 hover:underline">Sign up</RouterLink></Label>
      </CardFooter>
    </Card>
  </div>
</template>