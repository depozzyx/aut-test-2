import { Text } from '@peiko/components/Text'

interface IInfoColumnProps {
  title: string | number
}

export const InfoColumn = ({ title }: IInfoColumnProps): JSX.Element => (
  <Text variant="f8" styles={{ lineHeight: '22px' }}>
    {title}
  </Text>
)
