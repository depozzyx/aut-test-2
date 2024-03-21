import { Text } from '@peiko/components/Text'
import { BadgeContainer, Container } from './Badge.styles'
import { TBadgeProps } from './types'

export const Badge: React.FC<TBadgeProps> = ({
  color,
  count,
  maxCount = 99,
  positionLeft,
  positionBottom,
  positionRight,
  positionTop,
  children,
  styles,
}) => {
  const badgeContent = count && count > maxCount ? `${maxCount}+` : count
  return (
    <Container>
      {children}
      <BadgeContainer
        color={color}
        positionLeft={positionLeft}
        positionTop={positionTop}
        positionBottom={positionBottom}
        positionRight={positionRight}
        withNumbers={!!badgeContent || badgeContent === 0}
        styles={styles}
      >
        {badgeContent && <Text variant="f7">{badgeContent}</Text>}
      </BadgeContainer>
    </Container>
  )
}
