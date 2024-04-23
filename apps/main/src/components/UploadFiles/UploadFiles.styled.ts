import { styleToCss } from '@peiko/styles'
import styled, { css } from 'styled-components'
import { TUploadFiles } from './types'

export const Wrapper = styled.div<Pick<TUploadFiles, 'styles' | 'disabled'>>(
  ({ theme, styles, disabled }) => css`
    cursor: ${disabled ? 'not-allowed' : 'alias'};
    border: 1px dashed ${theme.palette.main2};
    background-color: ${theme.palette.base2};
    padding: 24px;
    border-radius: 20px;
    ${styles && styleToCss(styles, theme)}
  `,
)
