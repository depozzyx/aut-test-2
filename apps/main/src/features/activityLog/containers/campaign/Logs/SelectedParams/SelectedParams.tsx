import useTranslation from 'next-translate/useTranslation'
import { shallowEqual } from 'react-redux'
import { Flex } from '@/components/Flex'
import { PikedFilter } from '@/components/piked-filters/PikedFilter'
import { OutlinedButton } from '@peiko/components/buttons/OutlinedButton'
import { useRedux } from '@/hooks/use-redux'
import { setSearchTerm } from '@/features/campaigns/store/campaigns'
import { deleteParams, resetParams, selectParams } from '../../../../store/campaign-log'
import { useCampaignFilters } from '../../../../hooks/campaign/use-campaign-filters'

export const SelectedParams = (): JSX.Element => {
  const { t } = useTranslation('activity-log')
  const { actionTypes, orderBy, orders } = useCampaignFilters()
  const { select, dispatch } = useRedux()

  const filters = select(selectParams, shallowEqual)

  const deleteSelectedFilter = (filterName: keyof typeof filters) =>
    dispatch(deleteParams(filterName))

  const handleResetFilters = () => {
    dispatch(setSearchTerm(''))
    dispatch(resetParams())
  }

  return (
    <Flex
      gap="48px"
      align="center"
      styles={{
        display: Object.keys(filters).length === 0 ? 'none' : 'flex',
        marginTop: '24px',
      }}
    >
      {(filters.entityAction ||
        filters.entityType ||
        filters.orderBy ||
        filters.order) && (
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
          {filters.order && (
            <PikedFilter onClose={() => deleteSelectedFilter('order')}>
              {orders.find(({ value }) => filters.order === value)?.label}
            </PikedFilter>
          )}
        </Flex>
      )}
      <OutlinedButton size="s" onClick={handleResetFilters}>
        {t('filters.reset')}
      </OutlinedButton>
    </Flex>
  )
}
