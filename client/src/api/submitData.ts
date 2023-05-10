import request from './request'
import type { SaveSubmitDataParams } from '@/types'

// 保存收集数据
export const reqSaveSubmitData = (params: SaveSubmitDataParams) => request.post('data', params)

// 获取收集数据
export const reqGetSubmitData = (code: string) => request.get(`data/${code}`)

// 获取表单列表（包含已收集多少条数据）
export const reqGetSubmitFormList = (userId: number) => request.get(`data/form/list/${userId}`)