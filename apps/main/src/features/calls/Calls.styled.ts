import styled, { css } from 'styled-components'

export const Wrapper = styled.div(
  (props) => css`
    position: relative;
    display: flex;
    background-color: ${props.theme.palette.base2};
    min-height: calc(100vh - var(--header-height));
    padding: 24px 40px;
    overflow-x: hidden;
    align-items: stretch;
    width: 100%;
  `,
)

export const PopupOverlay = styled.div(
  ({ theme }) => css`
    position: absolute;
    inset: 0px;
    z-index: 1;
    display: none;
    width: 100%;
    min-height: calc(100vh - var(--header-height));
    background: ${theme.palette.overlay};
    pointer-events: none;
  `,
)
