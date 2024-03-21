import { useState } from 'react'
import { useUpdateEffect } from 'react-use'
import { Checkbox, Container, Input, Label } from './BaseCheckboxIcon.styles'
import { TCheckboxIconProps } from './types'

export const BaseCheckboxIcon: React.FC<TCheckboxIconProps> = ({
  name,
  label,
  size,
  styles,
  icon,
  checkedIcon,
  disabled,
  checked = false,
  inputProps,
  onChange,
  ...props
}) => {
  const [localChecked, setLocalChecked] = useState(checked)

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = async (e) => {
    const { checked } = e.target

    setLocalChecked(checked)
    onChange?.(checked)
  }

  useUpdateEffect(() => {
    setLocalChecked(checked)
  }, [checked])

  const htmlFor = name

  return (
    <Container htmlFor={htmlFor} styles={styles} size={size} {...props}>
      <Input
        {...inputProps}
        id={htmlFor}
        type="checkbox"
        checked={localChecked}
        disabled={disabled}
        onChange={handleChange}
      />
      <Checkbox>{localChecked ? checkedIcon : icon}</Checkbox>
      {label && (
        <Label variant="f5" color={disabled ? 'main12' : 'main8'}>
          {label}
        </Label>
      )}
    </Container>
  )
}
