import React, { useCallback, useEffect, useState, memo, useRef } from 'react'
import useTranslation from 'next-translate/useTranslation'
import {
  components,
  OptionProps,
  GroupBase,
  DropdownIndicatorProps,
  NoticeProps,
} from 'react-select'

import { FixedSizeList } from 'react-window'
import { ArrowIcon } from '@peiko/components/icons/Arrow'
import { Text } from '@peiko/components/Text'
import { Label } from '@peiko/components/inputs/Label'
import { CheckIcon } from '@/icons/CheckIcon'
import { TSelectOption, TMultiSelectProps, TSelectEvent } from './types'
import { Container, CustomLabel, StyledMultiSelect } from './MutliSelect.styled'

const OPTION_HEIGHT = 38

export const VirtualizedMultiSelect = memo(
  ({
    options,
    onChange,
    value,
    error,
    label,
    width,
    size = 's',
    isSearchable = false,
    zIndex,
    onMenuScrollToBottom,
    ...props
  }: TMultiSelectProps): JSX.Element => {
    const { t } = useTranslation('inputs')
    const [open, setOpen] = useState(false)
    const [state, setState] = useState<{ optionSelected: TSelectEvent | null }>({
      optionSelected: null,
    })

    useEffect(() => {
      if (!options || !value) return
      setState({
        optionSelected: options?.filter((option) => value.includes(option.value)),
      })
    }, [value, options])

    const handleChange = useCallback(
      (selected: TSelectEvent) => {
        setState((prevState) => ({
          ...prevState,
          optionSelected: selected,
        }))

        if (onChange) onChange(selected)
      },
      [onChange],
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
              <input id="option" type="checkbox" checked={isSelected} readOnly />
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

    const listRef = useRef<FixedSizeList>(null)
    const scrollPositionRef = useRef(0)

    useEffect(() => {
      if (listRef.current && scrollPositionRef.current > 0) {
        listRef.current.scrollTo(scrollPositionRef.current)
      }
    }, [options])

    const CustomMenuList = useCallback(
      ({ children, maxHeight }) => {
        const itemCount = React.Children.count(children)

        const handleScroll = ({
          scrollOffset,
          scrollDirection,
        }: {
          scrollOffset: number
          scrollDirection: 'forward' | 'backward'
        }) => {
          scrollPositionRef.current = scrollOffset

          if (scrollDirection === 'forward' && listRef.current) {
            const listHeight = listRef.current.props.height as number
            const scrollThreshold = itemCount * OPTION_HEIGHT - listHeight

            if (scrollOffset >= scrollThreshold - OPTION_HEIGHT) {
              onMenuScrollToBottom?.()
            }
          }
        }

        return (
          <FixedSizeList
            width="100%"
            ref={listRef}
            height={Math.min(maxHeight, itemCount * OPTION_HEIGHT)}
            itemCount={itemCount}
            itemSize={OPTION_HEIGHT}
            onScroll={handleScroll}
            initialScrollOffset={scrollPositionRef.current}
          >
            {({ index, style }) => (
              <div style={style}>{React.Children.toArray(children)[index]}</div>
            )}
          </FixedSizeList>
        )
      },
      [onMenuScrollToBottom, options],
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
              MenuList: CustomMenuList,
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
            controlShouldRenderValue
            width={width}
            zIndex={zIndex}
            isMulti
            {...props}
          />
        </Label>
      </Container>
    )
  },
)

VirtualizedMultiSelect.displayName = 'VirtualizedMultiSelect'
