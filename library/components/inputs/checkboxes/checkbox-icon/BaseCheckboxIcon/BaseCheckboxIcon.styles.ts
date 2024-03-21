import styled, { css } from 'styled-components'
import { styleToCss, propertyBreakpoints } from '@peiko/styled'
import { Text } from '@peiko/components/Text'
import { getCheckboxIconSize } from '../utils/get-checkbox-icon-size'
import { TCheckboxIconProps } from './types'

export const Checkbox = styled('div')(
  () => css`
    display: flex;
    justify-content: center;
    align-items: center;
  `,
)

export const Container = styled.label<{
  size: TCheckboxIconProps['size']
  styles: TCheckboxIconProps['styles']
}>((props) => {
  const { theme, size, styles } = props

  return css`
    cursor: pointer;
    line-height: 0;
    display: flex;
    align-items: center;
    width: fit-content;
    gap: 8px;
    padding: 8px;

    ${Checkbox} {
      border-radius: 50%;
      transition: 0.25s;

      ${propertyBreakpoints<TCheckboxIconProps['size']>({
        props: size,
        values: (value) => css`
          ${getCheckboxIconSize(value)}
        `,
      })}
    }

    ${styles && styleToCss(styles, theme)}
  `
})

export const Input = styled.input`
  display: none;
`

export const Label = styled(Text)``
