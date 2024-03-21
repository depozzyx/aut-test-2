import { useHeaderHeight } from '@/layout/common/hooks/use-header-height'
import { AuthNavigation } from '@/features/auth/containers/AuthNavigation'
import * as S from './Header.styles'

export const Header: React.FC = () => {
  const { headerRef } = useHeaderHeight()

  return (
    <>
      <S.Header ref={headerRef}>
        <AuthNavigation />
      </S.Header>
    </>
  )
}
