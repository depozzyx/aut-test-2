import { ScrollContainerProps } from 'react-indiana-drag-scroll'
import { CSSProperties } from 'styled-components'

export type THorizontalContainerProps = {
  children: React.ReactNode
  gap?: CSSProperties['gap']
} & Omit<ScrollContainerProps, 'ref'>
