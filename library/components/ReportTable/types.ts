import { CSSProperties, ReactNode } from 'react'

export type TReportHeader<T extends PropertyKey> = {
  value: T
  label: ReactNode
  width?: CSSProperties['width']
  align?: CSSProperties['textAlign']
}

export type TReportRow<T extends PropertyKey> = Record<T, ReactNode>

export type TReportTableProps<T extends PropertyKey> = {
  headers: Array<TReportHeader<T>>
  rows: Array<TReportRow<T>>
  footerRows?: Array<TReportRow<T>> // optional extra summary rows
  footerStyles?: CSSProperties // optional styles applied to all footer cells
  headerStyles?: CSSProperties // optional styles applied to all header cells
  rowStyles?: CSSProperties | ((row: TReportRow<T>, rowIndex: number) => CSSProperties)
  caption?: ReactNode
  minWidth?: string
  styles?: CSSProperties
  /** default border color falls back to palette.main11 */
  borderColor?: string
  /** cell vertical align, defaults center */
  vAlign?: CSSProperties['alignItems']
}
