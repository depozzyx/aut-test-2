import { TErrorText } from './types'
import * as S from './styled'

export const ErrorText: React.FC<TErrorText> = ({ children, ...props }) => {
  if (!children) return null

  return (
    <S.Text color="main7" variant="f7" tag="p" {...props}>
      {children}
    </S.Text>
  )
}
