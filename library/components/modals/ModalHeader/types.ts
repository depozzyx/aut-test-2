import { ReactNode } from 'react'
import { CSSProperties } from 'styled-components'
import { TStylesProps, TMediaQueries } from '@peiko/styles'
import { TText } from '@peiko/components/Text'
import { TDimensions, TIcon } from '@peiko/components/icons/types'

export type THeaderProps = {
  title?: ReactNode
  description?: ReactNode
  status?: 'success' | 'info' | 'error'
  alignItems?: CSSProperties['alignItems']
  variantTitle?: TText['variant']
  variantDesc?: TText['variant']
  gap?: CSSProperties['gap'] | TMediaQueries<CSSProperties['gap']>
  iconDimensions?: TDimensions & TMediaQueries<TDimensions>
  Icon?: React.FC<TIcon>
} & TStylesProps
