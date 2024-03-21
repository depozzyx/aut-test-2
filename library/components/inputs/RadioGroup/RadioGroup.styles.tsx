import styled, { css } from 'styled-components'
import { TRadioGroupProps } from './types'

export const Wrapper = styled('div')(
  () => css`
    display: flex;
    flex-direction: column;
  `,
)

export const Container = styled('div')<{ direction: TRadioGroupProps['direction'] }>(
  ({ direction }) => css`
    display: flex;
    flex-direction: ${direction};
    gap: 16px;
  `,
)
