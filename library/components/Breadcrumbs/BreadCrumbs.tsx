import React from 'react'
import { NextLink } from '@peiko/components/links/NextLink'
import { Container, Item, Dot, Wrapper, Divider } from './BreadCrumbs.styles'
import { TBreadCrumbsProps } from './types'

export const BreadCrumbs: React.FC<TBreadCrumbsProps> = ({
  list,
  divider = <Dot />,
  showed,
  maxItems,
}) => {
  const itemsLength = maxItems || list.length

  const listToRender = list.slice(0, itemsLength)

  return (
    <Container>
      {listToRender.map(({ label, href, active }, index, array) => {
        const isLastItem = index === array.length - 1

        if (active) {
          return (
            <Wrapper key={href} showed={showed} index={index}>
              <Item variant="f5" disabled>
                {label}
              </Item>
              {!isLastItem && <Divider>{divider}</Divider>}
            </Wrapper>
          )
        }

        return (
          <Wrapper key={href} showed={showed} index={index}>
            <NextLink href={href}>
              <Item color="main11" tag="a" variant="f5">
                {label}
              </Item>
            </NextLink>
            {!isLastItem && <Divider>{divider}</Divider>}
          </Wrapper>
        )
      })}
    </Container>
  )
}
