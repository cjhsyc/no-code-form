import type { DictInfo } from '@/types'
import request from './request'

// 保存字典
export const reqSaveDict = (params: DictInfo) => request.post('dict', params)

// 获取用户的所有字典（包括系统字典）
export const reqGetDicts = (userId: number) => request.get(`dict/${userId}`)

// 删除字典
export const reqRemoveDict = (code: string) => request.delete(`dict/${code}`)
