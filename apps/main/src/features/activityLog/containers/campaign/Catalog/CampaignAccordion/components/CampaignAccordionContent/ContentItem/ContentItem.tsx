import { Flex } from '@/components/Flex'
import { Text } from '@peiko/components/Text'

type TProps = {
  icon: React.ReactElement
  value: string | number
}

export const ContentItem = ({ icon, value }: TProps): JSX.Element => (
  <Flex align="center" gap={8}>
    {icon}
    <Text variant="f10">{String(value)}</Text>
  </Flex>
)
