import type { SaveFormParams } from '@/types'
import request from './request'

// 保存表单
export const reqSaveForm = (params: SaveFormParams) => request.post('form', params)

// 获取用户的所有表单
export const reqGetForms = (userId: number) => request.get(`form/${userId}`)
