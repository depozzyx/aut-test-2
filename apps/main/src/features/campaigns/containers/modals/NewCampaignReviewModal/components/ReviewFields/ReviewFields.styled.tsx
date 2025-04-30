import styled from 'styled-components'
import { Flex } from '@/components/Flex'
import { Text } from '@peiko/components/Text'

const FieldWrapper = styled(Flex)`
  //height: 48px;
  border-bottom: 1px solid ${({ theme }) => theme.palette.main21};
`

export const Field = ({
  label,
  value,
  fullHeight,
}: {
  label: string
  value: string | unknown
  fullHeight?: boolean
}): JSX.Element => (
  <FieldWrapper direction="column" gap={8} height={fullHeight ? '100%' : '48px'}>
    <Text variant="f8" color="main22">
      {label}
    </Text>
    <Text variant="f6" color="main5" styles={{ fontWeight: 500 }}>
      {value}
    </Text>
  </FieldWrapper>
)
