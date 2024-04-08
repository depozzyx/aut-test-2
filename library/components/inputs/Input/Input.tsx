import React, { useEffect, useRef, useState } from 'react'
import { useDebounce, useUpdateEffect } from 'react-use'
import { useInputNumber } from '@peiko/hooks/use-input-number'
import { Label } from '../Label'
import { Eye } from './components/Eye'
import { TInputEvent, TInputProps } from './types'
import * as S from './Input.styled'
import { Edit } from './components/Edit'
import { Copy } from './components/Copy'

export const Input: React.FC<TInputProps> = ({
  type = 'text',
  error,
  label,
  size = 'm',
  editable,
  startAdornment,
  endAdornment,
  required,
  decimals = 0,
  onCopy,
  onChange,
  onFocus,
  onBlur,
  readOnly,
  value,
  debounce = 0,
  inputProps,
  styles,
  startAdornmentStyles,
  ...props
}) => {
  const inputRef = useRef<HTMLInputElement | null>(null)
  const isMounted = useRef(false)
  const [isEditable, setisEditable] = useState(false)
  const [eyeOpen, setEyeOpen] = useState(false)
  const [isFocus, setIsFocus] = useState(false)
  const [localValue, setLocalValue] = useState(value || '')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLocalValue(e.target.value)
  }

  const onChangeNumber = useInputNumber<TInputEvent>({
    decimals,
    onChange: handleChange,
  })

  const handleClickEye = () => {
    if (props.disabled) return
    setEyeOpen(!eyeOpen)
  }

  const [, cancel] = useDebounce(
    () => {
      if (isMounted.current) {
        onChange?.(localValue)
      }
    },
    debounce,
    [localValue],
  )

  // prevent debounce trigger on mount
  useEffect(() => {
    cancel()
    isMounted.current = true

    // Cancel the debounce on unmount
    return () => {
      cancel()
    }
  }, [cancel])

  useUpdateEffect(() => {
    setLocalValue(value || '')
  }, [value])

  useEffect(() => {
    if (!editable) return

    if (editable && localValue && localValue.length > 0) {
      setisEditable(true)
    }
  }, [editable])

  const handleClickEdit = () => {
    if (isEditable && inputRef.current) {
      setTimeout(() => {
        inputRef.current?.focus()
      }, 0)
    }

    setisEditable((prev) => !prev)
  }

  const handleCopyClick = () => {
    if (!onCopy) return
    onCopy(String(localValue))
  }

  const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    setIsFocus(true)
    onFocus?.(e)
  }

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    setIsFocus(false)
    onBlur?.(e)
  }

  const getType = () => {
    if (type === 'password' && eyeOpen) return 'text'
    if (type === 'number') return 'text'
    return type
  }

  const isDisabled = props.disabled || isEditable

  const inputRefCallback = (element: HTMLInputElement) => {
    inputRef.current = element
  }

  const htmlFor = props.id || props.name

  const renderInput = () => (
    <S.InputContainer
      styles={styles}
      disabled={isDisabled}
      size={size}
      error={error}
      isStartAdornment={!!startAdornment}
      isEndAdornment={!!endAdornment}
      readOnly={readOnly}
    >
      {startAdornment && (
        <S.StartAdornment
          className="start-adornment"
          startAdornmentStyles={startAdornmentStyles}
        >
          {typeof startAdornment === 'function'
            ? startAdornment({
                value: String(localValue),
                focus: isFocus,
                disabled: Boolean(props.disabled),
              })
            : startAdornment}
        </S.StartAdornment>
      )}
      {props.mask ? (
        <S.InputMask
          type={getType()}
          inputRef={inputRefCallback}
          readOnly={readOnly}
          tabIndex={readOnly ? -1 : 0}
          mask={props.mask}
          {...props}
          {...inputProps}
          value={localValue}
          onChange={type === 'number' ? onChangeNumber : handleChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          id={htmlFor}
          disabled={isDisabled}
        />
      ) : (
        <S.Input
          ref={inputRefCallback}
          type={getType()}
          readOnly={readOnly}
          tabIndex={readOnly ? -1 : 0}
          {...props}
          {...inputProps}
          value={localValue}
          onChange={type === 'number' ? onChangeNumber : handleChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          id={htmlFor}
          disabled={isDisabled}
        />
      )}
      {type === 'password' && (
        <Eye
          size={size}
          open={eyeOpen}
          disabled={props.disabled}
          onClick={handleClickEye}
        />
      )}
      {isEditable && localValue && <Edit size={size} onClick={handleClickEdit} />}
      {onCopy && localValue && (
        <Copy size={size} onClick={handleCopyClick} value={localValue} />
      )}
      {endAdornment && (
        <S.EndAdornment>
          {typeof endAdornment === 'function'
            ? endAdornment({
                value: String(localValue),
                focus: isFocus,
                disabled: Boolean(props.disabled),
              })
            : endAdornment}
        </S.EndAdornment>
      )}
    </S.InputContainer>
  )

  return (
    <S.Wrapper width={props.width}>
      <Label
        {...label}
        error={error}
        readOnly={readOnly}
        required={required}
        htmlFor={htmlFor}
      >
        {renderInput()}
      </Label>
    </S.Wrapper>
  )
}
