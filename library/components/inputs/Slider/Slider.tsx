import { useState } from 'react'
import { Range, Direction } from 'react-range'
import { useUpdateEffect } from 'react-use'
import { SliderValues, TSliderProps } from './types'
import * as S from './Slider.styles'
import { normalizeDefaultValue } from './utils'

const STEP = 1

export const Slider: React.FC<TSliderProps> = ({
  step = STEP,
  min,
  max,
  width,
  defaultValues = [min, max],
  onChange,
  value,
}) => {
  const [values, setValues] = useState(
    normalizeDefaultValue({
      def: defaultValues,
      min,
      max,
    }),
  )

  useUpdateEffect(() => {
    if (!value) return
    setValues(value)
  }, [value])

  const handleChange = (val: SliderValues) => {
    setValues(val)
  }

  const handleFinalChange = (values: SliderValues) => {
    onChange?.(values)
  }

  return (
    <S.Container width={width}>
      <Range
        values={values}
        step={step}
        min={min}
        max={max}
        onChange={handleChange}
        onFinalChange={handleFinalChange}
        renderTrack={({ props, children }) => (
          <S.TrackCont>
            <S.Track ref={props.ref} values={values} min={min} max={max}>
              {children}
            </S.Track>
          </S.TrackCont>
        )}
        renderThumb={({ props }) => (
          <S.ThumbCont {...props}>
            <S.Thumb />
          </S.ThumbCont>
        )}
        direction={Direction.Right}
      />
    </S.Container>
  )
}
