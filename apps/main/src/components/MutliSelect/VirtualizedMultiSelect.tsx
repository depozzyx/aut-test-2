import React, { useCallback, useEffect, useState, memo, useRef } from 'react'
import useTranslation from 'next-translate/useTranslation'
import {
  components,
  OptionProps,
  GroupBase,
  DropdownIndicatorProps,
  NoticeProps,
  MenuListProps,
} from 'react-select'
import { FixedSizeList as List } from 'react-window'
import { ArrowIcon } from '@peiko/components/icons/Arrow'
import { Text } from '@peiko/components/Text'
import { Label } from '@peiko/components/inputs/Label'
import { CheckIcon } from '@/icons/CheckIcon'
import { deepEqual } from '@peiko/utils/deep-equal'
import { TSelectOption, TMultiSelectProps, TSelectEvent } from './types'
import { Container, CustomLabel, StyledMultiSelect } from './MutliSelect.styled'

const OPTION_HEIGHT = 38
const MENU_MAX_HEIGHT = 300

type TCustomMenuListProps = MenuListProps<
  TSelectOption,
  boolean,
  GroupBase<TSelectOption>
> & {
  onMenuScrollToBottom?: () => void
}

const CustomMenuList = memo((props: TCustomMenuListProps) => {
  const {
    options,
    children,
    maxHeight = MENU_MAX_HEIGHT,
    getValue,
    onMenuScrollToBottom,
  } = props

  const childrenArray = React.Children.toArray(children)
  const listRef = useRef<List | null>(null)
  const [value] = getValue()
  const initialOffset = options.indexOf(value) * OPTION_HEIGHT

  const handleScroll = ({
    scrollOffset,
    scrollDirection,
  }: {
    scrollOffset: number
    scrollDirection: string
  }) => {
    if (scrollDirection === 'forward') {
      if (!listRef.current) return
      const listHeight = listRef.current.props.height as number
      const totalHeight = childrenArray.length * OPTION_HEIGHT

      if (scrollOffset + listHeight >= totalHeight - OPTION_HEIGHT) {
        onMenuScrollToBottom?.()
      }
    }
  }

  return (
    <div>
      <List
        width="100%"
        className="virtualized-list"
        ref={listRef}
        height={maxHeight}
        itemCount={childrenArray.length}
        itemSize={OPTION_HEIGHT}
        initialScrollOffset={initialOffset}
        onScroll={handleScroll}
      >
        {({ index, style }) => (
          <div style={style}>{childrenArray[index] as React.ReactNode}</div>
        )}
      </List>
    </div>
  )
}, deepEqual)

CustomMenuList.displayName = 'CustomMenuList'

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
              MenuList: (props) => (
                <CustomMenuList {...props} onMenuScrollToBottom={onMenuScrollToBottom} />
              ),
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
  deepEqual,
)

VirtualizedMultiSelect.displayName = 'VirtualizedMultiSelect'
