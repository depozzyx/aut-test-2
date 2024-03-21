import { useCallback, useRef, useState } from 'react'
import { useUpdateEffect } from 'react-use'
import { Text } from '@peiko/components/Text'
import { Wrapper, TogleContainer, Label, Input, ToogleButton } from './Toogle.styles'
import { TToogleProps } from './types'
import { ErrorText } from '../ErrorText'

export const Toogle: React.FC<TToogleProps> = ({
  name,
  label,
  checked = false,
  onChange,
  inputProps,
  disabled,
  error,
}) => {
  const inputRef = useRef<HTMLInputElement | null>(null)
  const [localChecked, setLocalChecked] = useState(checked)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (onChange) onChange(e.target.checked)
    setLocalChecked(e.target.checked)
  }

  useUpdateEffect(() => {
    setLocalChecked(checked)
  }, [checked])

  const setBlure = useCallback(() => {
    if (!inputRef.current) return
    inputRef.current.blur()
  }, [])

  const htmlFor = name

  return (
    <Wrapper>
      <TogleContainer>
        <Label
          htmlFor={htmlFor}
          disabled={disabled}
          checked={localChecked}
          onMouseLeave={setBlure}
        >
          <Input
            {...inputProps}
            ref={inputRef}
            type="checkbox"
            id={htmlFor}
            disabled={disabled}
            checked={localChecked}
            onChange={handleChange}
          />
          <ToogleButton checked={localChecked} />
        </Label>
        {label && (
          <Text variant="f5" color={disabled ? 'main11' : 'main8'}>
            {label}
          </Text>
        )}
      </TogleContainer>
      {error && <ErrorText>{error}</ErrorText>}
    </Wrapper>
  )
}
