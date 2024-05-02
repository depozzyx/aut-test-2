import React, { FC } from 'react'
import { BaseIconButton } from '@peiko/components/buttons/BaseIconButton'
import { CloseIcon } from '@peiko/components/icons/CloseIcon'
import { Text } from '@peiko/components/Text'
import { Flex } from '../Flex'

export const PikedFilter: FC<{ onClose: () => void }> = ({ children, onClose }) => (
  <Flex
    align="center"
    gap="8px"
    styles={{
      border: '1px solid',
      borderColor: ({ palette }) => palette.main3,
      backgroundColor: ({ palette }) => palette.base4,
      padding: '6px 8px',
      borderRadius: '8px',
    }}
  >
    <Text variant="f8" color="main4">
      {children}
    </Text>
    <BaseIconButton onClick={onClose}>
      <CloseIcon color="main4" size="s" />
    </BaseIconButton>
  </Flex>
)
