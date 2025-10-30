/* eslint-disable */
import React, { useState, memo, useRef, FC, useEffect } from 'react'
import { ContextMenu } from '@peiko/components/ContextMenu'
import { deepEqual } from '@peiko/utils/deep-equal'
import { MenuContainer, MenuItem } from './DropdownMenu.styled'
import { CheckIcon } from '@/icons/CheckIcon'
import { Text } from '@peiko/components/Text'

export type TValue<T = string | number> = { label: string; value: T }

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
  closeOnSelect?: boolean
  // Controlled open state (optional)
  open?: boolean
  onOpenChange?: (open: boolean) => void
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
    closeOnSelect = false,
    ...props
  }: TDropdownMenuProps): JSX.Element => {
    const [selectedItems, setSelectedItems] = useState<TValue[]>([])
    const [internalOpen, setInternalOpen] = useState(false)
    const isControlled = typeof props.open === 'boolean'
    const effectiveOpen = isControlled ? (props.open as boolean) : internalOpen

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
      // Close when single-select, or when explicitly requested for multi-select
      if (!multiple || closeOnSelect) {
        if (isControlled) {
          props.onOpenChange?.(false)
        } else {
          setInternalOpen(false)
        }
      }
    }

    useEffect(() => {
      setSelectedItems(selectedOptions ?? [])
    }, [selectedOptions])

    // Avoid passing conflicting props down; pick only ContextMenu-relevant overrides from rest
    const {
      open: _omitOpen,
      onOpenChange: _omitOnOpenChange,
      // Allow consumers to override popup behavior (like 'on' trigger type) if they pass it
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      ...rest
    } = props as any

    const triggerType = (rest && rest.on) || 'click'

    return (
      <ContextMenu
        open={effectiveOpen}
        // Keep parent and ContextMenu states in sync so we can programmatically open/close
        customOpenHandler={() =>
          isControlled ? props.onOpenChange?.(true) : setInternalOpen(true)
        }
        customCloseHandler={() =>
          isControlled ? props.onOpenChange?.(false) : setInternalOpen(false)
        }
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
        on={triggerType}
        {...rest}
      />
    )
  },
  deepEqual,
)

DropdownMenu.displayName = 'DropdownMenu'
