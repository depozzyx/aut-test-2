import React from 'react'
import type { TStylesProps, TMediaQueries } from '@peiko/styles'
import { TFonts } from '@peiko/styles'
import { DefaultTheme } from 'styled-components'

export type TText = {
  /**
   * The content of the component.
   *
   * @type React.ReactNode
   */
  children?: React.ReactNode
  /**
   * The html component used for the root node.
   *
   * @default p
   */
  tag?: keyof JSX.IntrinsicElements
  /**
   * The font variant of the component.
   *
   * @default f5
   */
  variant?: keyof TFonts | TMediaQueries<keyof TFonts>
  /**
   * The color of the component.
   *
   * You can specify the color of the component according to the theme palette.
   *
   * @default main8
   */
  color?: keyof DefaultTheme['palette']
  /**
   * The onClick handler of the component.
   *
   * @type () => void
   */
  onClick?: () => void
} & TStylesProps
