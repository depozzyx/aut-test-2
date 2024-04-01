import ScrollContainer from 'react-indiana-drag-scroll'
import styled from 'styled-components'
import { formatCssProperty } from '@peiko/styles'
import { THorizontalContainerProps } from './types'

const Container = styled(ScrollContainer)<{ gap: THorizontalContainerProps['gap'] }>`
  max-width: 100%;
  display: flex;
  flex-direction: row;
  gap: ${({ gap }) => (gap ? formatCssProperty(gap, 'px') : '0px')};
`

export const HorizontalScroll: React.FC<THorizontalContainerProps> = ({
  children,
  gap = 16,
  ...props
}) => (
  <Container gap={gap} {...props}>
    {children}
  </Container>
)
