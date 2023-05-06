import type { SelectOption } from './materials'

export interface DictEdit {
  name: string
  options: SelectOption[]
}

export interface DictData extends DictEdit {
  code: string
  userId: number
}

export interface DictInfo {
  code: string
  userId: number
  name: string
  options: string
}
