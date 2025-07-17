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
import { userSelectors } from '@/features/common/user'
import { ManagerListTable } from './containers/ManagerListTable'
import { reset, selectPagination, setPagination } from './store/managers'
import { EPermissions } from '../../constants/profile'

const EditManagerModal = dynamic(
  () => import('./containers/EditManagerModal').then((mod) => mod.EditManagerModal),
  {
    ssr: false,
  },
)

const CreateNewManagerModal = dynamic(
  () =>
    import('./containers/CreateNewManagerModal').then((mod) => mod.CreateNewManagerModal),
  {
    ssr: false,
  },
)

const DeleteManagerModal = dynamic(
  () => import('./containers/DeleteManagerModal').then((mod) => mod.DeleteManagerModal),
  {
    ssr: false,
  },
)

export const ManagersList = (): JSX.Element => {
  const { t } = useTranslation('managers')
  const { select, dispatch } = useRedux()
  const { setModal } = useModals()
  const user = select(userSelectors.user)

  const { total, page, limit } = select(selectPagination, shallowEqual)

  const addManager = () => {
    setModal({ modalName: MODAL_NAMES.CREATE_MANAGER, isOpen: true })
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
          {user.user?.permissions.includes(EPermissions.CREATE_MANAGER) && (
            <FilledButton
              size="m"
              maxWidth="236px"
              width="100%"
              startIcon={<PlusIcon width="24px" height="24px" color="main22" />}
              onClick={addManager}
            >
              {t('add-manager')}
            </FilledButton>
          )}
        </Flex>
        <Flex justify="center" width="100%" padding="8px 0 0 0">
          <ManagerListTable />
        </Flex>
        <Flex justify="center" align="center" width="100%" margin="40px 0 0 0">
          <Pagination
            lastPage={total === 0 ? 1 : Math.ceil(total / (limit ?? 10))}
            currentPage={page}
            onChange={handleChangePage}
          />
        </Flex>
      </Flex>
      <EditManagerModal />
      <CreateNewManagerModal />
      <DeleteManagerModal />
    </>
  )
}
