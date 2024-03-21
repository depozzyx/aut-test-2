import styled, { css } from 'styled-components'
import { useEffect, useState } from 'react'
import Swiper from 'swiper'
import { ArrowIcon } from '@peiko/components/icons/Arrow'
import { FilledIconButton } from '@peiko/components/buttons/FilledIconButton'
import { TCarouselProps } from '../types'

enum EDirections {
  next = 'prev',
  prev = 'next',
}

const directions = Object.values(EDirections)

export type TNavigation = {
  loop?: boolean
  swiper: Swiper | null
  arrowsPosition: TCarouselProps['arrowsPosition']
}

type TButtonCont = {
  direction: keyof typeof EDirections
  arrowsPosition: TCarouselProps['arrowsPosition']
}

type TEndPos = {
  isBeginning: boolean
  isEnd: boolean
}

const getArrowsPosition = (
  direction: TButtonCont['direction'],
  position: TButtonCont['arrowsPosition'],
) => {
  if (direction === 'prev') {
    switch (position) {
      case 'outside':
        return css`
          left: -64px;
        `
      case 'inside':
        return css`
          left: 24px;
        `
      case 'edge':
        return css`
          left: -20px;
        `
      default:
        return css``
    }
  }

  if (direction === 'next') {
    switch (position) {
      case 'outside':
        return css`
          right: -64px;
        `
      case 'inside':
        return css`
          right: 24px;
        `
      case 'edge':
        return css`
          right: -20px;
        `
      default:
        return css``
    }
  }
}

const ButtonCont = styled.div<TButtonCont>(
  (props) => css`
    position: absolute;
    top: calc(50%);
    transform: translateY(-50%);
    z-index: 1;
    ${getArrowsPosition(props.direction, props.arrowsPosition)}
  `,
)

const Button = styled(FilledIconButton)``

export const Navigation: React.FC<TNavigation> = ({ loop, swiper, arrowsPosition }) => {
  const [show, setShow] = useState(false)
  const [state, setState] = useState<TEndPos | null>(null)

  const getEndPos = (swiper: Swiper) => ({
    isBeginning: !loop && swiper.isBeginning,
    isEnd: !loop && swiper.isEnd,
  })

  useEffect(() => {
    if (!swiper || state) return

    setState(getEndPos(swiper))

    swiper.on('slideChange', (swiper) => {
      setState(getEndPos(swiper))
    })
  }, [swiper])

  useEffect(() => {
    if (!swiper) return

    const handleArrows = (sw: Swiper) => {
      const container = sw.$el[0]

      if (!container) return

      const show = container.clientWidth < container.scrollWidth

      setShow(show)
    }

    swiper.on('resize', handleArrows)
    handleArrows(swiper)
  }, [swiper])

  if (!state || !swiper) return null

  if (!show) return null

  return (
    <>
      {directions.map((direction) => (
        <ButtonCont key={direction} direction={direction} arrowsPosition={arrowsPosition}>
          <Button
            disabled={direction === 'prev' ? state.isBeginning : state.isEnd}
            onClick={() =>
              direction === 'next' ? swiper.slideNext() : swiper.slidePrev()
            }
          >
            <ArrowIcon direction={direction === 'next' ? 'right' : 'left'} />
          </Button>
        </ButtonCont>
      ))}
    </>
  )
}
