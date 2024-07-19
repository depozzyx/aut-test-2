import { useCallback } from 'react'
import useTranslation from 'next-translate/useTranslation'
import { useRouter } from 'next/router'
import { useUnmount } from 'react-use'
import { shallowEqual } from 'react-redux'
import { useRedux } from '@/hooks/use-redux'
import { ROUTES } from '@/constants/routes'
import { Flex } from '@/components/Flex'
import { FilledButton } from '@peiko/components/buttons/FilledButton'
import { PlusIcon } from '@peiko/components/icons/PlusIcon'
import { Pagination } from '@peiko/components/Pagination'
import { ManagerListTable } from './containers/ManagerListTable'
import { reset, selectPagination, setPagination } from './store/managers'
import { EditManagerModal } from './containers/EditManagerModal'

export const ManagersList = (): JSX.Element => {
  const { t } = useTranslation('managers')
  const router = useRouter()
  const { select, dispatch } = useRedux()

  const { total, page, limit } = select(selectPagination, shallowEqual)

  const navigateToAddManager = () => {
    router.replace(ROUTES.CREATE_MANAGER)
  }

  const handleChangePage = useCallback((newPage) => {
    dispatch(
      setPagination({
        page: newPage,
        limit: limit ?? 8,
        total,
      }),
    )
  }, [])

  useUnmount(() => {
    dispatch(reset())
  })

  return (
    <>
      <Flex width="100%" height="100%" direction="column" padding="16px 0 0 0">
        <Flex width="100%" justify="flex-end">
          <FilledButton
            size="m"
            maxWidth="236px"
            width="100%"
            startIcon={<PlusIcon width="24px" height="24px" color="main22" />}
            onClick={navigateToAddManager}
          >
            {t('add-manager')}
          </FilledButton>
        </Flex>
        <Flex justify="center" width="100%" padding="8px 0 0 0">
          <ManagerListTable />
        </Flex>
        <Flex justify="center" align="center" width="100%" margin="40px 0 0 0">
          <Pagination
            lastPage={total === 0 ? 1 : Math.ceil(total / (limit ?? 8))}
            currentPage={page}
            onChange={handleChangePage}
          />
        </Flex>
      </Flex>
      <EditManagerModal />
    </>
  )
}
