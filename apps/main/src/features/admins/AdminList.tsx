import { useCallback } from 'react'
import useTranslation from 'next-translate/useTranslation'
import { useUnmount } from 'react-use'
import dynamic from 'next/dynamic'
import { shallowEqual } from 'react-redux'

import { useRedux } from '@/hooks/use-redux'
import { Flex } from '@/components/Flex'
import { FilledButton } from '@peiko/components/buttons/FilledButton'
import { PlusIcon } from '@peiko/components/icons/PlusIcon'
import { Pagination } from '@peiko/components/Pagination'
import { useModals } from '@/features/common/modals/hooks/use-modals'
import { MODAL_NAMES } from '@/features/common/modals/constants'
import { SingleValue } from 'react-select'
import { TSelectOption } from '@/components/MutliSelect/types'
import { LimitSelect } from '@/components/limit-select'
import { AdminListTable } from './containers/AdminListTable'
import { reset, selectPagination, setPagination } from './store/admins'

const EditAdminModal = dynamic(
  () => import('./containers/EditAdminModal').then((mod) => mod.EditAdminModal),
  {
    ssr: false,
  },
)

const CreateNewAdminModal = dynamic(
  () => import('./containers/CreateNewAdminModal').then((mod) => mod.CreateNewAdminModal),
  {
    ssr: false,
  },
)

const DeleteAdminModal = dynamic(
  () => import('./containers/DeleteAdminModal').then((mod) => mod.DeleteAdminModal),
  {
    ssr: false,
  },
)

export const AdminsList = (): JSX.Element => {
  const { t } = useTranslation('admins')
  const { select, dispatch } = useRedux()
  const { setModal } = useModals()

  const { total, page, limit } = select(selectPagination, shallowEqual)

  const addAdmin = () => {
    setModal({ modalName: MODAL_NAMES.CREATE_ADMIN, isOpen: true })
  }

  const handleChangePage = useCallback(
    (newPage) => {
      dispatch(
        setPagination({
          page: newPage,
          limit: limit ?? 10,
          total,
        }),
      )
    },
    [limit, page, total],
  )

  const changeLimit = (option: SingleValue<TSelectOption>) =>
    option &&
    dispatch(
      setPagination({
        page,
        limit: +option.value,
        total,
      }),
    )

  useUnmount(() => {
    dispatch(reset())
  })

  return (
    <>
      <Flex width="100%" height="100%" direction="column" padding="16px 0 0 0">
        <Flex width="100%" justify="flex-end" align="center" gap="16px">
          <LimitSelect limit={limit} onChange={changeLimit} />
          <FilledButton
            size="m"
            maxWidth="236px"
            width="100%"
            startIcon={<PlusIcon width="24px" height="24px" color="main22" />}
            onClick={addAdmin}
          >
            {t('add-admin')}
          </FilledButton>
        </Flex>
        <Flex justify="center" width="100%" padding="8px 0 0 0">
          <AdminListTable />
        </Flex>
        <Flex justify="center" align="center" width="100%" margin="40px 0 0 0">
          <Pagination
            lastPage={total === 0 ? 1 : Math.ceil(total / (limit ?? 10))}
            currentPage={page}
            onChange={handleChangePage}
          />
        </Flex>
      </Flex>
      <EditAdminModal />
      <CreateNewAdminModal />
      <DeleteAdminModal />
    </>
  )
}
