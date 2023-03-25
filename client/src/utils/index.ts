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
export const toRealProps = (props: Record<string, PropConfig<any>>) => {
  const realProps: Record<string, any> = {}
  for (const prop in props) {
    if (!props[prop].unbind) {
      realProps[prop] = props[prop].value
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

/**
 * 返回初始的表单项属性配置
 * @param label
 * @returns
 */
export const getInitialFormItemProps = (label: string, category: string): FormItemProps => {
  return {
    label: {
      setter: 'el-input',
      label: '标签',
      value: label,
      attrs: {
        type: 'textarea',
        autosize: true,
        resize: 'none'
      }
    },
    showLabel: {
      setter: 'el-switch',
      label: '是否显示标签',
      value: category === 'form'
    },
    required: {
      setter: category === 'form' ? 'el-switch' : 'none',
      label: '是否必填'
    }
    // error: {
    //   setter: 'el-input',
    //   label: '验证错误时的提示信息'
    // },
    // showMessage: {
    //   setter: 'el-switch',
    //   label: '是否显示校验错误信息',
    //   value: true
    // },
    // inlineMessage: {
    //   setter: 'el-switch',
    //   label: '是否以行内形式展示校验信息',
    //   value: false
    // }
  }
}
