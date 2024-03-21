import { LinkProps } from 'next/link'
import { TIconButtonProps } from '../buttons/types'

export type TPaginationData = {
  currentPage: number
  pagesBefore: number[]
  pagesAfter: number[]
  firstPage?: number
  dotsBefore?: boolean
  dotsAfter?: boolean
  lastPage?: number
}

export type TPaginationDataInput = {
  currentPage: number
  lastPage: number
  config: {
    before: number
    after: number
    first: boolean
    last: boolean
    dotsBefore: boolean
    dotsAfter: boolean
  }
}

export type TPagination = {
  /** When `ssr` is `true`, pagination will enable `SSR` mode
   *
   * In `SSR` mode, pagination will render as next links
   *
   * In `SSR` mode when page changed, `?page={currentPage}` will be added to url
   * @default false
   * @type boolean
   * @info SSR = Server Side Rendering
   */
  ssr?: boolean
  /** when `getLinkTo` function is provided, pagination will enable `controlled` mode
   *
   * `getLinkTo` function allow you to customize the link to each page
   * @default undefined
   *
   *
   * @type (page: number) => string
   */
  getLinkTo?: (page: number) => string
  /** Next link props applied to all links
   *
   * [Link docs](https://nextjs.org/docs/api-reference/next/link)
   */
  nextLinkProps?: Omit<LinkProps, 'href'>
  /** The size of the buttons
   * @default 'm'
   * @type 's' | 'm' | 'l'
   */
  size?: TIconButtonProps['size']
  /** Current page number for controlled pagination
   * @type number
   */
  currentPage?: number
  /** Last page number
   * @type number
   */
  lastPage: number
  /** when mobile is enabled, max pages to show is 5
   * @default false
   * @type boolean
   */
  mobile?: boolean
  /** when `true`, pagination will be disabled
   * @default false
   * @type boolean
   */
  disabled?: boolean
  /** onChange callback
   * @type (page: number) => void
   */
  onChange?: (page: number) => void
}

export type TPaginationButton = {
  page?: number
  arrowDirection?: 'left' | 'right'
}
