// import React, { useCallback, useEffect, useState } from 'react'
// import {
//   DropdownIndicatorProps,
//   MenuProps,
//   components,
//   NoticeProps,
//   OptionProps,
//   GroupBase,
// } from 'react-select'
// import useTranslation from 'next-translate/useTranslation'
// import { ArrowIcon } from '@peiko/components/icons/Arrow'
// import { Flex } from '@/components/Flex'
// import { Text } from '@peiko/components/Text'
// import { Label } from '@peiko/components/inputs/Label'
// import { TSelectOption, TSelectEvent, TMultiSelectProps } from './types'
// import * as S from './MutliSelect.styled'
//
// export const MultiSelect: React.FC<TMultiSelectProps> = ({
//   disabled,
//   error,
//   label,
//   size = 's',
//   width,
//   zIndex,
//   value,
//   options,
//   onChange,
//   isSearchable = false,
//   menuContent,
//   defaultValue,
//   ...props
// }) => {
//   const { t } = useTranslation('inputs')
//   const [openCount, setOpenCount] = useState(0)
//   const [open, setOpen] = useState(false)
//   const [hasScroll, setHasScroll] = useState(false)
//   const [selectedOptions, setSelectedOptions] = useState<TSelectEvent>([])
//
//   useEffect(() => {
//     if (openCount === 0) return
//     const menuEl = document.body.querySelector('.multi-rs__menu-list')
//     if (!menuEl) return
//     const hasScrollBar = menuEl.scrollHeight > menuEl.clientHeight + 1
//     setHasScroll(hasScrollBar)
//   }, [openCount])
//
//   useEffect(() => {
//     if (!open) return
//     setOpenCount((state) => state + 1)
//   }, [open])
//
//   useEffect(() => {
//     if (!options || !value) return
//     setSelectedOptions(options?.filter((option) => value.includes(option.value)))
//   }, [value, options])
//
//   const handleChange = (option: TSelectEvent) => {
//     setSelectedOptions(option)
//     onChange?.(option)
//   }
//
//   const DropdownIndicator = useCallback(
//     (props: DropdownIndicatorProps<TSelectOption, false>) => {
//       const { selectProps } = props
//       const { menuIsOpen } = selectProps
//
//       return (
//         <components.DropdownIndicator {...props}>
//           <ArrowIcon direction={menuIsOpen ? 'up' : 'down'} />
//         </components.DropdownIndicator>
//       )
//     },
//     [],
//   )
//
//   const Menu = useCallback(
//     (props: MenuProps<TSelectOption, false, GroupBase<TSelectOption>>) => {
//       const { children } = props
//
//       return (
//         <components.Menu {...props}>
//           {menuContent?.place === 'prepend' && menuContent.element}
//           {children}
//           {menuContent?.place === 'append' && menuContent.element}
//         </components.Menu>
//       )
//     },
//     [],
//   )
//
//   const NoOptionsMessage = useCallback(
//     (props: NoticeProps<TSelectOption, false, GroupBase<TSelectOption>>) => (
//       <components.NoOptionsMessage {...props}>
//         <Text variant="f8" color="main22">
//           {t('no-options')}
//         </Text>
//       </components.NoOptionsMessage>
//     ),
//     [],
//   )
//
//   const Option = useCallback(
//     (props: OptionProps<TSelectOption, false, GroupBase<TSelectOption>>) => {
//       console.log('props', props)
//       return (
//         <components.Option {...props}>
//           <Flex align="center" gap={10}>
//             <input
//               id="option"
//               type="checkbox"
//               checked={props.isSelected}
//               onChange={() => null}
//             />
//             <label htmlFor="option">{props.label}</label>
//           </Flex>
//         </components.Option>
//       )
//     },
//     [],
//   )
//
//   const id = props.name
//
//   return (
//     <S.Container width={width}>
//       <Label {...label} error={error} onClick={() => setOpen(true)}>
//         <S.MRS
//           id={id}
//           size={size}
//           value={selectedOptions}
//           defaultValue={defaultValue}
//           options={options}
//           error={error}
//           instanceId={id}
//           disabled={disabled}
//           onChange={handleChange}
//           components={{ DropdownIndicator, Menu, NoOptionsMessage, Option }}
//           menuIsOpen={open}
//           hasScroll={hasScroll}
//           classNamePrefix="multi-rs"
//           onMenuOpen={() => setOpen(true)}
//           onMenuClose={() => setOpen(false)}
//           openMenuOnFocus={false}
//           closeMenuOnSelect={false}
//           width={width}
//           isSearchable={isSearchable}
//           zIndex={zIndex}
//           menuShouldScrollIntoView
//           blurInputOnSelect
//           isMulti
//           {...props}
//         />
//       </Label>
//     </S.Container>
//   )
// }

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
import { Flex } from '@/components/Flex'
import { Text } from '@peiko/components/Text'
import { Label } from '@peiko/components/inputs/Label'
import { TSelectOption, TMultiSelectProps, TSelectEvent } from './types'
import { Container, StyledMultiSelect } from './MutliSelect.styled'

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
          <Flex
            align="center"
            gap={10}
            onClick={() => null}
            styles={{ cursor: 'pointer' }}
          >
            <input
              id="option"
              type="checkbox"
              checked={isSelected}
              onChange={() => null}
              style={{ cursor: 'pointer' }}
            />
            <Text variant="f8" color="main5" styles={{ cursor: 'pointer' }}>
              {label}
            </Text>
          </Flex>
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
