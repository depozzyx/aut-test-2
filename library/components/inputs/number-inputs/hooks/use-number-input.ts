import { useState } from 'react'
import { useUpdateEffect } from 'react-use'
import { TNumberInputProps } from '../types'

type TParams = {
  value: TNumberInputProps['value']
  onChange: TNumberInputProps['onChange']
}

type TReturn = {
  localValue: TNumberInputProps['value']
  handleChange: (value: string) => void
  handlePlusClick: () => void
  handleMinusClick: () => void
}

export const useNumberInput = ({ value, onChange }: TParams): TReturn => {
  const [localValue, setLocalValue] = useState<number | undefined>(value)

  const handleChange = (value: string) => {
    const newValue = Number(value)
    setLocalValue(newValue)
    onChange?.(newValue)
  }

  useUpdateEffect(() => {
    if (localValue === undefined) return
    onChange?.(localValue)
  }, [localValue])

  const handleMinusClick = () => {
    setLocalValue((prev) => {
      if (!prev) return undefined
      if (prev <= 0) return prev
      return prev - 1
    })
  }

  const handlePlusClick = () => {
    setLocalValue((prev) => {
      if (!prev) return 1
      return prev + 1
    })
  }

  useUpdateEffect(() => {
    setLocalValue(value ?? 0)
  }, [value])

  return {
    localValue,
    handleChange,
    handlePlusClick,
    handleMinusClick,
  }
}
