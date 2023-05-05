import type { RuleData } from '@/types'
import request from './request'

// 保存规则
export const reqSaveRule = (params: RuleData) => request.post('rule', params)

// 获取用户的所有规则（包括系统规则）
export const reqGetRules = (userId: number) => request.get(`rule/${userId}`)

// 删除规则
export const reqRemoveRule = (code: string) => request.delete(`rule/${code}`)
