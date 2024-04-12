import styled, { css } from 'styled-components'
import { Flex } from '@/components/Flex'
import { Text } from '@peiko/components/Text'

export const Field = styled((props) => (
  <Flex direction="column" gap={8}>
    <Text variant="f8" color="main22">
      {props.label}
    </Text>
    <Text variant="f6" color="main5" styles={{ fontWeight: 500 }}>
      {props.value}
    </Text>
  </Flex>
))(
  ({ theme }) => css`
    border-bottom: 1px solid ${theme.palette.main21};
  `,
)
