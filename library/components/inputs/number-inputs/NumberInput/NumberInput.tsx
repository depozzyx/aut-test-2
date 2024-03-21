import { MinusIcon } from '@peiko/components/icons/MinusIcon'
import { PlusIcon } from '@peiko/components/icons/PlusIcon'
import { IconButton } from '../../../buttons/IconButton'
import { useNumberInput } from '../hooks/use-number-input'
import { Input } from '../../Input'
import { Actions } from './NumberInput.styles'
import { TNumberInputProps } from '../types'

const NumberInput: React.FC<TNumberInputProps> = ({
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
    <Input
      {...props}
      type="number"
      name={name}
      onChange={handleChange}
      value={typeof localValue === 'number' ? localValue.toString() : ''}
      endAdornment={
        !hideControls ? (
          <Actions>
            <IconButton size="s" onClick={handleMinusClick}>
              <MinusIcon />
            </IconButton>
            <IconButton size="s" onClick={handlePlusClick}>
              <PlusIcon />
            </IconButton>
          </Actions>
        ) : undefined
      }
    />
  )
}

export { NumberInput }
