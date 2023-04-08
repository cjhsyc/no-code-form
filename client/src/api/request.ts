import axios from 'axios'
import type { RequestInstance } from '@/types'
import { ElMessage } from 'element-plus'

const request: RequestInstance = axios.create({
  baseURL: import.meta.env.VITE_REQUEST_BASE_URL,
  timeout: 5000
})

request.interceptors.request.use(
  (config) => {
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

request.interceptors.response.use(
  (response) => {
    return response.data
  },
  (error) => {
    ElMessage({
      type: 'error',
      message: error.message
    })
    return Promise.reject(error)
  }
)

export default request
