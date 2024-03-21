import styled, { css } from 'styled-components'

type TIconContainerProps = {
  disabled?: boolean
}

export const Container = styled.div<TIconContainerProps>(
  () => css`
    display: flex;
    outline: none;
    cursor: pointer;
    padding-right: 12px;
  `,
)
