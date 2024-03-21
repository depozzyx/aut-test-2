import { useRef, ChangeEvent, useState, useCallback } from 'react'
import { useUpdateEffect } from 'react-use'
import { ErrorText } from '../../ErrorText'
import { TCheckBoxProps } from './types'
import * as S from './Checkbox.styles'

export const Checkbox: React.FC<TCheckBoxProps> = ({
  disabled,
  onChange,
  name = '',
  error,
  label,
  size = 'm',
  value,
  indeterminate,
  ...props
}) => {
  const inputRef = useRef<HTMLInputElement | null>(null)
  const [active, setActive] = useState(value)

  useUpdateEffect(() => {
    setActive(value)
  }, [value])

  const changeEvent = (e: ChangeEvent<HTMLInputElement>) => {
    if (onChange) onChange({ name, value: e.target.checked })
    setActive(e.target.checked)
  }

  const setBlure = useCallback(() => {
    if (!inputRef.current) return
    inputRef.current.blur()
  }, [])

  return (
    <S.Wrapper>
      <S.CheckBoxContainer
        size={size}
        disabled={disabled}
        error={error}
        indeterminate={indeterminate}
      >
        <S.LabelTarget onMouseLeave={setBlure}>
          <input
            ref={inputRef}
            type="checkbox"
            disabled={disabled}
            onChange={changeEvent}
            name={name}
            checked={value ?? active}
            {...props}
          />
          <S.Target />
          {label && <S.LabelCont size={size}>{label}</S.LabelCont>}
        </S.LabelTarget>
      </S.CheckBoxContainer>
      {error && <ErrorText>{error}</ErrorText>}
    </S.Wrapper>
  )
}
