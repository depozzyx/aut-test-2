import useTranslation from 'next-translate/useTranslation'
import { TOrder } from '@/types/entities/order'
import { TSortBy, TEntityAction } from '@/api-rest/campaign-log/types'
import { ORDER } from '@/constants/order'

type TValue<T = string> = {
  label: string
  value: T
}

export type TFilters = {
  actionTypes: TValue<TEntityAction>[]
  orderBy: TValue<TSortBy>[]
  orders: TValue<TOrder>[]
}

export const useCampaignFilters = (): TFilters => {
  const { t } = useTranslation('activity-log')

  const orders: TFilters['orders'] = [
    { label: t('campaign.orderBy.DESC'), value: ORDER.DESC },
    { label: t('campaign.orderBy.ASC'), value: ORDER.ASC },
  ]

  const actionTypes: TFilters['actionTypes'] = [
    { label: t('campaign.campaignFilters.start'), value: 'start' },
    { label: t('campaign.campaignFilters.stop'), value: 'stop' },
    { label: t('campaign.campaignFilters.call-initiated'), value: 'call_initiated' },
    { label: t('campaign.campaignFilters.call-requeue'), value: 'call_requeue' },
  ]

  const orderBy: TFilters['orderBy'] = [
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

  return { actionTypes, orderBy, orders }
}
