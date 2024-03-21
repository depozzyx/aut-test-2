import { TStylesProps, TMediaQueries } from '@peiko/styled'

/**
 * Breakpoint colums
 */
export type TItemColumn = TMediaQueries<number>

export type TGridContainerProps = {
  /**
   * If `true`, the component will have the grid container behavior.
   *
   * You should be wrapping items with a `container`.
   * @type boolean
   */
  container: true
  /**
   * The number of columns
   * @default 12
   */
  columns?: number | TMediaQueries<number>
  /**
   * Defines the space between Grid `item` components.
   *
   * It can only be used when Grid is `container` component.
   */
  spacing?: number | string | TMediaQueries<number | string>
  /**
   * Defines the column space between Grid `item` components.
   *
   * It can only be used when Grid is `container` component.
   */
  spacingColumn?: number | string | TMediaQueries<number | string>
  /**
   * Defines the row space between Grid `item` components.
   *
   * It can only be used when Grid is `container` component.
   */
  spacingRow?: number | string | TMediaQueries<number | string>
  item?: undefined
} & TStylesProps

export type TGridItemProps = {
  /**
   * If `true`, the component will behave as child of `container` element.
   *
   * You should write items with a `item` property.
   * @type boolean
   */
  item: true
  spacing?: undefined
  spacingColumn?: undefined
  spacingRow?: undefined
  container?: undefined
  columns?: undefined
  /**
   * The content of the `item` Grid component.
   *
   * For `container` Grid component, it's recommended to use `item` Grid components.
   * @type React.ReactNode
   */
  children?: React.ReactNode
} & TItemColumn &
  TStylesProps

export type TGridProps = TGridContainerProps | TGridItemProps
