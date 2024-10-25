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
  handleDisabledToggle,
  ...props
}) => {
  const { isOpen, toggle, ref, setBlur } = useOpen(defaultOpen)
  const handleToggle = () => {
    if (!disabled) {
      toggle()
    } else if (handleDisabledToggle) {
      handleDisabledToggle()
    }
  }
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
      <Header ref={ref} onClick={handleToggle} headerStyles={headerStyles}>
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
