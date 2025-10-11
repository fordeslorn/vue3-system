<script setup lang="ts">
import { ref } from 'vue'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

const email = ref('')
const password = ref('')

function handleLogin() {
  // 在这里处理登录逻辑
  console.log('Email:', email.value)
  console.log('Password:', password.value)
  alert(`登录中... \n邮箱: ${email.value}\n密码: ${password.value}`)
}
</script>

<template>
  <div class="flex items-center justify-center min-h-screen bg-background">
    <Card class="w-full max-w-sm">
      <CardHeader>
        <CardTitle class="text-2xl">
          登录
        </CardTitle>
        <CardDescription>
          请输入您的邮箱和密码以登录您的账户。
        </CardDescription>
      </CardHeader>
      <CardContent class="grid gap-4">
        <div class="grid gap-2">
          <Label for="email">邮箱</Label>
          <Input id="email" v-model="email" type="email" placeholder="m@example.com" required />
        </div>
        <div class="grid gap-2">
          <Label for="password">密码</Label>
          <Input id="password" v-model="password" type="password" required />
        </div>
      </CardContent>
      <CardFooter>
        <Button class="w-full" @click="handleLogin">
          登 录
        </Button>
      </CardFooter>
    </Card>
  </div>
</template>