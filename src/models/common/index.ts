export interface InputProps {
  placeholder?: string
  allowClear?: boolean
  size?: 'large' | 'middle' | 'small'
  type?: string
  onChange?: (event: any) => void
  onPressEnter?: (event: any) => void
}