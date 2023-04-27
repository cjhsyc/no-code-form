import type { SaveFormParams } from '@/types'
import request from './request'

// 保存表单
export const reqSaveForm = (params: SaveFormParams) => request.post('form', params)

// 获取用户的所有表单
export const reqGetForms = (userId: number) => request.get(`form/${userId}`)

// 删除表单
export const reqRemoveForm = (code: string) => request.delete(`form/${code}`)

// 发布或下线表单
export const reqPublishForm = (code: string, publish: boolean) =>
  request.put(`form/publish/${code}/${publish}`)
