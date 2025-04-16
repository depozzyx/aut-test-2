import React from 'react'
import { Text } from '../../Text'

type Props = {
  text: string
  isLoading: boolean
}
export const EmptyComponent: React.FC<Props> = ({ text, isLoading }: Props) => (
  <div
    style={{
      justifyItems: 'center',
      alignItems: 'center',
      flex: 4,
      marginTop: '4px',
    }}
  >
    {!isLoading && (
      <Text variant="f5" color="main4">
        {text}
      </Text>
    )}
  </div>
)
