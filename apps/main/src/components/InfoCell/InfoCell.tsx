import { Text } from '@peiko/components/Text'

interface IInfoCellProps {
  title: string | number
  highlightZero?: boolean
}

export const InfoCell = ({ title, highlightZero }: IInfoCellProps): JSX.Element => (
  <Text
    variant="f8"
    styles={{ lineHeight: '22px' }}
    color={title === '0' && highlightZero ? 'main13' : undefined}
  >
    {title}
  </Text>
)
