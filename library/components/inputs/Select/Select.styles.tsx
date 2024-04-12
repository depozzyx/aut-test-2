import styled, { DefaultTheme, css } from 'styled-components'
import ReactSelect, { GroupBase, Props } from 'react-select'
import { CSSProperties } from 'react'
import { TStylesProps, formatCssProperty, styleToCss } from '@peiko/styles'
import { TSelectOption, TSelectProps } from './types'
import { getIconSize } from './utils/get-icon-size'

type TRSProps = {
  disabled?: boolean
  size?: TSelectProps['size']
  width?: CSSProperties['width']
  hasScroll: boolean
  backgroundColor?: keyof DefaultTheme['palette']
  zIndex?: CSSProperties['zIndex']
  error?: string
} & TStylesProps

type TContainer = {
  width?: CSSProperties['width']
}

function CustomSelect<
  Option extends TSelectOption,
  IsMulti extends false,
  Group extends GroupBase<Option> = GroupBase<Option>,
>(props: Props<Option, IsMulti, Group>) {
  return <ReactSelect {...props} />
}

const TRANSITION_DURATION = '250ms'
const BORDER_RADIUS = '4px'
const MENU_BORDER_RADIUS = '8px'

export const Container = styled.div<TContainer>(
  (props) => css`
    width: ${props.width ? formatCssProperty(props.width) : 'fit-content'};
  `,
)

export const RS = styled(CustomSelect)<TRSProps>(({ theme, ...props }) => {
  const { palette, fonts, zIndex } = theme
  const { size = 's', hasScroll, width, backgroundColor, styles, error } = props

  const fontControll = () => {
    if (size === 's') {
      return fonts.f8
    }
    return fonts.f8
  }

  const fontOption = () => {
    if (size === 's') {
      return fonts.f8
    }
    return fonts.f8
  }

  const disabled = () =>
    props.disabled &&
    css`
      pointer-events: none;
      color: ${palette.main12};
    `

  const sizeControl = () => {
    switch (size) {
      case 's':
        return css`
          height: 30px;
          padding: 0 16px;
        `
      case 'm':
        return css`
          height: 56px;
          padding: 0 24px;
        `
      case 'l':
        return css`
          height: 56px;
          padding: 0 24px;
        `
      default:
        return css``
    }
  }

  return css`
    position: relative;
    /* z-index: ${props.zIndex || zIndex.low}; */

    .custom-rs__control {
      display: flex;
      position: relative;
      align-items: center;
      border: 1px solid ${palette.main21};
      border-radius: ${BORDER_RADIUS};
      background-color: ${backgroundColor || palette.base3};
      width: ${width ? '100%' : 'fit-content'};
      transition-property: border;
      transition-duration: ${TRANSITION_DURATION};
      transition-timing-function: linear;
      outline: none;
      min-height: 30px;
      ${sizeControl()}
      ${fontControll}
      ${error && `border-color: ${palette.main7} !important;`}

      &:hover {
        cursor: pointer;
        border-color: ${palette.main3};
      }

      .custom-rs__indicator {
        svg path {
          fill: ${palette.main5};
        }
        width: 24px;
        height: 24px;
        ${getIconSize(size)}
      }

      .custom-rs__input-container {
        color: ${palette.main5};
      }

      &--is-focused {
        border-color: ${palette.main2} !important;
        box-shadow: none;
        .custom-rs__indicator {
          svg path {
            fill: ${palette.main2};
          }
        }
      }

      ${disabled}
    }

    .custom-rs__single-value {
      color: ${palette.main5};
      ${disabled}
    }

    .custom-rs__value-container {
      padding: 0;
      height: 28px;
      align-items: center;
    }

    .custom-rs__placeholder {
      color: ${palette.main22};
    }

    .custom-rs__menu {
      min-width: 100%;
      position: absolute;
      overflow: hidden;
      width: fit-content;
      background-color: ${palette.base3};
      border-radius: ${hasScroll
        ? `${MENU_BORDER_RADIUS} 0px 0px ${MENU_BORDER_RADIUS}`
        : MENU_BORDER_RADIUS};
      z-index: ${zIndex.high} !important;

      *::-webkit-scrollbar {
        border: 1px solid ${palette.base3};
      }
      *::-webkit-scrollbar-thumb {
        background-color: ${palette.main8};
      }

      &-list {
        padding: 0;
      }
    }

    .custom-rs__option {
      ${fontOption};
      position: relative;
      display: flex;
      cursor: pointer;
      font-family: inherit;
      align-items: center;
      height: 38px;
      padding: 0 32px;
      white-space: nowrap;
      color: ${palette.main5};

      &--is-focused {
        background-color: ${palette.main21};
      }

      &:hover {
        background-color: ${palette.main22};
      }

      &--is-selected {
        cursor: default !important;
        background-color: ${palette.base4};
        color: ${palette.main5};
        pointer-events: none;
      }
    }

    .custom-rs__indicator-separator {
      display: none;
    }

    ${styles && styleToCss(styles, theme)}
  `
})
