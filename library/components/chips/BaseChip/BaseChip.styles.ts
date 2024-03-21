import styled, { css } from 'styled-components'
import { TChipProps } from '../types'

export const Container = styled.div<{
  onClick: TChipProps['onClick']
  size: TChipProps['size']
  styles: TChipProps['styles']
  disabled: TChipProps['disabled']
}>((props) => {
  const { onClick } = props

  return css`
    display: inline-flex;
    flex-shrink: 0;
    flex-wrap: nowrap;
    gap: 6px;
    padding: 0 16px;
    align-items: center;
    transition: all 0.2s ease-in-out;
    cursor: ${onClick ? 'pointer' : 'default'};
    border: 1px solid;
    outline: none;
  `
})

export const ChipLabel = styled.span(
  () => css`
    white-space: nowrap;
  `,
)
