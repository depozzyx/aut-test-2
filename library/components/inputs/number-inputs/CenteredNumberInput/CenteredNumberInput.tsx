import { MinusIcon } from '@peiko/components/icons/MinusIcon'
import { PlusIcon } from '@peiko/components/icons/PlusIcon'
import { IconButton } from '@peiko/components/buttons/IconButton'
import { useNumberInput } from '../hooks/use-number-input'
import { StyledInput } from './CenteredNumberInput.styles'
import { TNumberInputProps } from '../types'

const CenteredNumberInput: React.FC<TNumberInputProps> = ({
  name,
  value,
  onChange,
  hideControls,
  ...props
}) => {
  const { localValue, handleChange, handlePlusClick, handleMinusClick } = useNumberInput({
    value,
    onChange,
  })
  return (
    <StyledInput
      {...props}
      type="number"
      name={name}
      onChange={handleChange}
      value={typeof localValue === 'number' ? localValue.toString() : ''}
      startAdornment={
        !hideControls ? (
          <IconButton size="s" onClick={handleMinusClick} iconColor="main8">
            <MinusIcon />
          </IconButton>
        ) : undefined
      }
      endAdornment={
        !hideControls ? (
          <IconButton size="s" onClick={handlePlusClick} iconColor="main8">
            <PlusIcon />
          </IconButton>
        ) : undefined
      }
    />
  )
}

export { CenteredNumberInput }
