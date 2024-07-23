import { Collapse as ReactCollapse } from 'react-collapse'
import { useOpen, TAccordionProps } from '@peiko/components/accordions'
import { Container, Header, Collapse } from './FilledAccordion.styles'

export const FilledAccordion: React.FC<TAccordionProps> = ({
  header,
  children,
  defaultOpen = false,
  disabled,
  onOpen,
  headerStyles,
  containerStyles,
  collapseStyles,
  isOpen: propIsOpen,
  ...props
}) => {
  const { isOpen: stateIsOpen, toggle, ref, setBlur } = useOpen(defaultOpen)

  const isOpened = (propIsOpen !== undefined ? propIsOpen : stateIsOpen) && !disabled

  const onClick = () => {
    if (!disabled && onOpen) {
      onOpen({ isOpen: isOpened })
    }
    toggle()
  }

  return (
    <Container
      ref={ref}
      isOpen={isOpened}
      disabled={disabled}
      {...props}
      tabIndex={disabled ? -1 : 0}
      onClick={onClick}
      onMouseLeave={setBlur}
      containerStyles={containerStyles && containerStyles({ isOpen: isOpened })}
    >
      <Header headerStyles={headerStyles}>{header({ isOpen: isOpened })}</Header>
      <Collapse collapseStyles={collapseStyles}>
        <ReactCollapse theme={{ collapse: 'collapse' }} isOpened={isOpened}>
          {children}
        </ReactCollapse>
      </Collapse>
    </Container>
  )
}
