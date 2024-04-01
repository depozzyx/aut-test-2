import { TStylesProps } from '@peiko/styles'

export type TContainer = {
  isOpen: boolean
}

export type TAccordion = TContainer & {
  handleClick: () => void
}

export type TAccordionProps = TStylesProps & {
  /**
   *
   * header is a function that returns JSX.Element
   *
   * Accordion pass two props to header function:
   *
   * open: boolean
   *
   * onClick: () => void
   */
  header: (props: TContainer) => JSX.Element
  /** set initial open state
   *
   * @default false
   */
  defaultOpen?: boolean
  disabled?: boolean
}
