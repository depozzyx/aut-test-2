import { ReactNode, CSSProperties } from 'react'
import { TStyle } from '@peiko/styles'
import {
  TButtonCollapseProps,
  THeader,
  THeaderCellProps,
  TBodyCellProps,
} from '../Table/types'

export type TRenderElement<T> = (props: T) => ReactNode

export type TTreeRow<R> = R & { id: string | number; children?: Array<TTreeRow<R>> }

export type TTreeTableProps<
  R extends Record<string, ReactNode>,
  H extends THeader<keyof R>,
> = {
  headerData: H[]
  rows: Array<TTreeRow<R>>
  bodyCell: TRenderElement<TBodyCellProps>
  headerCell: TRenderElement<THeaderCellProps>
  buttonCollapse?: TRenderElement<TButtonCollapseProps>
  indent?: number
  loading?: boolean
  emptyComponent?: ReactNode
  minHeight?: string
  maxHeight?: string
  styles?: TStyle
  expandAll?: boolean
  opened?: Array<string | number>
  /**
   * Optional map to apply custom styles per depth for row cells.
   * Keys are depth levels (0-based), values are CSSProperties applied to all cells of that row.
   */
  rowStyleByDepth?:
    | Record<number, CSSProperties>
    | ((depth: number) => CSSProperties | undefined)
  /**
   * Optional footer (total) row displayed after all rows.
   * Provide either a simple map of cell contents per column value, or a custom render via footerCell.
   */
  footerRow?: Partial<Record<keyof R, ReactNode>>
  /**
   * Optional footer cell renderer; by default footer uses bodyCell.
   */
  footerCell?: TRenderElement<TBodyCellProps>
  /**
   * Optional styles for the footer row cells.
   */
  footerStyles?: CSSProperties
  onOpenClose?: (opened: Array<string | number>) => void
}
