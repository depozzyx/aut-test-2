import { useRouter } from 'next/router'
import { ArrowIcon } from '@peiko/components/icons/Arrow'
import { FilledIconButton } from '@peiko/components/buttons/FilledIconButton'
import { TIconButton } from '@peiko/components/buttons/types'
import { getPaginationData } from './utils/get-pagination'
import { Container } from './Pagination.styles'
import { TPagination, TPaginationButton } from './types'
import { Dots } from './components/Dots'
import { PAGINATION_CONFIG_DESKTOP, PAGINATION_CONFIG_MOBILE } from './constants'
import { normalizePage } from './utils/normalize-page'

export const Pagination: React.FC<TPagination> = ({
  ssr = false,
  size = 'm',
  currentPage = 0,
  lastPage = 0,
  onChange,
  getLinkTo,
  mobile = false,
  disabled = false,
  nextLinkProps,
}) => {
  const router = useRouter()

  if (lastPage === 1) return null

  const currentSsrPage = Number(router.query.page) || 1

  const __currentPage = ssr ? currentSsrPage : normalizePage(currentPage)

  const paginationData = getPaginationData({
    currentPage: __currentPage,
    lastPage,
    config: mobile ? PAGINATION_CONFIG_MOBILE : PAGINATION_CONFIG_DESKTOP,
  })

  const renderButton = ({ page, arrowDirection }: TPaginationButton) => {
    const getButtonPage = () => {
      if (arrowDirection === 'left') return __currentPage - 1
      if (arrowDirection === 'right') return __currentPage + 1
      return page || 1
    }

    const buttonPage = getButtonPage()

    const isDisabled = () => {
      if (!arrowDirection) return false
      if (buttonPage < 1 || buttonPage > lastPage) return true

      return false
    }

    const hasDisabled = disabled || isDisabled()

    const active = page === __currentPage
    const tabIndex = active || hasDisabled ? -1 : 0

    const getLinkprops = (): TIconButton['link'] => {
      if (ssr) {
        return {
          href: {
            ...nextLinkProps,
            pathname: router.pathname,
            query: { ...router.query, page: buttonPage },
          },
        }
      }

      if (getLinkTo) {
        return {
          ...nextLinkProps,
          href: getLinkTo(buttonPage),
        }
      }
    }

    const link = buttonPage ? getLinkprops() : undefined

    if (arrowDirection) {
      return (
        <FilledIconButton
          size={size}
          key={`${page}${arrowDirection}`}
          onClick={() => onChange?.(Number(buttonPage))}
          disabled={hasDisabled}
          tabIndex={tabIndex}
          link={link}
        >
          <ArrowIcon
            color={hasDisabled ? 'main11' : 'main8'}
            direction={arrowDirection}
            transition="none"
          />
        </FilledIconButton>
      )
    }

    return (
      <FilledIconButton
        size={size}
        active={active}
        key={`${page}${arrowDirection}`}
        onClick={() => onChange?.(Number(buttonPage))}
        disabled={hasDisabled}
        tabIndex={tabIndex}
        link={link}
      >
        {buttonPage}
      </FilledIconButton>
    )
  }

  return (
    <Container>
      {renderButton({
        page: paginationData.firstPage,
        arrowDirection: 'left',
      })}

      {paginationData.firstPage && renderButton({ page: paginationData.firstPage })}

      {paginationData.dotsBefore && <Dots size={size} />}

      {paginationData.pagesBefore.map((item, index) =>
        renderButton({ page: paginationData.pagesBefore[index] }),
      )}

      {paginationData.currentPage && renderButton({ page: paginationData.currentPage })}

      {paginationData.pagesAfter.map((item, index) =>
        renderButton({ page: paginationData.pagesAfter[index] }),
      )}

      {paginationData.dotsAfter && <Dots size={size} />}

      {paginationData.lastPage && renderButton({ page: paginationData.lastPage })}

      {renderButton({
        page: paginationData.firstPage,
        arrowDirection: 'right',
      })}
    </Container>
  )
}
