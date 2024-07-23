import React, { useCallback, useRef } from 'react'
import { mergeRefs } from 'react-merge-refs'

type TExternalLinkProps = {
  tabIndex?: number
  href: React.AnchorHTMLAttributes<HTMLAnchorElement>['href']
} & React.AnchorHTMLAttributes<HTMLAnchorElement>

export const ExternalLink = React.forwardRef<HTMLAnchorElement, TExternalLinkProps>(
  ({ onClick, tabIndex, onKeyPress, children, ...props }, ref) => {
    const anchorRef = useRef<HTMLAnchorElement | null>(null)

    const setBlur = useCallback(() => {
      if (!anchorRef.current) return
      anchorRef.current.blur()
    }, [])

    const { href } = props

    if (!href) return null

    return (
      <a
        target="_blank"
        tabIndex={tabIndex}
        rel="noopener noreferrer nofollow"
        onMouseLeave={setBlur}
        onClick={onClick}
        onKeyPress={onKeyPress}
        role="link"
        ref={mergeRefs([anchorRef, ref])}
        {...props}
      >
        {children}
      </a>
    )
  },
)

ExternalLink.displayName = 'ExternalLink'
