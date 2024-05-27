import { Text } from '@peiko/components/Text'

interface IInfoCellProps {
  title: string | number
}

export const InfoCell = ({ title }: IInfoCellProps): JSX.Element => (
  <Text variant="f8" styles={{ lineHeight: '22px' }}>
    {title}
  </Text>
)
