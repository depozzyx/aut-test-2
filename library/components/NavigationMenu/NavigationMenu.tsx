import React, { useState } from 'react'
import { Collapse } from 'react-collapse'
import { useRouter } from 'next/router'
import { ArrowIcon } from '@peiko/components/icons/Arrow'
import { Text } from '@peiko/components/Text'
import { NextLink } from '@peiko/components/links/NextLink'
import { TListItemProps, TListProps } from './types'
import {
  CollapseButton,
  CollapseContainer,
  Container,
  ItemContainer,
  MenuButton,
} from './NavigationMenu.styled'

// ListItem Component
const MenuItem: React.FC<TListItemProps> = ({
  isOpen,
  label,
  to,
  children,
  disabled,
  isChild = false,
}) => {
  const router = useRouter()

  const isOpenByRouter = () => {
    if (children) {
      return children.some((item) => item.to && router.pathname.includes(item.to))
    }
    return false
  }

  const isActive = () => {
    if (to) {
      if (to === '/') return router.pathname === to

      return router.pathname.includes(to)
    }
    return false
  }

  const [open, setOpen] = useState(Boolean(isOpen || isOpenByRouter()))

  const toogleCollapse = () => {
    setOpen((prev) => !prev)
  }

  const active = isActive()

  // If the item has a 'to' property, it's a link
  if (to) {
    return (
      <ItemContainer>
        <NextLink href={to}>
          <MenuButton
            as="a"
            tabIndex={0}
            isChild={isChild}
            isActive={active}
            disabled={disabled}
          >
            <Text color={active ? 'main2' : 'main8'}>{label}</Text>
          </MenuButton>
        </NextLink>
      </ItemContainer>
    )
  }

  if (!children) return null

  return (
    <ItemContainer>
      <CollapseButton onClick={toogleCollapse} disabled={disabled}>
        <Text>{label}</Text>
        <ArrowIcon direction={open ? 'down' : 'up'} />
      </CollapseButton>
      <CollapseContainer>
        <Collapse isOpened={open} theme={{ collapse: 'collapse' }}>
          {children.map((item) => (
            <MenuItem key={item.label} isChild {...item} />
          ))}
        </Collapse>
      </CollapseContainer>
    </ItemContainer>
  )
}

export const NavigationMenu: React.FC<TListProps> = ({ items }) => (
  <Container>
    {items.map((item) => (
      <MenuItem key={item.label} {...item} />
    ))}
  </Container>
)
