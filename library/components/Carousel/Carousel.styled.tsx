import styled, { css } from 'styled-components'
import { SWIPER_CLASSES } from './constants'
import { TCarouselProps } from './types'

const getNavigationPosition = (position: TCarouselProps['navigationPosition']) => {
  switch (position) {
    case 'outside':
      return css`
        bottom: -24px;
      `
    case 'inside':
      return css`
        bottom: 24px;
      `
    default:
      return css``
  }
}

export const Wrapper = styled.div<{
  width: TCarouselProps['width']
  navigationPosition: TCarouselProps['navigationPosition']
}>(
  (props) => css`
    width: ${props.width || '100%'};

    .${SWIPER_CLASSES.PAGINATION} {
      display: flex;
      justify-content: center;
      position: absolute;
      left: 0;
      z-index: 1;
      ${getNavigationPosition(props.navigationPosition)}
    }

    .swiper-pagination-bullet {
      opacity: 1;
      transition: background-color 200ms;
      background: ${(props) => props.theme.palette.base200};

      &-active {
        background: ${(props) => props.theme.palette.main2};
      }
    }
  `,
)

export const Content = styled.div`
  position: relative;
`
