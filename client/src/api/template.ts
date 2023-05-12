import type { TemplateInfo } from '@/types'
import request from './request'

// 保存表单
export const reqSaveTemplate = (params: TemplateInfo) => request.post('template', params)

// 获取用户的所有模板
export const reqGetTemplates = (userId: number) => request.get(`template/${userId}`)

// 删除表单
export const reqRemoveTemplate = (code: string) => request.delete(`template/${code}`)

// 共享表单模板
export const reqShareTemplate = (code: string, share: boolean) =>
  request.put(`template/share/${code}/${share}`)

// 获取指定模板的信息
export const reqGetTemplateInfo = (code: string) => request.get(`template/info/${code}`)

// 获取所有共享的模板
export const reqGetShareTemplates = () => request.get(`template/share`)
