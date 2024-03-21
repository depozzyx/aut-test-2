import { MinusIcon } from '@peiko/components/icons/MinusIcon'
import { PlusIcon } from '@peiko/components/icons/PlusIcon'
import { IconButton } from '@peiko/components/buttons/IconButton'
import { useNumberInput } from '../hooks/use-number-input'
import { StyledInput, Wrapper } from './CenteredSmallNumberInput.styled'
import { TNumberInputProps } from '../types'

const CenteredSmallNumberInput: React.FC<TNumberInputProps> = ({
  name,
  value,
  onChange,
  hideControls,
  size,
  ...props
}) => {
  const { localValue, handleChange, handlePlusClick, handleMinusClick } = useNumberInput({
    value,
    onChange,
  })
  return (
    <Wrapper>
      {!hideControls ? (
        <IconButton
          size="s"
          onClick={handleMinusClick}
          iconColor="main8"
          disabled={props.disabled}
        >
          <MinusIcon />
        </IconButton>
      ) : undefined}
      <StyledInput
        {...props}
        type="number"
        name={name}
        size={size}
        onChange={handleChange}
        value={typeof localValue === 'number' ? localValue.toString() : ''}
      />
      {!hideControls ? (
        <IconButton
          size="s"
          onClick={handlePlusClick}
          iconColor="main8"
          disabled={props.disabled}
        >
          <PlusIcon />
        </IconButton>
      ) : undefined}
    </Wrapper>
  )
}

export { CenteredSmallNumberInput }
