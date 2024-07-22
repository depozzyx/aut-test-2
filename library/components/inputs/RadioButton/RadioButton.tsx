import React, { useCallback, useRef } from 'react'
import * as S from './RadioButton.styles'
import { TRadioProps } from './types'
import { ErrorText } from '../ErrorText'

export const RadioButton: React.FC<TRadioProps> = ({
  label,
  onChange,
  inputProps,
  error,
  ...props
}) => {
  const inputRef = useRef<HTMLInputElement | null>(null)

  const setBlur = useCallback(() => {
    if (!inputRef.current) return
    inputRef.current.blur()
  }, [])

  const inputId = `${inputProps?.value}`
  return (
    <S.Container>
      <S.Wrapper
        htmlFor={inputId}
        disabled={inputProps.disabled}
        error={error}
        onMouseLeave={setBlur}
      >
        <input
          {...inputProps}
          type="radio"
          ref={inputRef}
          id={inputId}
          {...props}
          onChange={onChange}
        />
        <S.TargetElement />
        {label}
      </S.Wrapper>
      {error && <ErrorText>{error}</ErrorText>}
    </S.Container>
  )
}
