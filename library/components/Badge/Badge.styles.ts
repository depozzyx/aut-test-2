import styled, { css } from 'styled-components'
import { styleToCss, propertyBreakpoints, formatCssProperty } from '@peiko/styles'
import { TBadgeProps } from './types'

export const Container = styled.div`
  position: relative;
  display: inline-flex;
  vertical-align: middle;
  flex-shrink: 0;
`

export const BadgeContainer = styled.span<{
  color: TBadgeProps['color']
  styles: TBadgeProps['styles']
  positionLeft?: TBadgeProps['positionLeft']
  positionRight?: TBadgeProps['positionRight']
  positionTop?: TBadgeProps['positionTop']
  positionBottom?: TBadgeProps['positionBottom']
  withNumbers?: boolean
}>((props) => {
  const {
    color,
    styles,
    positionLeft,
    positionBottom,
    positionRight,
    positionTop,
    withNumbers,
    theme,
  } = props
  const { palette } = theme
  const isPosition = positionLeft || positionTop || positionBottom || positionRight

  return css`
    display: flex;
    flex-flow: wrap;
    place-content: center;
    align-items: center;
    position: absolute;
    top: ${isPosition ? 'unset' : 0};
    right: ${isPosition ? 'unset' : 0};
    line-height: 1;
    height: ${withNumbers ? '20px' : '6px'};
    min-width: ${withNumbers ? '20px' : '6px'};
    padding: ${withNumbers ? '0 5px' : 0};
    border-radius: 10px;
    z-index: 1;
    background-color: ${color ? palette[color] : palette.main2};
    color: rgb(255, 255, 255);
    transform: scale(1) translate(${isPosition ? '0 0' : '50%, -50%'});
    transform-origin: 100% 0%;

    ${propertyBreakpoints({
      props: positionLeft,
      values: (value) => css`
        left: ${formatCssProperty(value)};
      `,
    })}

    ${propertyBreakpoints({
      props: positionRight,
      values: (value) => css`
        right: ${formatCssProperty(value)};
      `,
    })}

    ${propertyBreakpoints({
      props: positionTop,
      values: (value) => css`
        top: ${formatCssProperty(value)};
      `,
    })}

    ${propertyBreakpoints({
      props: positionBottom,
      values: (value) => css`
        bottom: ${formatCssProperty(value)};
      `,
    })}

    ${styles && styleToCss(styles, theme)}
  `
})
