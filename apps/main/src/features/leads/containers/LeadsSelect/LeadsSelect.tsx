import { useRedux } from '@/hooks/use-redux'
import { Select } from '@peiko/components/inputs/Select/Select'
import React, { FC } from 'react'
import { createStructuredSelector } from 'reselect'
import { shallowEqual } from 'react-redux'
import { Flex } from '@/components/Flex'
import { Text } from '@peiko/components/Text'
import { PlusIcon } from '@peiko/components/icons/PlusIcon'
import useTranslation from 'next-translate/useTranslation'
import { TSelectProps } from '@peiko/components/inputs/Select/types'
import useModals from '@/features/common/modals/hooks/use-modals'
import { MODAL_NAMES } from '@/features/common/modals/constants'
import {
  getLeadsGroups,
  selectLeadsGroup,
  selectLeadsGroupError,
  selectLeadsGroupPagination,
  selectLeadsGroups,
  setLeadsGroup,
} from '../../store/leads'
import { Button } from './LeadsSelect.styled'

export const LeadsSelect: FC<
  Omit<TSelectProps, 'name' | 'onChange' | 'value' | 'menuContent'>
> = (props) => {
  const { select, dispatch } = useRedux()
  const { t } = useTranslation('leads-list')
  const { setModal } = useModals()

  const {
    leadsGroup,
    leadsGroups,
    error,
    pagination: { page, limit, total },
  } = select(
    createStructuredSelector({
      leadsGroup: selectLeadsGroup,
      leadsGroups: selectLeadsGroups,
      error: selectLeadsGroupError,
      pagination: selectLeadsGroupPagination,
    }),
    shallowEqual,
  )

  const onCreate = () => {
    setModal({ modalName: MODAL_NAMES.CREATE_LEADS_GROUP, isOpen: true })
  }

  const onMenuScrollToBottom = () => {
    const lastPage = total === 0 ? 1 : Math.ceil(total / (limit ?? 15))
    if (page < lastPage)
      dispatch(getLeadsGroups({ page: page + 1, limit, orderBy: 'ASC' }))
  }

  return (
    <Select
      name="leads-group"
      options={leadsGroups.map(({ id, name }) => ({ label: name, value: id.toString() }))}
      value={leadsGroup !== undefined ? leadsGroup.toString() : ''}
      error={error}
      onChange={(data) => {
        if (data) dispatch(setLeadsGroup(+data.value))
      }}
      onMenuScrollToBottom={onMenuScrollToBottom}
      placeholder={t('headers.select')}
      menuContent={{
        place: 'append',
        element: (
          <Button width="100%" onClick={onCreate}>
            <Flex
              padding="7px 16px"
              align="center"
              justify="space-between"
              cursor="pointer"
              width="100%"
            >
              <Text variant="f8">{t('headers.createNewList')}</Text>
              <PlusIcon width="24px" height="24px" />
            </Flex>
          </Button>
        ),
      }}
      {...props}
    />
  )
}
