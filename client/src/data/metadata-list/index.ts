import input from './input'
import textarea from './textarea'
import inputNumber from './input-number'
import select from './select'
import checkbox from './checkbox'
import colorPicker from './color-picker'
import rate from './rate'
import submitButton from './submit-button'
import slider from './slider'
import _switch from './switch'
import timePicker from './time-picker'
import radio from './radio'
import datePicker from './date-picker'
import title from './title'
import type { Metadata } from '@/types'

/**
 * 素材组件元数据列表
 */
export const metadataList: Metadata[] = [
  // 基础组件
  title,
  submitButton,
  // 输入型组件
  input,
  textarea,
  inputNumber,
  radio,
  select,
  checkbox,
  colorPicker,
  rate,
  slider,
  _switch,
  datePicker,
  timePicker
]
