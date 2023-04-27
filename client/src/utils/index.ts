import type { PropConfig } from '@/types'
/**
 * 生成随机id
 * @param prefix 前缀
 * @returns 随机id
 */
export const uuid = (prefix?: string) => {
  const randomStr = Number(Math.random().toString().substring(2)).toString(36)
  return prefix ? prefix + '_' + randomStr : randomStr
}

/**
 * 深拷贝一个对象
 * @param obj 对象
 * @returns 对象的拷贝
 */
export const deepClone = <T extends Record<string, any>>(obj: T): T => {
  return JSON.parse(JSON.stringify(obj))
}

/**
 * 将props配置转化为真实的props对象
 * @param props props配置
 * @returns 真实的props对象
 */
export const toRealProps = (props: Record<string, PropConfig<any> | undefined>) => {
  const realProps: Record<string, any> = {}
  for (const prop in props) {
    if (props[prop] && !props[prop]?.unbind) {
      realProps[prop] = props[prop]?.value
    }
  }
  return realProps
}

/**
 * 移动数组的元素
 * @param arr
 * @param newIndex
 * @param oldIndex
 * @returns
 */
export const moveArrayElement = (arr: any[], newIndex: number, oldIndex: number) => {
  // 检查参数是否合法
  if (newIndex < 0 || newIndex >= arr.length || oldIndex < 0 || oldIndex >= arr.length) {
    return arr
  }
  // 如果新旧索引相同，不需要移动
  if (newIndex === oldIndex) {
    return arr
  }
  const element = arr.splice(oldIndex, 1)[0]
  arr.splice(newIndex, 0, element)
  return arr
}

/**
 * 类似于Array.filter的用于对象的过滤函数
 * @param obj
 * @param callback
 * @returns
 */
export const objectFilter = <T extends Record<string, any>>(
  obj: T,
  callback: (value?: any, key?: string, obj?: T) => boolean
) => {
  const filtered: Partial<T> = {}
  for (const key in obj) {
    if (callback(obj[key], key, obj)) {
      filtered[key] = obj[key]
    }
  }
  return filtered
}

// 定义一个工具函数，接收一个Date类型数据（比当前时间早），返回与当前时间的间隔
export const getDateAgo = (date: Date): string => {
  // 获取当前时间
  const now = new Date()
  // 计算时间差（毫秒）
  const diffMs = now.getTime() - date.getTime()
  // 转换为秒
  const diffSec = diffMs / 1000
  // 如果小于60秒，返回“刚刚”
  if (diffSec < 60) {
    return '刚刚'
  }
  // 转换为分钟
  const diffMin = diffSec / 60
  // 如果小于60分钟，返回“XX分钟之前”
  if (diffMin < 60) {
    return Math.floor(diffMin) + '分钟前'
  }
  // 转换为小时
  const diffHr = diffMin / 60
  // 如果小于24小时，返回“XX小时之前”
  if (diffHr < 24) {
    return Math.floor(diffHr) + '小时前'
  }
  // 转换为天
  const diffDay = diffHr / 24
  // 如果小于30天，返回“XX天之前”
  if (diffDay < 30) {
    return Math.floor(diffDay) + '天前'
  }
  // 转换为月
  const diffMon = diffDay / 30
  // 如果小于12个月，返回“XX个月之前”
  if (diffMon < 12) {
    return Math.floor(diffMon) + '个月前'
  }
  // 转换为年
  const diffYr = diffMon / 12
  // 返回“XX年之前”
  return Math.floor(diffYr) + '年前'
}
