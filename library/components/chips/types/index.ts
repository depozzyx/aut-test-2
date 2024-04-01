import { TStylesProps, TMediaQueries } from '@peiko/styles'

export type TChipSizes = 's' | 'm' | 'l'

export type TChipProps = {
  /**
   * The background color of the chip.
   */
  color?: string
  /**
   * You can add a start or end adornment to the chip.
   */
  startAdornment?: React.ReactNode
  /**
   * You can add a start or end adornment to the chip.
   */
  endAdornment?: React.ReactNode
  /**
   * The delete handle. When provided, the chip will show a delete icon and will be clickable.
   */
  onDelete?: () => void
  /**
   * The click handler of the chip.
   */
  onClick?: () => void
  /**
   * The size of the chip.
   *
   * @default m
   */
  size?: TChipSizes | TMediaQueries<TChipSizes>
  /**
   * Possibility to disable chip.
   */
  disabled?: boolean
} & TStylesProps
