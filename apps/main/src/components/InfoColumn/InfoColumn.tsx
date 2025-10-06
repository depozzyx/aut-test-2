import { Text } from '@peiko/components/Text'
import { TStyle } from '@peiko/styles'

interface IInfoColumnProps {
  title: string | number
  tooltipText?: string
  styles?: TStyle
}

export const InfoColumn = ({
  title,
  tooltipText,
  styles,
}: IInfoColumnProps): JSX.Element => (
  <Text
    showTooltip={!!tooltipText}
    tooltipText={tooltipText}
    variant="f8"
    styles={{ width: '100%', lineHeight: '22px', ...styles }}
  >
    {title}
  </Text>
)
