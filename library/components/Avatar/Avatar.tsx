import Image from 'next/image'
import { TAvatarProps } from './types'
import { Container } from './Avatar.styles'

export const Avatar: React.FC<TAvatarProps> = ({
  src,
  alt,
  children,
  size = 40,
  bgColor = 'main2',
  borderRadius = '50%',
  onClick,
  styles,
}) => {
  const Component = src ? (
    <Image alt={alt} src={src} layout="fill" objectFit="cover" />
  ) : (
    children
  )

  return (
    <Container
      size={size}
      bgColor={bgColor}
      borderRadius={borderRadius}
      styles={styles}
      src={src}
      onClick={onClick}
      onKeyPress={onClick}
      tabIndex={onClick && 0}
      aria-label={alt}
      role={onClick && 'button'}
    >
      {Component}
    </Container>
  )
}
