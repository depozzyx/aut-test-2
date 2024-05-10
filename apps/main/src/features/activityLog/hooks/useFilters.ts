import { managerApi } from '@/api-rest/manager'
import { TManagersReq } from '@/api-rest/manager/types'
import { handleRestError } from '@/features/common/error'
import { useRedux } from '@/hooks/use-redux'
import { TEntityActions } from '@/types/activity-logs'
import { TOrderBy } from '@/types/entities/orderBy'
import { TPagination } from '@/types/entities/pagination'
import useTranslation from 'next-translate/useTranslation'
import { useState } from 'react'

type TValue<T = string> = {
  label: string
  value: T
}

export type TFilters = {
  actionTypes: TValue<TEntityActions>[]
  orderBy: TValue<TOrderBy>[]
  getManagers: (params: TManagersReq) => void
  managers: TValue[]
  managerPagination: TPagination
}

export const useFilters = (): TFilters => {
  const { t } = useTranslation('activity-log')
  const { dispatch } = useRedux()

  const [managers, setManagers] = useState<TValue[]>([])
  const [managerPagination, setManagerPagination] = useState<TPagination>({
    page: 1,
    limit: 15,
    total: 0,
  })

  const getManagers = async (params: TManagersReq) => {
    try {
      const {
        data: { data, pagination },
      } = await managerApi.getManagers(params)
      setManagers((prev) =>
        prev.concat(
          data.map((item) => ({
            label: item.username ? item.username : 'No name',
            value: item.id.toString(),
          })),
        ),
      )
      setManagerPagination(pagination)
    } catch (e) {
      handleRestError({ e, dispatch })
    }
  }

  const orderBy: TFilters['orderBy'] = [
    { label: t('filterNames.DESC'), value: 'DESC' },
    { label: t('filterNames.ASC'), value: 'ASC' },
  ]

  const actionTypes: TFilters['actionTypes'] = [
    { label: t('filterNames.create'), value: 'create' },
    { label: t('filterNames.update'), value: 'update' },
    { label: t('filterNames.delete'), value: 'delete' },
    { label: t('filterNames.campaign-start'), value: 'campaign-start' },
    { label: t('filterNames.campaign-stop'), value: 'campaign-stop' },
    { label: t('filterNames.export-activity-log'), value: 'export-activity-log' },
    { label: t('filterNames.create-api-key'), value: 'create-api-key' },
    { label: t('filterNames.delete-api-key'), value: 'delete-api-key' },
    { label: t('filterNames.import-lead'), value: 'import-lead' },
  ]

  return { actionTypes, orderBy, getManagers, managers, managerPagination }
}
