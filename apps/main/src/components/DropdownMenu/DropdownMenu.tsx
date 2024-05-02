/* eslint-disable */
import React, { useState, memo, useCallback } from 'react'
import { ContextMenu } from '@peiko/components/ContextMenu'
import { deepEqual } from '@peiko/utils/deep-equal'
import { MenuContainer, MenuItem } from './DropdownMenu.styled'

export type TDropdownMenuProps = {
  triggerElement: JSX.Element
  options: Array<{ label: string; value: string }>
  onChange: (selectedItems: Array<{ label: string; value: string }>) => void
}

export const DropdownMenu = memo(
  ({ triggerElement, options, onChange, ...props }: TDropdownMenuProps): JSX.Element => {
    // const [selectedItems, setSelectedItems] = useState([])
    //
    // const handleSelect = (item) => {
    //   const currentIndex = selectedItems.findIndex(
    //     (selected) => selected.value === item.value,
    //   )
    //   let newSelectedItems = [...selectedItems]
    //
    //   if (currentIndex === -1) {
    //     newSelectedItems.push(item)
    //   } else {
    //     newSelectedItems.splice(currentIndex, 1)
    //   }
    //
    //   setSelectedItems(newSelectedItems)
    //   onChange(newSelectedItems)
    // }

    // const renderMenuItems = useCallback(
    //   () => (
    //     <MenuContainer>
    //       {options.map((item) => (
    //         <MenuItem key={item.value}>
    //           <label>
    //             <input
    //               type="checkbox"
    //               checked={selectedItems.some(
    //                 (selected) => selected.value === item.value,
    //               )}
    //               onChange={() => handleSelect(item)}
    //             />
    //             {item.label}
    //           </label>
    //         </MenuItem>
    //       ))}
    //     </MenuContainer>
    //   ),
    //   [],
    // )

    // const renderMenuItems = useCallback(
    //   () => (
    //     <MenuContainer>
    //       {options.map((item) => (
    //         <MenuItem key={item.value}>
    //           <label>
    //             <input
    //               type="checkbox"
    //               checked={selectedItems.some(
    //                 (selected) => selected.value === item.value,
    //               )}
    //               onChange={() => handleSelect(item)}
    //             />
    //             {item.label}
    //           </label>
    //         </MenuItem>
    //       ))}
    //     </MenuContainer>
    //   ),
    //   [],
    // )

    const renderMenuItems = useCallback(() => <MenuContainer />, [])

    return (
      <ContextMenu
        trigger={triggerElement}
        renderMenu={() => renderMenuItems()}
        {...props}
      />
    )
  },
  deepEqual,
)

DropdownMenu.displayName = 'DropdownMenu'
