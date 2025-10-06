import { Text } from '@peiko/components/Text'

interface IInfoCellProps {
  title: string | number
  highlightZero?: boolean
  align?: 'left' | 'center' | 'right'
}

export const InfoCell = ({
  title,
  highlightZero,
  align = 'left',
}: IInfoCellProps): JSX.Element => (
  <Text
    variant="f8"
    styles={{ lineHeight: '22px', textAlign: align }}
    color={title === '0' && highlightZero ? 'main13' : undefined}
  >
    {title}
  </Text>
)
