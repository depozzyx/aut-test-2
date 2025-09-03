import { useEffect } from 'react'
import useTranslation from 'next-translate/useTranslation'
import { createStructuredSelector } from 'reselect'
import { shallowEqual } from 'react-redux'
import { useUnmount } from 'react-use'
import dynamic from 'next/dynamic'

import { FilledButton } from '@peiko/components/buttons/FilledButton'
import { PlusIcon } from '@peiko/components/icons/PlusIcon'
import { Pagination } from '@peiko/components/Pagination'
import { useRedux } from '@/hooks/use-redux'
import { FeaturePermission } from '@/features/common/permissions/FeaturePermissions'
import { EPermissions, ERoles } from '@/constants/profile'
import { useModals } from '@/features/common/modals/hooks/use-modals'
import { MODAL_NAMES } from '@/features/common/modals/constants'
import { LimitSelect } from '@/components/limit-select'
import { Flex } from '@/components/Flex'
import { SingleValue } from 'react-select'
import { TSelectOption } from '@/components/MutliSelect/types'
import {
  Container,
  Panel,
  TableContainer,
  PaginationContainer,
} from './styles/UserList.styled'
import {
  selectUsersPagination,
  asyncGetUsersList,
  selectStatusFilter,
  reset,
  selectOrderBy,
  selectOrder,
  setPagination,
  selectSearchTerm,
} from './store/users'
import { UserSearchField } from './components/UserSearchField'
import { UsersListTable } from './containers/tables/AgentsListTable'
import { TUserRowKeys } from './containers/tables/AgentsListTable/UsersListTable'
import { roleUserTranslationKey } from './constants'
import { TUserPermissions } from '../../types/permissions'

const DeleteUserModal = dynamic(
  () => import('./containers/modals/DeleteUserModal').then((mod) => mod.DeleteUserModal),
  {
    ssr: false,
  },
)

const EditUserModal = dynamic(
  () => import('./containers/modals/EditUserModal').then((mod) => mod.EditUserModal),
  {
    ssr: false,
  },
)

const CampaignInfoModal = dynamic(
  () =>
    import('./containers/modals/CampaignInfoModal').then((mod) => mod.CampaignInfoModal),
  {
    ssr: false,
  },
)

const CreateNewUserModal = dynamic(
  () =>
    import('./containers/modals/CreateNewUserModal').then(
      (mod) => mod.CreateNewUserModal,
    ),
  {
    ssr: false,
  },
)

const createPermissions: {
  [key in ERoles.AGENT | ERoles.MANAGER | ERoles.ADMIN]: TUserPermissions
} = {
  [ERoles.AGENT]: EPermissions.CREATE_AGENT as TUserPermissions,
  [ERoles.MANAGER]: EPermissions.CREATE_MANAGER as TUserPermissions,
  [ERoles.ADMIN]: EPermissions.CREATE_AGENT as TUserPermissions,
}

export const UsersList = ({
  role,
  columns,
}: {
  role: ERoles.AGENT | ERoles.MANAGER | ERoles.ADMIN
  columns?: TUserRowKeys[]
}): JSX.Element => {
  const { t } = useTranslation(roleUserTranslationKey[role])
  const { select, dispatch } = useRedux()
  const { setModal } = useModals()

  const {
    pagination: { total, page, limit },
    orderBy,
    order,
    statusFilter,
    nameFilter,
  } = select(
    createStructuredSelector({
      pagination: selectUsersPagination,
      orderBy: selectOrderBy,
      order: selectOrder,
      statusFilter: selectStatusFilter,
      nameFilter: selectSearchTerm,
    }),
    shallowEqual,
  )

  const openCreateNewUserModal = () => {
    setModal({ modalName: MODAL_NAMES.CREATE_USER, isOpen: true })
  }

  const fetchUsersList = (newPage?: number) => {
    dispatch(
      asyncGetUsersList(role, {
        page: newPage || 1,
        limit: limit ?? 10,
        orderBy,
        order,
        workStatus: statusFilter,
        search: nameFilter,
      }),
    )
  }

  useEffect(() => {
    fetchUsersList(page)
  }, [limit, orderBy, order])

  useEffect(() => {
    fetchUsersList(1)
  }, [statusFilter, nameFilter])

  const handleChangePage = (newPage: number) => fetchUsersList(newPage)

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
      <Container>
        <Panel>
          <Flex width="100%" justify="space-between" align="center" gap="16px">
            <Flex width="100%" justify="space-between" align="center" gap="16px">
              <UserSearchField />
              <LimitSelect limit={limit} onChange={changeLimit} />
            </Flex>
            <FeaturePermission permissions={[createPermissions[role]]}>
              <FilledButton
                size="m"
                maxWidth="236px"
                width="100%"
                startIcon={<PlusIcon width="24px" height="24px" color="main22" />}
                onClick={openCreateNewUserModal}
              >
                {t('add-user')}
              </FilledButton>
            </FeaturePermission>
          </Flex>
        </Panel>
        <TableContainer>
          <UsersListTable role={role} columns={columns} />
        </TableContainer>
        <PaginationContainer>
          <Pagination
            lastPage={total === 0 ? 1 : Math.ceil(total / (limit ?? 10))}
            currentPage={page}
            onChange={handleChangePage}
          />
        </PaginationContainer>
      </Container>
      <DeleteUserModal role={role} />
      <EditUserModal role={role} />
      <CampaignInfoModal />
      <CreateNewUserModal role={role} />
    </>
  )
}
