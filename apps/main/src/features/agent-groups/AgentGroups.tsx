import React, { useCallback, useEffect, useMemo, useState } from 'react'
import useTranslation from 'next-translate/useTranslation'
import { createStructuredSelector } from 'reselect'
import { shallowEqual } from 'react-redux'
import { EmptyComponent, Table } from '@peiko/components/Table'
import { BodyCell } from '@peiko/components/Table/components/BodyCell'
import { HeaderCell } from '@peiko/components/Table/components/HeaderCell'
import { FilledButton } from '@peiko/components/buttons/FilledButton'
import { InfoColumn } from '@/components/InfoColumn'
import { useRedux } from '@/hooks/use-redux'
import { useModals } from '@/features/common/modals/hooks/use-modals'
import { MODAL_NAMES } from '@/features/common/modals/constants'
import { PlusIcon } from '@peiko/components/icons/PlusIcon'
import { TAgentGroup } from '@/api-rest/users/groups.types'
import { IconButton } from '@peiko/components/buttons/IconButton'
import { EditIcon } from '@peiko/components/icons/EditIcon'
import { TrashIcon } from '@peiko/components/icons/TrashIcon'
import { Pagination } from '@peiko/components/Pagination'
import { TAgent } from '@/api-rest/agents/types'
import { QuestionModal } from '@/features/common/QuestionModal'
import {
  Panel,
  TableContainer,
  PaginationContainer,
} from '@/features/agents/styles/AgentsList.styled'
import { SingleValue } from 'react-select'
import { Input } from '@peiko/components/inputs/Input'
import { CloseIcon } from '@peiko/components/icons/CloseIcon'
import { BaseButton } from '@peiko/components/buttons/BaseButton'
import {
  asyncFetchAgentGroups,
  deleteAgentGroup,
  selectAgentGroupsList,
  selectAgentGroupsLoading,
  selectAgentGroupsPagination,
  setPagination,
} from './store/agent-groups'
import { CreateAgentGroupModal } from './containers/modals/AgentGroupCreateModal'
import { EditAgentGroupModal } from './containers/modals/AgentGroupEditModal'
import { Flex } from '../../components/Flex'
import { LimitSelect } from '../../components/limit-select'
import { TSelectOption } from '../../components/MutliSelect/types'
import { SearchFieldIcon } from '../../components/icons/SearchFieldIcon'
import { Container } from '../users/styles/UserList.styled'

