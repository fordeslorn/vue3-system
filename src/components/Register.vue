<script setup lang="ts">
import { ref, watch } from 'vue'
import { RouterLink, useRouter } from 'vue-router'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

const router = useRouter()

const username = ref('')
const email = ref('')
const password = ref('')
const confirmPassword = ref('')

// 错误信息 ref
const usernameError = ref('')
const emailError = ref('')
const passwordError = ref('')
const confirmPasswordError = ref('')

// 验证函数
function validateUsername() {
  if (!username.value) {
    usernameError.value = 'Username cannot be empty'
  } else if (username.value.length > 30) {
    usernameError.value = 'Username must be less than 30 characters long'
  } else {
    usernameError.value = ''
  }
}

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

function validateConfirmPassword() {
  if (!confirmPassword.value) {
    confirmPasswordError.value = 'Please confirm your password'
  } else if (password.value !== confirmPassword.value) {
    confirmPasswordError.value = 'Passwords do not match'
  } else {
    confirmPasswordError.value = ''
  }
}

// 使用 watch 监听输入变化，提供实时反馈
watch(username, validateUsername)
watch(email, validateEmail)
watch(password, () => {
  validatePassword()
  // 如果确认密码已经有值，当主密码变化时也需要重新验证确认密码
  if (confirmPassword.value) {
    validateConfirmPassword()
  }
})
watch(confirmPassword, validateConfirmPassword)


function handleRegister() {
  // 提交时进行最终验证
  validateUsername()
  validateEmail()
  validatePassword()
  validateConfirmPassword()

  // 如果有任何错误，则停止执行
  if (usernameError.value || emailError.value || passwordError.value || confirmPasswordError.value) {
    return
  }
  
  // 发送到后端的逻辑:(需要实现后端接口)
  // 应该把用户数据发送到后端进行注册
  /*后端处理:
  后端服务器收到请求。
  它会进行后端验证（这是必须的，为了安全）。
  检查邮箱或用户名是否已经被注册。
  对密码进行哈希加密（绝不存储明文密码！）。
  生成一个唯一的 userId，并将所有信息存入数据库。*/

  // 这里只是模拟成功注册
  console.log('所有验证通过，准备提交')
  alert(`注册成功！\n用户名: ${username.value}\n邮箱: ${email.value}`)
  // 后端向前端返回一个响应如 {"success": true, "message": "注册成功"}

  // 前端收到成功的响应，跳转到登录页面
  router.push('/login')
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
          <Label for="username">Username</Label>
          <Input id="username" v-model="username" type="text" placeholder="Enter your username" required />
          <p v-if="usernameError" class="text-sm text-red-400">{{ usernameError }}</p>
        </div>
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
        <div class="grid gap-2">
          <Label for="confirm-password">Confirm Password</Label>
          <Input id="confirm-password" v-model="confirmPassword" type="password" placeholder="Confirm your password" required />
          <p v-if="confirmPasswordError" class="text-sm text-red-400">{{ confirmPasswordError }}</p>  
        </div>
      </CardContent>
      <CardFooter class="grid gap-4 justify-items-center">
        <Button class="w-full bg-gray-700/50 hover:bg-gray-700/80 active:bg-gray-600 text-white shadow-sm hover:shadow-md focus-visible:ring-2 focus-visible:ring-indigo-300/50 transition duration-150 transform hover:-translate-y-0.5" @click="handleRegister">
          Sign up
        </Button>
        <Label>Already have an account? <RouterLink to="/login" class="text-indigo-400 hover:underline">Log in</RouterLink></Label>
      </CardFooter>
    </Card>
  </div>
</template>