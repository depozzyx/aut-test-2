import { TLinearProgressProps } from './types'
import { Container, ProgressBar } from './LinearProgress.styles'

export const LinearProgress: React.FC<TLinearProgressProps> = ({
  progress,
  height = 4,
  color = 'main2',
  width,
  borderRadius,
}) => (
  <Container height={height} width={width} borderRadius={borderRadius}>
    <ProgressBar
      color={color}
      style={{
        width: `${progress}%`,
      }}
    />
  </Container>
)
