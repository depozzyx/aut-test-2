import React, { useCallback, useEffect, useState } from 'react'
import useTranslation from 'next-translate/useTranslation'
import {
  components,
  OptionProps,
  GroupBase,
  DropdownIndicatorProps,
  NoticeProps,
  MenuProps,
} from 'react-select'
import { ArrowIcon } from '@peiko/components/icons/Arrow'
import { Text } from '@peiko/components/Text'
import { Label } from '@peiko/components/inputs/Label'
import { CheckIcon } from '@/icons/CheckIcon'
import { TSelectOption, TMultiSelectProps, TSelectEvent } from './types'
import { Container, CustomLabel, StyledMultiSelect } from './MutliSelect.styled'

export const MultiSelect = ({
  options,
  onChange,
  value,
  error,
  label,
  width,
  size = 's',
  isSearchable = false,
  zIndex,
  ...props
}: TMultiSelectProps): JSX.Element => {
  const { t } = useTranslation('inputs')
  const [open, setOpen] = useState(false)
  const [openCount, setOpenCount] = useState(0)
  const [hasScroll, setHasScroll] = useState(false)
  const [state, setState] = useState<{ optionSelected: TSelectEvent | null }>({
    optionSelected: null,
  })

  useEffect(() => {
    if (!open) return
    setOpenCount((state) => state + 1)
  }, [open])

  useEffect(() => {
    if (openCount === 0) return
    const menuEl = document.body.querySelector('.custom-rs__menu-list')
    if (!menuEl) return
    const hasScrollBar = menuEl.scrollHeight > menuEl.clientHeight + 1
    setHasScroll(hasScrollBar)
  }, [openCount])

  useEffect(() => {
    if (!options || !value) return
    setState({
      optionSelected: options?.filter((option) => value.includes(option.value)),
    })
  }, [value, options])

  const handleChange = (selected: TSelectEvent) => {
    setState({
      optionSelected: selected,
    })
    if (onChange) onChange(selected)
  }

  const Menu = useCallback(
    (props: MenuProps<TSelectOption, true, GroupBase<TSelectOption>>) => {
      const { children } = props

      return <components.Menu {...props}>{children}</components.Menu>
    },
    [],
  )

  const DropdownIndicator = useCallback(
    (props: DropdownIndicatorProps<TSelectOption, true, GroupBase<TSelectOption>>) => {
      const { selectProps } = props
      const { menuIsOpen } = selectProps

      return (
        <components.DropdownIndicator {...props}>
          <ArrowIcon direction={menuIsOpen ? 'up' : 'down'} />
        </components.DropdownIndicator>
      )
    },
    [],
  )

  const NoOptionsMessage = useCallback(
    (props: NoticeProps<TSelectOption, true, GroupBase<TSelectOption>>) => (
      <components.NoOptionsMessage {...props}>
        <Text variant="f8" color="main22">
          {t('no-options')}
        </Text>
      </components.NoOptionsMessage>
    ),
    [],
  )

  const Option = useCallback(
    (props: OptionProps<TSelectOption, boolean, GroupBase<TSelectOption>>) => {
      const { isSelected, label } = props

      return (
        <components.Option {...props}>
          <CustomLabel key={label} isSelected={isSelected}>
            <input id="option" type="checkbox" checked={isSelected} />
            <Text variant="f8" color="main5">
              {label}
            </Text>
            {isSelected && <CheckIcon color="main4" />}
          </CustomLabel>
        </components.Option>
      )
    },
    [],
  )

  const id = props.name

  return (
    <Container width={width}>
      <Label {...label} error={error} onClick={() => setOpen(true)}>
        <StyledMultiSelect
          id={id}
          size={size}
          options={options}
          value={state.optionSelected}
          closeMenuOnSelect={false}
          hideSelectedOptions={false}
          components={{
            Menu,
            Option,
            DropdownIndicator,
            NoOptionsMessage,
          }}
          onChange={handleChange}
          menuIsOpen={open}
          onMenuClose={() => setOpen(false)}
          onMenuOpen={() => setOpen(true)}
          classNamePrefix="multi-rs"
          isSearchable={isSearchable}
          controlShouldRenderValue={false}
          hasScroll={hasScroll}
          width={width}
          zIndex={zIndex}
          isMulti
          {...props}
        />
      </Label>
    </Container>
  )
}
