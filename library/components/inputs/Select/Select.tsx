import React, { useCallback, useEffect, useState } from 'react'
import { components, DropdownIndicatorProps, NoticeProps } from 'react-select'
import { useUpdateEffect } from 'react-use'
import useTranslation from 'next-translate/useTranslation'
import { ArrowIcon } from '@peiko/components/icons/Arrow'
import { Text } from '@peiko/components/Text'
import { Label } from '../Label'
import { TSelectProps, TSelectOption, TSelectEvent } from './types'
import * as S from './Select.styles'

export const Select: React.FC<TSelectProps> = ({
  disabled,
  error,
  label,
  size = 's',
  width,
  zIndex,
  value,
  options,
  onChange,
  isSearchable = false,
  ...props
}) => {
  const { t } = useTranslation('inputs')
  const [openCount, setOpenCount] = useState(0)
  const [open, setOpen] = useState(false)
  const [hasScroll, setHasScroll] = useState(false)
  const [selectValue, setValue] = useState<TSelectEvent>(
    options?.find((item) => item.value === value) || null,
  )

  // detect scroll menu
  useEffect(() => {
    if (openCount === 0) return
    const menuEl = document.body.querySelector('.custom-rs__menu-list')
    if (!menuEl) return
    const hasScrollBar = menuEl.scrollHeight > menuEl.clientHeight + 1
    setHasScroll(hasScrollBar)
  }, [openCount])

  useEffect(() => {
    if (value === selectValue?.value) return
    const selectOption = options?.find((item) => item.value === value)
    if (!selectOption) return
    setValue(selectOption)
  }, [value])

  useUpdateEffect(() => {
    if (!value) {
      setValue(null)
    }
  }, [value])

  useEffect(() => {
    if (!open) return
    setOpenCount((state) => state + 1)
  }, [open])

  const handleChange = (option: TSelectEvent) => {
    setValue(option)
    onChange?.(option)
  }

  const DropdownIndicator = useCallback(
    (props: DropdownIndicatorProps<TSelectOption, false>) => {
      const { selectProps } = props
      const { menuIsOpen } = selectProps

      return (
        <components.DropdownIndicator {...props}>
          <ArrowIcon
            direction={menuIsOpen ? 'down' : 'up'}
            color="main5"
            width="24px"
            height="24px"
          />
        </components.DropdownIndicator>
      )
    },
    [],
  )

  const NoOptionsMessage = (props: NoticeProps<TSelectOption, false>) => (
    <components.NoOptionsMessage {...props}>
      <Text variant="f8" color="main22">
        {t('no-options')}
      </Text>
    </components.NoOptionsMessage>
  )

  const id = props.name

  // handle case when options changed on the fly
  const selectKey = options ? options.map((item) => item.value).join('-') : id

  // handle case when options changed and selected value not in options
  useUpdateEffect(() => {
    if (!options) return

    if (!selectValue) return

    if (options.find((item) => item.value === selectValue.value)) return

    setValue(null)

    onChange?.(null)
  }, [selectKey])

  return (
    <S.Container width={width}>
      <Label {...label} error={error} onClick={() => setOpen(true)}>
        <S.RS
          id={id}
          size={size}
          value={selectValue}
          options={options}
          error={error}
          instanceId={id}
          disabled={disabled}
          onChange={handleChange}
          components={{ DropdownIndicator, NoOptionsMessage }}
          menuShouldScrollIntoView
          menuIsOpen={open}
          hasScroll={hasScroll}
          classNamePrefix="custom-rs"
          onMenuOpen={() => setOpen(true)}
          onMenuClose={() => setOpen(false)}
          blurInputOnSelect
          openMenuOnFocus={false}
          width={width}
          isSearchable={isSearchable}
          zIndex={zIndex}
          {...props}
        />
      </Label>
    </S.Container>
  )
}
