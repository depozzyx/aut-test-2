import React, { forwardRef, useCallback, useRef } from 'react'
import { mergeRefs } from 'react-merge-refs'
import { NextLink } from '@peiko/components/links/NextLink'
import { Loader } from '@peiko/components/loaders/Loader'
import * as S from './BaseIconButton.styles'
import { TIconButton } from '../types'

export const BaseIconButton = forwardRef<
  HTMLButtonElement | HTMLAnchorElement,
  TIconButton
>(({ isLoading, type = 'button', children, link, externalLink, ...props }, ref) => {
  const buttonRef = useRef<HTMLButtonElement | HTMLAnchorElement | null>(null)

  const setBlure = useCallback(() => {
    if (!buttonRef.current) return
    buttonRef.current.blur()
  }, [])

  const Tag = link || externalLink ? 'a' : 'button'

  const Component = (
    <S.Button
      as={Tag}
      disabled={props.disabled}
      type={type}
      onMouseLeave={setBlure}
      isLoading={isLoading}
      ref={mergeRefs([buttonRef, ref])}
      tabIndex={props.active || props.disabled || isLoading ? -1 : 0}
      {...props}
    >
      {isLoading ? <Loader /> : <S.Buttonlabel>{children}</S.Buttonlabel>}
    </S.Button>
  )

  if (externalLink) {
    return React.cloneElement(Component, {
      ...externalLink,
    })
  }

  if (link) return <NextLink {...link}>{Component}</NextLink>

  return Component
})

BaseIconButton.displayName = 'BaseIconButton'
