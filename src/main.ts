import './index.css'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { useUserStore } from './stores/user'
import App from './App.vue'
import router from './router'

const app = createApp(App)
const pinia = createPinia()

app.use(pinia)

// 在挂载应用前，先恢复用户会话
useUserStore().restoreSession().then(() => {
    app.use(router)
    app.mount('#app')
})
