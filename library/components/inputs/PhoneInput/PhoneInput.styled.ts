import styled, { CSSProperties, css } from 'styled-components'
import { formatCssProperty } from '@peiko/styles'
import {
  BUTTON_CLASS,
  CONTAINER_CLASS,
  DROPDOWN_CLASS,
  INPUT_CLASS,
  SEARCH_CLASS,
} from './constants'

const BORDER_WIDTH = 2
const BORDER_RADIUS = 8

export const Container = styled.div<{
  disabled?: boolean
  error?: boolean
  width?: CSSProperties['width']
}>((props) => {
  const { theme, disabled, error, width } = props

  return css`
    width: ${width ? formatCssProperty(width) : '100%'};

    .${CONTAINER_CLASS} {
      height: 52px;
      font-family: inherit;

      ${disabled &&
      css`
        pointer-events: none;
      `}
    }

    .flag-dropdown.open .selected-flag {
      background-color: ${theme.palette.base3} !important;
    }

    .react-tel-input .selected-flag:hover,
    .react-tel-input .selected-flag:focus {
      background-color: ${theme.palette.base3} !important;
    }

    .${BUTTON_CLASS} {
      left: ${BORDER_WIDTH}px;
      top: ${BORDER_WIDTH}px;
      height: calc(100% - ${BORDER_WIDTH * 2}px);
      width: 48px;
      background-color: ${theme.palette.base3} !important;
      border: none;
      border-radius: ${BORDER_RADIUS}px !important;

      .selected-flag {
        width: 100%;
        border-radius: inherit !important;
      }

      .arrow {
        left: 24px;
      }

      :hover {
        .selected-flag {
          background-color: ${theme.palette.base3} !important;
          background-color: ${theme.palette.base2} !important;
        }
      }
    }

    .${INPUT_CLASS} {
      width: 100% !important;
      border: solid ${BORDER_WIDTH}px ${theme.palette.base3} !important;
      border-radius: ${BORDER_RADIUS}px;
      padding: 0 16px 0 52px !important;
      outline: none;
      color: ${theme.palette.main2};
      background-color: ${theme.palette.base3} !important;
      box-sizing: border-box;
      transition: $transition-normal;
      height: 100% !important;
      font-size: 16px !important;
      transition-property: border-color, background-color;
      transition-duration: 0.2s;
      transition-timing-function: ease-in-out;

      &:focus {
        border: solid ${BORDER_WIDTH}px ${theme.palette.main2} !important;
      }

      &.error {
        color: ${theme.palette.main7} !important;
      }

      &::placeholder {
        color: ${theme.palette.main11} !important;
      }

      &::-webkit-search-decoration,
      &::-webkit-search-cancel-button,
      &::-webkit-search-results-button,
      &::-webkit-search-results-decoration {
        -webkit-appearance: none;
      }
    }

    .${DROPDOWN_CLASS} {
      overflow-y: auto;
      background-color: ${theme.palette.base3} !important;
      border-radius: ${BORDER_RADIUS}px !important;

      .country {
        padding: 12px 8px;
      }

      .country:hover {
        background-color: ${theme.palette.base2} !important;
      }

      .country.highlight {
        background-color: ${theme.palette.base2} !important;
      }
    }

    .${SEARCH_CLASS} {
      padding: 4px !important;
      background-color: ${theme.palette.base3} !important;

      input {
        border: none !important;
        padding: 8px !important;
        font-size: inherit !important;
        color: ${theme.palette.main8} !important;
        caret-color: inherit;
        margin: 0 !important;
        width: 100%;
        background-color: transparent;

        &::-webkit-search-decoration,
        &::-webkit-search-cancel-button,
        &::-webkit-search-results-button,
        &::-webkit-search-results-decoration {
          -webkit-appearance: none;
        }
      }
    }

    ${disabled &&
    css`
      .${BUTTON_CLASS} {
        background-color: ${theme.palette.base2} !important;
      }

      .${INPUT_CLASS} {
        background-color: ${theme.palette.base2} !important;
        border: solid ${BORDER_WIDTH}px ${theme.palette.base2} !important;
      }
    `}

    ${error &&
    css`
      .${INPUT_CLASS} {
        border: solid ${BORDER_WIDTH}px ${theme.palette.main7} !important;
      }
    `}
  `
})
