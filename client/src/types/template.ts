import type { ComponentData, FormProps } from './designer'

export interface TemplateInfo {
  userId: number
  code: string
  renderData: string
  share: boolean
  saveTime: string
}

export interface TemplateData {
  userId: number
  code: string
  renderData: {
    componentList: ComponentData[]
    width: number | 'auto'
    formProps: FormProps
  }
  share: boolean
  saveTime: string
}
