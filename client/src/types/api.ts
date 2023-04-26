import type { AxiosInstance, AxiosRequestConfig } from 'axios'
import type { FormInfo } from './form'

// 基于axios二次封装的request的类型
export interface RequestInstance extends AxiosInstance {
  get<T = ResponseData, D = any>(url: string, config?: AxiosRequestConfig<D>): Promise<T>
  delete<T = ResponseData, D = any>(url: string, config?: AxiosRequestConfig<D>): Promise<T>
  post<T = ResponseData, D = any>(url: string, data?: D, config?: AxiosRequestConfig<D>): Promise<T>
  put<T = ResponseData, D = any>(url: string, data?: D, config?: AxiosRequestConfig<D>): Promise<T>
}

// 请求返回的数据结构
export interface ResponseData {
  code: number
  data: any
  message: string
  type: 'success' | 'error' | 'warning'
  success: boolean
}

export interface LoginParams {
  username: string
  password: string
}

export interface SignupParams extends LoginParams {}

export interface UpdatePasswordParams {
  id: number
  oldPassword: string
  password: string
}

export interface UpdateAvatarParams {
  file: File
}

export interface SaveFormParams extends FormInfo {}
