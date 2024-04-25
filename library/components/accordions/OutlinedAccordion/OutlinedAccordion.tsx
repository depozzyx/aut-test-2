import React from 'react'
import { Collapse as ReactCollapse } from 'react-collapse'
import { useOpen, TAccordionProps } from '@peiko/components/accordions'
import { Container, Header, Collapse } from './OutlinedAccordion.styles'

export const OutlinedAccordion: React.FC<TAccordionProps> = ({
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
      onMouseLeave={setBlure}
      tabIndex={disabled ? -1 : 0}
      {...props}
    >
      <Header ref={ref} onClick={handleClick}>
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
