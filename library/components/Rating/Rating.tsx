import { useState } from 'react'
import { TDefaultMediaQueries } from '@peiko/styles'
import { StarFillIcon } from '@peiko/components/icons/StarFillIcon'
import { StarIcon } from '@peiko/components/icons/StarIcon'
import { TRatingProps } from './types'
import { Container } from './Rating.styles'

export const Rating: React.FC<TRatingProps> = ({
  readonly = false,
  disabled = false,
  size = 24,
  styles,
  color = 'main2',
  allowFraction = false,
  initialValue = 3,
  numberOfStars = 5,
  emptyIcon = <StarIcon />,
  fillIcon = <StarFillIcon />,
  onChange,
}) => {
  const [rating, setRating] = useState(Math.min(initialValue, numberOfStars))

  const handleClick = (rate: number) => {
    setRating(rate)
    onChange?.(rate)
  }

  return (
    <Container
      readonly={readonly || disabled}
      disabled={disabled}
      allowHover
      allowFraction={allowFraction}
      iconsCount={numberOfStars}
      initialValue={rating}
      emptyIcon={emptyIcon}
      fillIcon={fillIcon}
      color={color}
      size={size as number | (number & Partial<TDefaultMediaQueries<number>>) | undefined}
      styles={styles}
      onClick={handleClick}
    />
  )
}
