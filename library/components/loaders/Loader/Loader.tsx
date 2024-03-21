import { LoaderIcon } from '@peiko/components/icons/Loader'
import { Text } from '@peiko/components/Text'
import { TLoaderProps } from './types'
import { Wrapper, Container } from './Loader.styles'

export const Loader: React.FC<TLoaderProps> = ({
  top,
  left,
  position,
  label,
  labelPlacement = 'right',
  styles,
  ...iconProps
}) => (
  <Wrapper labelPlacement={labelPlacement} styles={styles}>
    <Container top={top} left={left} position={position}>
      <LoaderIcon {...iconProps} />
    </Container>
    {label && (
      <Text variant="f5" color="main11">
        {label}
      </Text>
    )}
  </Wrapper>
)
