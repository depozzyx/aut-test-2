import React, { useRef, useState } from 'react'
import { useUpdateEffect } from 'react-use'
import { Label } from '../Label'
import { TTextAreaProps } from './types'
import * as S from './TextArea.styled'

export const TextArea: React.FC<TTextAreaProps> = ({
  error,
  label,
  size = 'm',
  required,
  onChange,
  value,
  textAreaProps,
  resize = false,
  styles,
  ...props
}) => {
  const textAreaRef = useRef<HTMLTextAreaElement | null>(null)
  const [localValue, setLocalValue] = useState(value || '')

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setLocalValue(e.target.value)
    onChange?.(e.target.value)
  }

  useUpdateEffect(() => {
    setLocalValue(value || '')
  }, [value])

  const isDisabled = props.disabled

  const textAreaRefCallback = (element: HTMLTextAreaElement) => {
    textAreaRef.current = element
  }

  const htmlFor = props.id || props.name

  const renderTextArea = () => (
    <S.TextArea
      ref={textAreaRefCallback}
      value={localValue}
      onChange={handleChange}
      id={htmlFor}
      disabled={isDisabled}
      styles={styles}
      size={size}
      error={error}
      resize={resize}
      {...textAreaProps}
      {...props}
    />
  )

  return (
    <S.Wrapper width={props.width}>
      <Label {...label} error={error} required={required} htmlFor={htmlFor}>
        {renderTextArea()}
      </Label>
    </S.Wrapper>
  )
}
