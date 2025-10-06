import { useCallback, useRef, useState } from 'react'
import { useUpdateEffect } from 'react-use'
import { Text } from '@peiko/components/Text'
import { Wrapper, ToggleContainer, Label, Input, ToggleButton } from './Toggle.styles'
import { TToggleProps } from './types'
import { ErrorText } from '../ErrorText'

export const Toggle: React.FC<TToggleProps> = ({
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

  const setBlur = useCallback(() => {
    if (!inputRef.current) return
    inputRef.current.blur()
  }, [])

  const htmlFor = name

  return (
    <Wrapper>
      <ToggleContainer>
        <Label
          htmlFor={htmlFor}
          disabled={disabled}
          checked={localChecked}
          onMouseLeave={setBlur}
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
          <ToggleButton checked={localChecked} />
        </Label>
        {label && (
          <Text variant="f5" color={disabled ? 'main11' : 'main8'}>
            {label}
          </Text>
        )}
      </ToggleContainer>
      {error && <ErrorText>{error}</ErrorText>}
    </Wrapper>
  )
}
