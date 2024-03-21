import styled, { css } from 'styled-components'
import { Input } from '../../Input'

export const Actions = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`

export const StyledInput = styled(Input)(
  () => css`
    text-align: center;
  `,
)

export const Wrapper = styled('div')`
  display: flex;
  align-items: center;
  gap: 12px;
  position: relative;
  input {
    padding: 0;
  }
`
