import axios from 'axios'

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
    return Promise.reject(error)
  }
)

export default request
