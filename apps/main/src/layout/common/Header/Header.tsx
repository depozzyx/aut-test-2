import { useHeaderHeight } from '@/layout/common/hooks/use-header-height'
import * as S from './Header.styles'

export const Header: React.FC = () => {
  const { headerRef } = useHeaderHeight()

  return (
    <>
      <S.Header ref={headerRef} />
    </>
  )
}
