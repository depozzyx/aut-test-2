import useTranslation from 'next-translate/useTranslation'
import { TOrderBy } from '@/types/entities/orderBy'
import { TSortBy, TEntityAction } from '@/api-rest/campaign-log/types'

type TValue<T = string> = {
  label: string
  value: T
}

export type TFilters = {
  actionTypes: TValue<TEntityAction>[]
  orderBy: TValue<TOrderBy>[]
  sortBy: TValue<TSortBy>[]
}

export const useCampaignFilters = (): TFilters => {
  const { t } = useTranslation('activity-log')

  const orderBy: TFilters['orderBy'] = [
    { label: t('campaign.orderBy.DESC'), value: 'DESC' },
    { label: t('campaign.orderBy.ASC'), value: 'ASC' },
  ]

  const actionTypes: TFilters['actionTypes'] = [
    { label: t('campaign.campaignFilters.start'), value: 'start' },
    { label: t('campaign.campaignFilters.stop'), value: 'stop' },
    { label: t('campaign.campaignFilters.call-initiated'), value: 'call_initiated' },
    { label: t('campaign.campaignFilters.call-requeue'), value: 'call_requeue' },
  ]

  const sortBy: TFilters['sortBy'] = [
    {
      label: t('campaign.campaignSorts.id'),
      value: 'id',
    },
    {
      label: t('campaign.campaignSorts.createdAt'),
      value: 'createdAt',
    },
    {
      label: t('campaign.campaignSorts.username'),
      value: 'username',
    },
    {
      label: t('campaign.campaignSorts.role'),
      value: 'role',
    },
    {
      label: t('campaign.campaignSorts.actionType'),
      value: 'actionType',
    },
  ]

  return { actionTypes, orderBy, sortBy }
}
