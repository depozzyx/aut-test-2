import { ReactNode } from 'react'
import { TMediaQueries } from '@peiko/styled'

type TBreadCrumb = {
  href: string
  label: string
  active?: boolean
}

export type TBreadCrumbsProps = {
  /**
   * List of breadcrumbs to show.
   * Each item should have href and label.
   * Active item should have active: true. That item will not be clickable.
   * @type {href: string; label: string; active?: boolean }[]
   */
  list: TBreadCrumb[]
  /**
   * The element that divide breadcrumbs.
   * @type ReactNode
   */
  divider?: ReactNode
  /**
   * List of breadcrumbs indexes to show.
   * Could set different indexes for different breakpoints.
   * @type number[] | { [breakpoint]: number[]} | undefined
   */
  showed?: number[] | TMediaQueries<number[]>
  /**
   * Set max amount of pages to show.
   * Useful for mobile devices.
   * @type number | undefined
   * @default undefined
   */
  maxItems?: number
}
