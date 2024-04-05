import styled, { css } from 'styled-components'
import { FilledIconButton } from '@peiko/components/buttons/FilledIconButton'
import { FiltersIcon } from '@peiko/components/icons/FiltersIcon'

export const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-wrap: wrap;
  padding-top: 16px;
`

export const Panel = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
`

export const CustomFilterBtn = styled((props) => (
  <FilledIconButton {...props}>
    <FiltersIcon width="24px" height="24px" />
  </FilledIconButton>
))(
  ({ theme }) => css`
    border-radius: 4px !important;
    background-color: ${theme.palette.base};

    &:hover {
      background-color: ${theme.palette.main20};
    }
  `,
)
