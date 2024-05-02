import { SVGProps } from 'react'
import styled, { css } from 'styled-components'
import { propertyBreakpoints, TMediaQueries } from '@peiko/styles'
import { TDimensions } from '../types'

type TBaseIcon = {
  iconProps: {
    size?: TDimensions['size']
    width?: TDimensions['width']
    height?: TDimensions['height']
    direction?: 'left' | 'right' | 'up' | 'down'
  } & TMediaQueries<TDimensions>
} & SVGProps<SVGSVGElement>

type TContinerProps = Pick<
  TBaseIcon['iconProps'],
  'direction' | 'width' | 'height' | 'size'
>

const TRANSITION_DURATION = '200ms'
const DEFAULT_SIZE: TDimensions['size'] = 'm'

export const getSize = (size: TDimensions['size']): string => {
  if (size === 's') return '16px'
  if (size === 'm') return '24px'
  if (size === 'ml') return '32px'
  if (size === 'l') return '36px'
  if (size === 'xl') return '40px'
  return '20px'
}

const Container = styled.div<TContinerProps>((props) => {
  const { size, width, height } = props

  const direction = () => {
    switch (props.direction) {
      case 'up':
        return css`
          transform: rotate(90deg);
        `
      case 'down':
        return css`
          transform: rotate(270deg);
        `
      case 'left':
        return css`
          transform: rotate(0deg);
        `
      case 'right':
        return css`
          transform: rotate(180deg);
        `
      default:
        return css`
          transform: rotate(0deg);
        `
    }
  }

  return css`
    display: inline-flex;
    position: relative;
    transition: transform 150ms;

    svg {
      width: ${width || getSize(size || DEFAULT_SIZE)};
      height: ${height || getSize(size || DEFAULT_SIZE)};
    }

    path {
      transition: fill ${TRANSITION_DURATION} linear, stroke ${TRANSITION_DURATION} linear;
    }

    ${propertyBreakpoints({
      props,
      values: (value) => {
        const { width, height, size } = value
        return css`
          svg {
            width: ${width || getSize(size || DEFAULT_SIZE)};
            height: ${height || getSize(size || DEFAULT_SIZE)};
          }
        `
      },
    })}

    ${direction()}
  `
})

export const BaseIcon: React.FC<TBaseIcon> = ({ iconProps, children, ...props }) => (
  <Container {...iconProps}>
    <svg {...props}>{children}</svg>
  </Container>
)
