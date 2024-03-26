import React from 'react'
import { TStylesProps, TMediaQueries } from '@peiko/styles'
import { DefaultTheme } from 'styled-components'
import { TAvatarProps } from '../Avatar/types'

export type TAvatarGroupProps = {
  /**
   * The array of Avatar objects.
   */
  avatars: TAvatarProps[]
  /**
   * The total number of avatars. Used for calculating the number of extra avatars.
   */
  total: number
  /**
   * The size of the avatar in pixels.
   *
   * Could set different sizes for different breakpoints.
   */
  avatarSize?: number | TMediaQueries<number>
  /**
   * The max avatars to show.
   * @default 5
   */
  max?: number
  /**
   * custom renderer of extraAvatars
   * @param {number} surplus number of extra avatars
   * @returns {React.ReactNode} custom element to display
   */
  renderSurplus?: (surplus: number) => React.ReactNode
  /**
   * Spacing between avatars.
   * @default 'medium'
   */
  spacing?: number | TMediaQueries<number>
  /**
   * The background color for the default avatar.
   * @default 'main10'
   */
  defaultAvatarBg?: keyof DefaultTheme['palette']
} & TStylesProps
