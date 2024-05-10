import { TText, Text } from '@peiko/components/Text'
import React, { FC } from 'react'

export const CardTile: FC<TText> = ({ children, ...props }) => (
  <Text variant="f4" {...props} styles={{ marginBottom: '32px', ...props.styles }}>
    {children}
  </Text>
)
