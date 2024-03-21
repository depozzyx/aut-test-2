export type TTabButtonprops = {
  isActive: boolean
  onClick: () => void
}

export type TTabProps = {
  label: string
  disabled?: boolean
}

export type TTabsProps = {
  /**
   * List of tabs to show.
   *
   * Each tab should have `label` property.
   *
   * You can also disable a tab by setting `disabled` property to `true`.
   *
   * @type {label: string; disabled?: boolean; }[]
   */
  tabs: TTabProps[]
  /**
   * Active tab number.
   * @type number
   * @default 1
   */
  activeTab?: number
  /**
   * onChange callback when tab is changed
   *
   * @type (index: number) => void
   */
  onChange?: (index: number) => void
}
