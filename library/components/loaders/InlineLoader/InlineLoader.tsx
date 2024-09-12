import BarLoader from 'react-spinners/BarLoader'
import * as S from './InlineLoader.styles'
import { TInlineLoader } from './types'

export const InlineLoader: React.FC<TInlineLoader> = ({
  loading,
  height = 4,
  variant = 'default',
  ...props
}) => {
  if (!loading && variant === 'default') return null

  return (
    <S.Container height={height} {...props}>
      <BarLoader loading={loading} width="100%" height="100%" />
    </S.Container>
  )
}
