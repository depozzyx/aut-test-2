import React from 'react'
import { Collapse as ReactCollapse } from 'react-collapse'
import { useOpen, TAccordionProps } from '@peiko/components/accordions'
import { Container, Header, Collapse } from './OutlinedAccordion.styles'

export const OutlinedAccordion: React.FC<TAccordionProps> = ({
  header,
  children,
  defaultOpen = false,
  disabled,
  containerStyles,
  headerStyles,
  ...props
}) => {
  const { isOpen, toggle, ref, setBlur } = useOpen(defaultOpen)

  const isOpened = isOpen && !disabled

  return (
    <Container
      isOpen={isOpened}
      disabled={disabled}
      onMouseLeave={setBlur}
      tabIndex={disabled ? -1 : 0}
      {...props}
      containerStyles={containerStyles && containerStyles({ isOpen: isOpened })}
    >
      <Header ref={ref} onClick={toggle} headerStyles={headerStyles}>
        {header({ isOpen: isOpened })}
      </Header>
      <Collapse>
        <ReactCollapse theme={{ collapse: 'collapse' }} isOpened={isOpened}>
          {children}
        </ReactCollapse>
      </Collapse>
    </Container>
  )
}
