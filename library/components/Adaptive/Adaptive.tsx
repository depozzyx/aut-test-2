import { FC } from 'react'
import { TAdaptive } from './types'
import * as S from './Adaptive.styles'

export const Adaptive: FC<TAdaptive> = ({ visible, children }) => (
  <S.Container visible={visible}>{children}</S.Container>
)
