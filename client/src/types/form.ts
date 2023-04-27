import type { ComponentData, FormProps } from './designer'
export interface FormInfo {
  userId: number
  renderData: string
  saveTime: string
  publish: boolean
  code: string
}

export interface FormData {
  userId: number
  renderData: {
    componentList: ComponentData[]
    width: number | 'auto'
    formProps: FormProps
  }
  saveTime: string
  publish: boolean
  code: string
}
