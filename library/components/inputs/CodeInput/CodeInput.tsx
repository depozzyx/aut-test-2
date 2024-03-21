import React, { useRef, useEffect, useState } from 'react'
import ReactCodeInput from 'react-verification-code-input'
import { Label } from '@peiko/components/inputs/Label'
import * as S from './CodeInput.styles'
import { TCodeInputProps } from './types'

export const CodeInput: React.FC<TCodeInputProps> = ({
  onComplete,
  onChange,
  error,
  type = 'text',
  onSubmitCode,
  label,
  fields = 4,
  disabled,
  autoFocus = false,
  defaultValue,
  cleaningState,
}) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const codeRef = useRef<ReactCodeInput>(null)
  const valRef = useRef<string>('')
  const submitFunc = useRef<null | ((e: KeyboardEvent) => void)>(null)
  const [, setFocus] = useState(false)
  const clear = () => {
    if (!codeRef.current) return
    codeRef.current.__clearvalues__()
  }

  const onSubmit = (e: KeyboardEvent) => {
    if (!onSubmitCode) return
    if (e.code === 'Enter' || e.code === 'NumpadEnter') {
      onSubmitCode(valRef.current)
    }
  }

  useEffect(() => {
    if (!containerRef.current) return
    const inputs = containerRef.current.querySelectorAll('input')
    const onFocus = () => setFocus(true)
    const onBlur = () => {
      if (valRef.current) return
      setFocus(false)
    }

    inputs.forEach((input) => {
      input.addEventListener('focus', onFocus)
      input.addEventListener('blur', onBlur)
    })

    return () => {
      inputs.forEach((input) => {
        input.removeEventListener('focus', onFocus)
        input.removeEventListener('blur', onBlur)
      })
    }
  }, [])

  useEffect(() => {
    if (submitFunc.current) {
      document.removeEventListener('keydown', submitFunc.current)
    }
    submitFunc.current = onSubmit
    document.addEventListener('keydown', submitFunc.current)

    return () => {
      if (!submitFunc.current) return
      document.removeEventListener('keydown', submitFunc.current)
    }
  }, [onSubmitCode])

  useEffect(() => {
    if (!error) return
    clear()
  }, [error])

  useEffect(() => {
    if (!cleaningState?.cleanCodeInput) return
    clear()
    cleaningState.setCleanCodeInput(false)
  }, [cleaningState?.cleanCodeInput])

  const onChangeValue = (val: string) => {
    valRef.current = val
    if (!onChange) return
    onChange(val)
  }

  const handleLabelClick = () => {
    if (!containerRef.current) return
    const inputs = containerRef.current.querySelectorAll('input')
    if (inputs.length === 0) return
    inputs[0].focus()
  }

  return (
    <S.Container error={error} ref={containerRef}>
      <Label
        {...label}
        color={disabled ? 'main12' : 'main8'}
        onClick={handleLabelClick}
        error={error}
      >
        <S.Code
          onComplete={onComplete}
          onChange={onChangeValue}
          type={type}
          ref={codeRef}
          disabled={disabled}
          fields={fields}
          autoFocus={autoFocus}
          values={defaultValue?.split('')}
        />
      </Label>
    </S.Container>
  )
}
