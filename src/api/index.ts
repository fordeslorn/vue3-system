import axios from 'axios';

// Create an Axios instance with default settings
const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  withCredentials: true, 
  headers: {
    'Content-Type': 'application/json',
  }
});

// 你可以在这里添加请求拦截器或响应拦截器
// 例如，处理 token 失效等

export default apiClient;