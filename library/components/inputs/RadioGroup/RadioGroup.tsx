import React, { ChangeEvent, useState } from 'react'
import { useUpdateEffect } from 'react-use'
import { RadioButton } from '../RadioButton'
import { ErrorText } from '../ErrorText'
import { TRadioGroupProps } from './types'
import * as S from './RadioGroup.styles'

export const RadioGroup: React.FC<TRadioGroupProps> = ({
  direction = 'row',
  name,
  options,
  onChange,
  defaultValue,
  error,
  value,
}) => {
  const [active, setActive] = useState(defaultValue || options[0].value)

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setActive(event.target.value)
    onChange?.(event)
  }

  useUpdateEffect(() => {
    if (!value) return
    setActive(value)
  }, [value])

  return (
    <S.Wrapper>
      <S.Container direction={direction}>
        {options.map((option) => (
          <RadioButton
            name={name}
            key={option.value}
            label={option.label}
            inputProps={{
              value: option.value,
              checked: active === option.value,
              disabled: option.disabled,
            }}
            onChange={handleChange}
          />
        ))}
      </S.Container>
      {error && <ErrorText>{error}</ErrorText>}
    </S.Wrapper>
  )
}
