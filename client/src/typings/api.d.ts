import type { AxiosInstance, AxiosRequestConfig } from 'axios'

// 基于axios二次封装的request的类型
declare interface RequestInstance extends AxiosInstance {
  get<T = ResponseData, D = any>(url: string, config?: AxiosRequestConfig<D>): Promise<T>
  delete<T = ResponseData, D = any>(url: string, config?: AxiosRequestConfig<D>): Promise<T>
  post<T = ResponseData, D = any>(url: string, data?: D, config?: AxiosRequestConfig<D>): Promise<T>
  put<T = ResponseData, D = any>(url: string, data?: D, config?: AxiosRequestConfig<D>): Promise<T>
}

// 请求返回的数据结构
declare interface ResponseData {
  code: number
  data: any
  message: string
  type: 'success' | 'error' | 'warning'
  success: boolean
}

declare interface LoginParams {
  username: string
  password: string
}

declare interface SignupParams extends LoginParams {}

declare interface UpdatePasswordParams {
  id: number
  oldPassword: string
  password: string
}

declare interface UpdateAvatarParams {
  file: File
}
