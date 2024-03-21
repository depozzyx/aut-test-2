/* eslint-disable i18next/no-literal-string */
import React from 'react'
import { Text } from '@peiko/components/Text'
import { Avatar } from '@peiko/components/Avatar'
import { TAvatarGroupProps } from './types'
import * as S from './AvatarGroup.styles'

export const AvatarGroup: React.FC<TAvatarGroupProps> = ({
  avatars,
  max = 5,
  renderSurplus,
  total,
  spacing = -10,
  avatarSize,
  defaultAvatarBg = 'main10',
}) => {
  let clampedMax = max < 2 ? 2 : max

  const totalAvatars = total || avatars.length

  if (totalAvatars === clampedMax) {
    clampedMax += 1
  }

  clampedMax = Math.min(totalAvatars + 1, clampedMax)

  const maxAvatars = Math.min(avatars.length, clampedMax - 1)
  const extraAvatars = Math.max(totalAvatars - clampedMax, totalAvatars - maxAvatars, 0)
  const defaultAvatarsElement = (
    <Text variant="f5" color="base">
      {total.toString().length > 3 ? `+${total?.toString()[0]}k` : `+${extraAvatars}`}
    </Text>
  )
  const extraAvatarsElement = renderSurplus
    ? renderSurplus(extraAvatars)
    : defaultAvatarsElement

  return (
    <S.Group spacing={spacing}>
      {extraAvatars ? (
        <Avatar bgColor={defaultAvatarBg} size={avatarSize}>
          {extraAvatarsElement}
        </Avatar>
      ) : null}
      {avatars
        .slice(0, max - 1)
        .reverse()
        .map((avatar) => (
          <Avatar key={avatar.alt} {...avatar} size={avatarSize} />
        ))}
    </S.Group>
  )
}
