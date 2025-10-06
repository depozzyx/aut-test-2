import styled, { DefaultTheme, css } from 'styled-components'
import ReactSelect, { GroupBase, Props } from 'react-select'
import { CSSProperties } from 'react'
import { TStylesProps, formatCssProperty, styleToCss } from '@peiko/styles'
import { getIconSize } from '@peiko/components/inputs/Select/utils/get-icon-size'
import { hexToRGBA } from '@peiko/utils/hex-to-rgba'
import { TSelectOption, TMultiSelectProps } from './types'

type TStyledMultiSelectProps = {
  size?: TMultiSelectProps['size']
  width?: CSSProperties['width']
  disabled?: boolean
  hasScroll?: boolean
  zIndex?: CSSProperties['zIndex']
  error?: string
  backgroundColor?: keyof DefaultTheme['palette']
} & TStylesProps

type TContainer = {
  width?: CSSProperties['width']
}

function CustomMultiSelect<
  Option extends TSelectOption,
  IsMulti extends boolean = true,
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

export const StyledMultiSelect = styled(CustomMultiSelect)<TStyledMultiSelectProps>(
  ({ theme, ...props }) => {
    const { palette, fonts, zIndex } = theme
    const { size = 's', hasScroll, backgroundColor, styles, error } = props

    const fontControl = () => {
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
            min-height: 30px;
            padding: 0 8px;
          `
        case 'sm':
          return css`
            min-height: 32px;
            padding: 0 8px;
          `
        case 'm':
          return css`
            min-height: 34px;
            padding: 0 8px;
          `
        case 'l':
          return css`
            min-height: 36px;
            padding: 0 24px;
          `
        default:
          return css``
      }
    }

    return css`
      position: relative;

      .multi-rs__control {
        display: flex;
        position: relative;
        align-items: center;
        border: 1px solid ${palette.main21};
        border-radius: ${BORDER_RADIUS};
        background-color: ${backgroundColor || palette.base3};
        width: 100%;
        transition-property: border;
        transition-duration: ${TRANSITION_DURATION};
        transition-timing-function: linear;
        outline: none;
        min-height: 30px;
        ${sizeControl()}
        ${fontControl()}
      ${error && `border-color: ${palette.main7} !important;`}

      &:hover {
          cursor: pointer;
          border-color: ${palette.main2};
          .multi-rs__indicator {
            svg path {
              fill: ${palette.main2};
            }
          }
        }

        .multi-rs__indicator {
          padding: 0;
          svg path {
            fill: ${palette.main5};
          }
          svg {
            width: 16px;
            height: 16px;
          }

          ${getIconSize(size)}
          padding: 2px;

          svg {
            width: 16px !important;
            height: 16px !important;
          }

          &.multi-rs__clear-indicator {
            width: 20px !important;
            height: 20px !important;
            padding: 2px;
            display: flex;
            justify-content: center;
            align-items: center;
            svg path {
              &:hover {
                fill: ${palette.main};
              }
            }
          }
        }

        .multi-rs__input-container {
          color: ${palette.main5};
        }

        &--is-focused {
          border-color: ${palette.main2} !important;
          box-shadow: none;
          .multi-rs__indicator {
            svg path {
              fill: ${palette.main2};
            }
          }
        }

        ${disabled()}
      }

      .multi-rs__single-value {
        color: ${palette.main5};
        ${disabled()}
        ${theme.fonts.f8}
      }

      .multi-rs__value-container {
        padding: 0;
        align-items: center;
        gap: 1px;
      }

      .multi-rs__placeholder {
        color: ${palette.main22};
        ${theme.fonts.f8}
      }

      .multi-rs__menu {
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

      .multi-rs__option {
        ${fontOption()};
        position: relative;
        display: flex;
        cursor: pointer;
        font-family: inherit;
        align-items: center;
        height: 38px;
        padding: 0 8px;
        white-space: nowrap;
        color: ${palette.main5};

        &--is-focused {
          background-color: ${palette.base4};
        }

        &:hover {
          background-color: ${palette.base4};
        }

        &--is-selected {
          cursor: default !important;
          background-color: ${palette.base4};
          color: ${palette.main2};
        }
      }

      .multi-rs__indicator-separator {
        display: none;
      }

      .multi-rs__multi-value {
        margin: 0 2px 0 0;

        &__remove:hover {
          background-color: ${palette.main21};
          svg path {
            fill: ${palette.main};
          }
        }
      }

      ${styles && styleToCss(styles, theme)}
    `
  },
)

export const CustomLabel = styled.div<{ isSelected?: boolean }>(
  ({ isSelected, theme }) => css`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    cursor: pointer;
    transition: 0.3s;
    background-color: ${isSelected
      ? theme.palette.base4
      : hexToRGBA(theme.palette.base4, 0)};

    input[type='checkbox'] {
      display: none;

      & + p + div {
        opacity: 0;
        transition: 0.3s;
      }

      &:checked + p + div {
        opacity: 1;
      }
    }
  `,
)
