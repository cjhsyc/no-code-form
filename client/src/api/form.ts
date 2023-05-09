import type { FormInfo } from '@/types'
import request from './request'

// 保存表单
export const reqSaveForm = (params: FormInfo) => request.post('form', params)

// 获取用户的所有表单
export const reqGetForms = (userId: number) => request.get(`form/${userId}`)

// 删除表单
export const reqRemoveForm = (code: string) => request.delete(`form/${code}`)

// 发布或下线表单
export const reqPublishForm = (code: string, publish: boolean) =>
  request.put(`form/publish/${code}/${publish}`)

// 获取指定表单的信息
export const reqGetFormInfo = (code: string) => request.get(`form/info/${code}`)

// 获取已发布表单的信息
export const reqGetPublishInfo = (code: string) => request.get(`form/publish/${code}`)