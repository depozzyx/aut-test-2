import { useState } from 'react'
import { useUpdateEffect } from 'react-use'
import { StyledDayPicker } from './DayPicker.styles'
import { TDayPickerProps } from './types'

export const DayPicker: React.FC<TDayPickerProps> = ({
  value,
  onChange,
  ...otherProps
}) => {
  const [selected, setSelected] = useState<Date | undefined>(value)

  useUpdateEffect(() => {
    setSelected(value)
  }, [value])

  const handleSelect = (data: Date | undefined) => {
    setSelected(data)

    if (onChange) {
      onChange(data)
    }
  }

  useUpdateEffect(() => {
    if (selected) {
      setSelected(selected)
    }
  }, [selected])

  return (
    <StyledDayPicker
      mode="single"
      selected={selected}
      onSelect={handleSelect}
      {...otherProps}
    />
  )
}
