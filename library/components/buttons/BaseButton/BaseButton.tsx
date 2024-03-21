import React, { useCallback, useRef } from 'react'
import { mergeRefs } from 'react-merge-refs'
import { LoaderIcon } from '@peiko/components/icons/Loader'
import { NextLink } from '@peiko/components/links/NextLink'
import { Loader } from '@peiko/components/loaders/Loader'
import * as S from './BaseButton.styles'
import { TButton } from '../types'

export const BaseButton = React.forwardRef<
  HTMLButtonElement | HTMLAnchorElement,
  TButton
>(
  (
    {
      children,
      onClick,
      isLoading,
      size = 'm',
      disabled = false,
      startIcon = null,
      endIcon = null,
      link,
      externalLink,
      ...props
    },
    ref,
  ) => {
    const buttonRef = useRef<HTMLButtonElement | HTMLAnchorElement | null>(null)

    const handleClick = (
      event: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>,
    ) => {
      if ((!isLoading || !disabled) && onClick) {
        onClick(event)
      }
    }

    const setBlure = useCallback(() => {
      if (!buttonRef.current) return
      buttonRef.current.blur()
    }, [])

    const renderStartIcon = () => (isLoading ? <LoaderIcon /> : startIcon)
    const renderEndIcon = () => (isLoading ? <LoaderIcon /> : endIcon)

    const Tag = link || externalLink ? 'a' : 'button'

    const ButtonComponent = (
      <S.Button
        as={Tag}
        size={size}
        onClick={handleClick}
        disabled={disabled}
        onMouseLeave={setBlure}
        isLoading={isLoading}
        ref={mergeRefs([buttonRef, ref])}
        tabIndex={disabled || isLoading ? -1 : 0}
        {...props}
      >
        <>
          {startIcon && !isLoading && renderStartIcon()}
          <S.Buttonlabel opacity={isLoading ? 0 : 1}>{children}</S.Buttonlabel>
          {endIcon && !isLoading && renderEndIcon()}
          {isLoading && (
            <S.LoaderCont>
              <Loader />
            </S.LoaderCont>
          )}
        </>
      </S.Button>
    )

    if (externalLink) {
      return React.cloneElement(ButtonComponent, {
        ...externalLink,
      })
    }

    if (link) return <NextLink {...link}>{ButtonComponent}</NextLink>

    return ButtonComponent
  },
)

BaseButton.displayName = 'Button'
