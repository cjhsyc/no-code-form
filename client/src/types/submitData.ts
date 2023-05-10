import type {FormData} from './form'

export interface SaveSubmitDataParams {
  formCode: string
  submitTime: string
  formData: string
}

export interface SubmitForm {
  code: string
  renderData: FormData['renderData']
  publish: boolean
  submitCount: number
}

export interface SubmitData {
  formCode: string
  submitTime: string
  formData: Record<string, { name: string; value: any }>
}