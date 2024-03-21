import styled, { css } from 'styled-components'
import ReactCodeInput from 'react-verification-code-input'

type TContainer = {
  error?: string
  disabled?: boolean
}

const BORDER_WIDTH = '2px'
const BORDER_RADIUS = '8px'
const TRANSITION_TIME = '0.2s'
const TRANSITION_TIMING_FUNCTION = 'linear'

export const Container = styled.div<TContainer>`
  display: flex;
  flex-direction: column;
  position: relative;

  &:focus > input {
    border: ${BORDER_WIDTH} solid ${(props) => props.theme.palette.main2} !important;
  }

  & > div > div > input {
    border: ${BORDER_WIDTH} solid
      ${(props) => (props.error ? props.theme.palette.main7 : props.theme.palette.base3)} !important;
    caret-color: ${(props) =>
      props.error ? props.theme.palette.main7 : props.theme.palette.main8} !important;
  }
`

export const Code = styled(ReactCodeInput)((props) => {
  const { disabled, theme } = props
  const { mediaQueries } = theme

  return css`
    width: 100% !important;

    & > div {
      display: flex;
      width: 100%;
    }

    input {
      color: ${theme.palette.main8} !important;
      font-family: inherit !important;
      font-size: 16px !important;
      line-height: 26px !important;
      min-width: 0;
      border-radius: ${BORDER_RADIUS} !important;
      transition-duration: ${TRANSITION_TIME};
      transition-timing-function: ${TRANSITION_TIMING_FUNCTION};
      transition-property: border-color;
      border: 2px solid ${({ theme }) => theme.palette.base3} !important;
      margin-right: 8px;
      background-color: ${disabled ? theme.palette.base100 : theme.palette.base3};

      ${mediaQueries.xs} {
        width: 46px !important;
        height: 46px !important;
      }

      ${mediaQueries.sm} {
        width: 56px !important;
        height: 56px !important;
      }

      &:focus {
        border: 2px solid ${({ theme }) => theme.palette.main2} !important;
      }

      &:last-child {
        margin-right: 0;
      }

      &::selection {
        background: rgba(0, 0, 0, 0);
      }

      &::placeholder {
        color: ${(props) => props.theme.palette.main8};
      }

      &:disabled {
        cursor: not-allowed;
        background-color: ${theme.palette.base3};
      }
    }
  `
})
