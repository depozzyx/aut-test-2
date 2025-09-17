import ScrollContainer from 'react-indiana-drag-scroll'
import styled from 'styled-components'
import { formatCssProperty } from '@peiko/styles'
import { THorizontalContainerProps } from './types'

const Container = styled(ScrollContainer)<{ gap: THorizontalContainerProps['gap'] }>`
  max-width: 100%;
  display: flex;
  flex-direction: row;
  gap: ${({ gap }) => (gap ? formatCssProperty(gap, 'px') : '0px')};
  width: 100%;
`

export const HorizontalScroll: React.FC<THorizontalContainerProps> = ({
  children,
  gap = 16,
  hideScrollbars = false,
  horizontal = true,
  vertical = false,
  ...props
}) => (
  <Container
    gap={gap}
    hideScrollbars={hideScrollbars}
    horizontal={horizontal}
    vertical={vertical}
    {...props}
  >
    {children}
  </Container>
)
