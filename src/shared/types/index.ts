type IFormType = 'input' | 'password' | 'select' | 'datepicker'

export interface IFormItem {
  type: IFormType
  label: string
  rules?: any[]
  placeholder?: any
  // 专门服务于选择器组件
  options?: Array<any>
  otherOptions?: any
  itemStyle?: string
  field: string
  isHidden?: boolean
  isValidator?: boolean
}
