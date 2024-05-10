import { Flex } from '@/components/Flex'
import { PikedFilter } from '@/components/piked-filters/PikedFilter'
import { OutlinedButton } from '@peiko/components/buttons/OutlinedButton'
import React, { FC } from 'react'
import { useRedux } from '@/hooks/use-redux'
import useTranslation from 'next-translate/useTranslation'
import { TFilters, useFilters } from '../../hooks/useFilters'
import { deleteFilter, resetFilters, selectFilters } from '../../store/activity-log'

export const SelectedFilters: FC<Pick<TFilters, 'managers'>> = ({ managers }) => {
  const { t } = useTranslation('activity-log')
  const { actionTypes, orderBy } = useFilters()
  const { select, dispatch } = useRedux()

  const filters = select(selectFilters)

  const deleteSelectedFilter = (filterName: keyof typeof filters) =>
    dispatch(deleteFilter(filterName))

  return (
    <Flex
      gap="48px"
      align="center"
      styles={{
        display: Object.keys(filters).length === 0 ? 'none' : 'flex',
        marginTop: '24px',
      }}
    >
      {(filters.entityAction || filters.entityType || filters.userId) && (
        <Flex gap="16px" align="center">
          {filters.entityAction && (
            <PikedFilter onClose={() => deleteSelectedFilter('entityAction')}>
              {actionTypes.find(({ value }) => filters.entityAction === value)?.label}
            </PikedFilter>
          )}
          {filters.orderBy && (
            <PikedFilter onClose={() => deleteSelectedFilter('orderBy')}>
              {orderBy.find(({ value }) => filters.orderBy === value)?.label}
            </PikedFilter>
          )}
          {filters.userId && (
            <PikedFilter onClose={() => deleteSelectedFilter('userId')}>
              {managers.find(({ value }) => filters.userId === value)?.label}
            </PikedFilter>
          )}
        </Flex>
      )}
      <OutlinedButton size="s" onClick={() => dispatch(resetFilters())}>
        {t('filters.reset')}
      </OutlinedButton>
    </Flex>
  )
}
