/**
 * 生成随机id
 * @param prefix 前缀，默认为`id`
 * @returns 随机id
 */
export const uuid = (prefix: string = 'id') => {
  const randomNum = Number(Math.random().toString().substring(2)).toString(36)
  return prefix + '_' + randomNum
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
export const toRealProps = (props: Record<string, PropConfig>) => {
  const realProps: Record<string, any> = {}
  for (const prop in props) {
    realProps[prop] = props[prop].value
  }
  return realProps
}
