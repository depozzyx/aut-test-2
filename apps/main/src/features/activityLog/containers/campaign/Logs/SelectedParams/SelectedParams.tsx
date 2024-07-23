import useTranslation from 'next-translate/useTranslation'
import { shallowEqual } from 'react-redux'
import { Flex } from '@/components/Flex'
import { PikedFilter } from '@/components/piked-filters/PikedFilter'
import { OutlinedButton } from '@peiko/components/buttons/OutlinedButton'
import { useRedux } from '@/hooks/use-redux'
import { deleteParams, resetParams, selectParams } from '../../../../store/campaign-log'
import { useCampaignFilters } from '../../../../hooks/campaign/use-campaign-filters'

export const SelectedParams = (): JSX.Element => {
  const { t } = useTranslation('activity-log')
  const { actionTypes, orderBy, sortBy } = useCampaignFilters()
  const { select, dispatch } = useRedux()

  const filters = select(selectParams, shallowEqual)

  const deleteSelectedFilter = (filterName: keyof typeof filters) =>
    dispatch(deleteParams(filterName))

  return (
    <Flex
      gap="48px"
      align="center"
      styles={{
        display: Object.keys(filters).length === 0 ? 'none' : 'flex',
        marginTop: '24px',
      }}
    >
      {(filters.entityAction || filters.entityType || filters.sortBy) && (
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
          {filters.sortBy && (
            <PikedFilter onClose={() => deleteSelectedFilter('sortBy')}>
              {sortBy.find(({ value }) => filters.sortBy === value)?.label}
            </PikedFilter>
          )}
        </Flex>
      )}
      <OutlinedButton size="s" onClick={() => dispatch(resetParams())}>
        {t('filters.reset')}
      </OutlinedButton>
    </Flex>
  )
}
