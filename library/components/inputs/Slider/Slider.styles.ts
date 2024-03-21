import styled, { CSSProperties, css } from 'styled-components'
import { getTrackBackground, Direction } from 'react-range'
import { formatCssProperty } from '@peiko/styled'
import { SliderValues } from './types'

type TTrack = {
  values: SliderValues
  min: number
  max: number
}

const THUMB_HEIGT = '18px'

export const Container = styled.div<{ width: CSSProperties['width'] }>((props) => {
  const { width } = props

  return css`
    width: ${formatCssProperty(width, 'px') || '100%'};
  `
})

export const TrackCont = styled.div`
  display: flex;
  align-items: center;
  height: ${THUMB_HEIGT};
`

export const Track = styled.div<TTrack>((props) => {
  const { values } = props

  let colors = []

  if (values.length === 1) {
    colors = [props.theme.palette.main2, props.theme.palette.base3]
  } else {
    colors = [
      props.theme.palette.base3,
      props.theme.palette.main2,
      props.theme.palette.base3,
    ]
  }

  return css`
    height: 8px;
    width: 100%;
    border-radius: 4px;
    background: ${getTrackBackground({
      values,
      colors: colors as string[],
      min: props.min,
      max: props.max,
      direction: Direction.Right,
    })};
  `
})

export const ThumbCont = styled.div(
  (props) => css`
    position: relative;
    height: ${THUMB_HEIGT};
    width: ${THUMB_HEIGT};
    border-radius: 9px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: ${props.theme.palette.main2};

    &:focus,
    &:hover {
      outline: none;
      &::after {
        content: '';
        position: absolute;
        top: -5px;
        right: -5px;
        bottom: -5px;
        left: -5px;
        border: 5px solid ${props.theme.palette.main11};
        border-radius: 50%;
        transition: border 2s;
        opacity: 0.5;
      }
    }
  `,
)

export const Thumb = styled.div(
  (props) => css`
    height: 14px;
    width: 14px;
    border-radius: 50%;
    background-color: white;
    background-color: ${props.theme.palette.main2};
  `,
)
