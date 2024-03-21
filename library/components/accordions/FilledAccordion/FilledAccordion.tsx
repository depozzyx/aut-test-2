import { Collapse as ReactCollapse } from 'react-collapse'
import { useOpen, TAccordionProps } from '@peiko/components/accordions'
import { Container, Header, Collapse } from './FilledAccordion.styles'

export const FilledAccordion: React.FC<TAccordionProps> = ({
  header,
  children,
  defaultOpen = false,
  disabled,
  ...props
}) => {
  const { isOpen, handleClick, ref, setBlure } = useOpen(defaultOpen)

  const isOpened = isOpen && !disabled

  return (
    <Container
      isOpen={isOpened}
      disabled={disabled}
      {...props}
      onClick={handleClick}
      tabIndex={disabled ? -1 : 0}
      onMouseLeave={setBlure}
      ref={ref}
    >
      <Header>{header({ isOpen: isOpened })}</Header>
      <Collapse>
        <ReactCollapse theme={{ collapse: 'collapse' }} isOpened={isOpened}>
          {children}
        </ReactCollapse>
      </Collapse>
    </Container>
  )
}
