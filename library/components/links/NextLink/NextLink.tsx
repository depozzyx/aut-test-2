import Link, { LinkProps } from 'next/link'
import React from 'react'

export const NextLink: React.FC<LinkProps> = ({
  children,
  href,
  passHref = true,
  ...props
}) => (
  <>
    {href && (
      <Link href={href} passHref={passHref} {...props}>
        {children}
      </Link>
    )}
  </>
)
