import { Text } from '@peiko/components/Text'

interface IInfoColumnProps {
  title: string | number
  tooltipText?: string
}

export const InfoColumn = ({ title, tooltipText }: IInfoColumnProps): JSX.Element => (
  <Text
    showTooltip={!!tooltipText}
    tooltipText={tooltipText}
    variant="f8"
    styles={{ lineHeight: '22px' }}
  >
    {title}
  </Text>
)
