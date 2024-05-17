import styled, { css } from 'styled-components'
import { styleToCss } from '@peiko/styles'
import { TBoxProps } from './types'

const Container = styled.div<TBoxProps>((props) => {
  const { styles, theme } = props

  return css`
    ${styles && styleToCss(styles, theme)}
  `
})

export const Box: React.FC<TBoxProps> = ({ children, styles, className }) => (
  <Container styles={styles} className={className}>
    {children}
  </Container>
)
