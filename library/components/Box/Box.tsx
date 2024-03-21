import styled, { css } from 'styled-components'
import { styleToCss } from '@peiko/styled'
import { TBoxProps } from './types'

const Container = styled.div<TBoxProps>((props) => {
  const { styles, theme } = props

  return css`
    ${styles && styleToCss(styles, theme)}
  `
})

export const Box: React.FC<TBoxProps> = ({ children, styles }) => (
  <Container styles={styles}>{children}</Container>
)
