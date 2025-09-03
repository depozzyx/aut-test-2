/* eslint-disable */
import React, { useState, memo, useRef, FC, useEffect } from 'react'
import { ContextMenu } from '@peiko/components/ContextMenu'
import { deepEqual } from '@peiko/utils/deep-equal'
import { MenuContainer, MenuItem } from './DropdownMenu.styled'
import { CheckIcon } from '@/icons/CheckIcon'
import { Text } from '@peiko/components/Text'

export type TValue = { label: string; value: string | number }

export type TDropdownMenuProps = {
  triggerElement: JSX.Element | ((isOpen: boolean) => JSX.Element)
  options: TValue[]
  onChange: (selectedItems: TValue[]) => void
  multiple?: boolean
  minWidth?: string
  maxHeight?: string
  selectedOptions?: TValue[]
  disabled?: boolean
  onMenuScrollToBottom?: () => void
}

const Menu: FC<
  Omit<TDropdownMenuProps, 'triggerElement' | 'onChange' | 'multiple'> & {
    handleSelect: (item: TValue) => void
    selectedItems: TValue[]
    multiple: boolean
  }
> = ({
  handleSelect,
  selectedItems,
  options,
  maxHeight,
  minWidth,
  onMenuScrollToBottom,
}) => {
  const menuRef = useRef<HTMLDivElement>(null)

  const handleMenuScroll = () => {
    const menu = menuRef.current
    if (menu) {
      const threshold = 1
      const isEndReached =
        menu.scrollHeight - menu.scrollTop <= menu.clientHeight + threshold

      if (isEndReached) {
        onMenuScrollToBottom?.()
      }
    }
  }

  return (
    <MenuContainer
      ref={menuRef}
      maxHeight={maxHeight}
      minWidth={minWidth}
      onScroll={handleMenuScroll}
    >
      {options.map((item) => {
        const checked = !!selectedItems.find(({ value }) => value === item.value)
        return (
          <MenuItem key={item.value} checked={checked}>
            <input
              type="checkbox"
              checked={checked}
              onChange={() => handleSelect(item)}
            />
            <Text color="main5" variant="f8">
              {item.label}
            </Text>
            <CheckIcon color="main4" />
          </MenuItem>
        )
      })}
    </MenuContainer>
  )
}

export const DropdownMenu = memo(
  ({
    triggerElement,
    options,
    onChange,
    multiple,
    minWidth,
    maxHeight,
    onMenuScrollToBottom,
    selectedOptions,
    ...props
  }: TDropdownMenuProps): JSX.Element => {
    const [selectedItems, setSelectedItems] = useState<TValue[]>([])

    const handleSelect = (item: TValue) => {
      let newSelectedItems: TValue[] = []

      if (multiple) {
        const currentIndex = selectedItems.findIndex(
          (selected) => selected.value === item.value,
        )
        newSelectedItems = [...selectedItems]
        if (currentIndex === -1) {
          newSelectedItems.push(item)
        } else {
          newSelectedItems.splice(currentIndex, 1)
        }
      } else {
        newSelectedItems = [item]
      }

      setSelectedItems(newSelectedItems)
      onChange(newSelectedItems)
    }

    useEffect(() => {
      setSelectedItems(selectedOptions ?? [])
    }, [selectedOptions])

    return (
      <ContextMenu
        disabled={props.disabled}
        trigger={triggerElement}
        renderMenu={() => (
          <Menu
            maxHeight={maxHeight}
            minWidth={minWidth}
            handleSelect={handleSelect}
            options={options}
            selectedItems={selectedItems}
            onMenuScrollToBottom={onMenuScrollToBottom}
            multiple={multiple || false}
          />
        )}
        position="bottom left"
        {...props}
      />
    )
  },
  deepEqual,
)

DropdownMenu.displayName = 'DropdownMenu'