export const AgentGroups: React.FC = () => {
  const { t } = useTranslation('agents')
  const { select, dispatch } = useRedux()
  const { setModal, resetModals } = useModals()

  const {
    groups,
    isLoading,
    pagination: { total, page, limit },
  } = select(
    createStructuredSelector({
      groups: selectAgentGroupsList,
      isLoading: selectAgentGroupsLoading,
      pagination: selectAgentGroupsPagination,
    }),
    shallowEqual,
  )
  const [searchTerm, setSearchTerm] = useState<string>('')

  const fetchGroups = (newPage = page) => {
    dispatch(asyncFetchAgentGroups({ page: newPage, limit, name: searchTerm }))
  }

  useEffect(() => {
    fetchGroups(1)
  }, [dispatch, searchTerm, limit])

  const onChangePage = (page: number) => {
    fetchGroups(page)
  }

  const [currentGroup, setCurrentGroup] = useState<TAgentGroup | null>(null)

  const handleEditGroup = useCallback((group: TAgentGroup) => {
    setCurrentGroup(group)
    setModal({ modalName: MODAL_NAMES.EDIT_AGENT_GROUP, isOpen: true })
  }, [])

  const handleDeleteGroup = useCallback((group: TAgentGroup) => {
    setCurrentGroup(group)
    setModal({ modalName: MODAL_NAMES.QUESTION_MODAL, isOpen: true })
  }, [])

  const changeLimit = (option: SingleValue<TSelectOption>) => {
    if (!option) return
    dispatch(
      setPagination({
        page,
        limit: +(option.value ?? limit ?? 10),
        total,
      }),
    )
  }

  const clamp2Style = {
    overflow: 'hidden',
    display: '-webkit-box',
    WebkitLineClamp: 2,
    WebkitBoxOrient: 'vertical',
    overflowWrap: 'anywhere',
    whiteSpace: 'normal',
  } as const

  const rows = useMemo(
    () =>
      groups.map((g: TAgentGroup) => ({
        row: {
          name: <InfoColumn title={g.name} />,
          description: <InfoColumn title={g.description ?? ''} styles={clamp2Style} />,
          agents: (
            <InfoColumn
              title={g.agents?.map((u: TAgent) => u.username).join(', ') ?? ''}
              styles={clamp2Style}
            />
          ),
          edit: (
            <IconButton onClick={() => handleEditGroup(g)} iconColor="transparent">
              <EditIcon width="24px" height="24px" />
            </IconButton>
          ),
          delete: (
            <IconButton onClick={() => handleDeleteGroup(g)} iconColor="main13">
              <TrashIcon width="24px" height="24px" />
            </IconButton>
          ),
        },
      })),
    [groups, t, setModal],
  )

  const header = [
    { label: t('groups.headers.name'), value: 'name' },
    { label: t('groups.headers.description'), value: 'description' },
    { label: t('groups.headers.users'), value: 'agents' },
    { label: t('groups.headers.edit'), value: 'edit' },
    { label: t('groups.headers.delete'), value: 'delete' },
  ]

  return (
    <>
      <Container>
        <Panel>
          <Flex width="100%" justify="space-between" align="center" gap="16px">
            <Flex width="100%" justify="space-between" align="center" gap="16px">
              <Input
                value={searchTerm}
                width="100%"
                maxWidth="374px"
                size="xs"
                name="search-user"
                placeholder={t('groups.filters.placeholder.search-by-name')}
                startAdornment={<SearchFieldIcon />}
                startAdornmentStyles={{ paddingRight: '0 !important' }}
                endAdornment={
                  <BaseButton
                    onClick={() => setSearchTerm('')}
                    disabled={!searchTerm}
                    startIcon={<CloseIcon />}
                  />
                }
                endAdornmentStyles={{ paddingRight: '0 !important' }}
                onChange={setSearchTerm}
                debounce={600}
              />
              <LimitSelect limit={limit} onChange={changeLimit} />
            </Flex>
            <FilledButton
              maxWidth="180px"
              width="100%"
              startIcon={<PlusIcon width="24px" height="24px" color="main22" />}
              onClick={() =>
                setModal({ modalName: MODAL_NAMES.CREATE_AGENT_GROUP, isOpen: true })
              }
            >
              {t('create-group')}
            </FilledButton>
          </Flex>
        </Panel>
        <TableContainer>
          <Table
            loading={isLoading}
            headerData={header as any}
            rowsData={rows as any}
            bodyCell={(props) => <BodyCell {...props} whiteSpace="nowrap" />}
            headerCell={(props) => <HeaderCell {...props} whiteSpace="nowrap" />}
            emptyComponent={
              <EmptyComponent text={t('empty-data')} isLoading={isLoading} />
            }
          />
        </TableContainer>
        <PaginationContainer>
          <Pagination
            lastPage={total === 0 ? 1 : Math.ceil(total / (limit ?? 10))}
            currentPage={page}
            onChange={onChangePage}
          />
        </PaginationContainer>
      </Container>
      <CreateAgentGroupModal />
      <EditAgentGroupModal groupId={currentGroup?.id ?? 0} />
      <QuestionModal
        confirmHandler={() => {
          if (currentGroup) {
            dispatch(deleteAgentGroup(currentGroup.id))
          }
          resetModals()
        }}
        title={t('groups.delete.title', { name: currentGroup?.name })}
        confirmLabel={t('groups.delete.confirm')}
        cancelLabel={t('groups.delete.cancel')}
      />
    </>
  )
}
