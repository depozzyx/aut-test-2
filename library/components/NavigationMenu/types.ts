export type TListItemLink = {
  label: string
  to: string // 'to' property for navigable links
  children?: never // Ensure that link items don't have children
  isOpen?: never
  disabled?: boolean
}

export type TListItemCollapsible = {
  label: string
  to?: never // Ensure that collapsible items don't have 'to' property
  children: TListItemLink[] // Define children which can be of any item type
  isOpen?: boolean
  disabled?: boolean
}

// Create a type that includes both link and collapsible items
export type TListItem = TListItemLink | TListItemCollapsible

export type TListProps = {
  items: TListItem[]
}

export type TListItemProps = {
  isChild?: boolean
} & TListItem
