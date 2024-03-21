import { TStyle } from './styles'

export type TDefaultBreakpoints<T = string> = {
  /**
   * Extra small devices (portrait phones)
   * @type T
   */
  xs: T
  /**
   * Small devices (landscape phones
   * @type T
   */
  sm: T
  /**
   * Medium devices (tablets)
   * @type T
   */
  md: T
  /**
   * Large devices (desktops)
   * @type T
   */
  lg: T
}

export type TDefaultMediaQueries<T = string> = TDefaultBreakpoints<T> & {
  /**
   * Utility function to target extra small devices (portrait phones)
   * @type T
   */
  xsDown: T
  /**
   * Utility function to target small devices (landscape phones)
   * @type T
   */
  smDown: T
  /**
   * Utility function to target medium devices (tablets)
   * @type T
   */
  mdDown: T
  /**
   * Utility function to target large devices (desktops)
   * @type T
   */
  lgDown: T
}

type TCustomMediaQueries<T = string> = {
  /**
   * Utility sdlkcslkdmcl
   * @type T
   */
  [key: `w${number}` | `w${number}Down`]: T
}

export type TMediaQueries<T = string> = Partial<TDefaultMediaQueries<T>> &
  TCustomMediaQueries<T>

export type TStylesProps = {
  /**
   * `styles` prop is used to add custom styles to the component.
   *
   * The benefit of using this prop is that you can use any css property if you need.
   *
   * But for complex customization better to use `styled` api from `styled-components`.
   *
   * In `styles` keys are camelCased css properties.
   *
   * Values are either css property values or functions that return css property values.
   *
   * Keys can also be `pseudo selectors`.
   *
   * Keys can also be `mediaqueries` from theme ('xs' | 'sm', 'smDown', etc) to apply styles for different screen sizes.
   *
   * This approach allows for a lot of flexibility and reusability
   *
   * In complex components you can use this prop to style only root component
   *
   * [See more about styles prop](http://examples.dev-page.site/examples/props/styles)
   */
  styles?: TStyle
}
