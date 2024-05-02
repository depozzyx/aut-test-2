import { TStylesProps } from '@peiko/styles'
import { TCardProps } from '@peiko/components/Card/types'
import { TModalProps } from '../Modal/types'
import { THeaderProps } from '../ModalHeader'

export type TModalMessage = {
  status?: THeaderProps['status']
  title?: THeaderProps['title']
  description?: THeaderProps['description']
  submitTitle?: string
  Icon?: THeaderProps['Icon']
  onClickSubmit?: () => void
  headerProps?: THeaderProps
  disableCloseSubmit?: boolean
  cardProps?: TCardProps
  submitStyles?: TStylesProps['styles']
  children?: React.ReactNode
} & TModalProps
