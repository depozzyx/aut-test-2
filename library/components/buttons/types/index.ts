import { ButtonHTMLAttributes, FocusEvent, ReactNode } from 'react'
import { CSSProperties, DefaultTheme } from 'styled-components'
import { LinkProps } from 'next/link'
import { TStylesProps, TMediaQueries } from '@peiko/styles'

export type TSize = 's' | 'm' | 'ml' | 'l' | 'xl'

type TButtonSizeProps = {
  /** The size of the button */
  size?: TSize | TMediaQueries<TSize>
}

export type TButtonProps = TButtonSizeProps &
  TStylesProps & {
    children?: React.ReactNode
    onClick?: (event: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => void
    onBlur?: (e: FocusEvent<HTMLButtonElement | HTMLAnchorElement>) => void
    type?: ButtonHTMLAttributes<unknown>['type']
    isLoading?: boolean
    disabled?: boolean
    startIcon?: ReactNode | null
    endIcon?: React.ReactElement | null
    width?: CSSProperties['width']
    maxWidth?: CSSProperties['maxWidth']
    active?: boolean
    tabIndex?: number
  }

export type TIconButtonProps = Omit<
  TButtonProps,
  'startIcon' | 'endIcon' | 'width' | 'maxWidth'
> & {
  iconColor?: keyof DefaultTheme['palette']
}

type TLinkProps = {
  /**
   * This prop is used to pass next/link props to the component
   *
   * It is used to create links to other pages in the app
   *
   * Button renders as anchor tag when this prop is passed
   *
   * Next link api [Learn More](https://nextjs.org/docs/pages/api-reference/components/link)
   */
  link?: LinkProps
  /**
   * This prop is used to pass external link properties
   *
   * It is used to create links to external pages
   *
   * Button renders as anchor tag when this prop is passed
   *
   * AnchorHTMLAttributes [Learn More](https://use-form.netlify.app/interfaces/_node_modules__types_react_index_d_.react.anchorhtmlattributes.html)
   */
  externalLink?: React.AnchorHTMLAttributes<HTMLAnchorElement>
}

export type TButton = TButtonProps & TLinkProps

export type TIconButton = TIconButtonProps & TLinkProps
