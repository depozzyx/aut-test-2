import { useCallback, useState } from 'react'
import useSWR from 'swr'
import { useRedux } from '@/hooks/use-redux'
import { handleRestError } from '@/features/common/error'
import { TPagination } from '@/types/entities/pagination'

import { apiLeadList } from '../../../api/rest/lead-list'
import { TLeadListCatalog, TLeadListsReq } from '../../../api/rest/lead-list/types'

export type TLeadListOption = {
  label: string
  value: string | number
}

type TReturn = {
  options: TLeadListOption[]
  pagination: TPagination
  loadMoreLeadLists: () => void
}

export const useLeadListFilter = (): TReturn => {
  const { dispatch } = useRedux()
  const [options, setOptions] = useState<TLeadListOption[]>([{ label: '-', value: '' }])
  const [pagination, setPagination] = useState<TPagination>({
    page: 1,
    limit: 10,
    total: 1,
  })

  const fetcher = (params: TLeadListsReq) =>
    apiLeadList.getLeadListCatalog(params).then((res) => res.data)

  useSWR(
    [pagination.page, pagination.limit],
    () =>
      fetcher({
        page: pagination.page,
        limit: pagination.limit,
      }),
    {
      revalidateOnFocus: false,
      onSuccess: (data) => {
        const formattedData = data.data.map((leadList: TLeadListCatalog) => ({
          label: leadList.name,
          value: leadList.id,
        }))
        setOptions((prev) => [...prev, ...formattedData])
        setPagination(data.pagination)
      },
      onError: (e) => handleRestError({ e, dispatch }),
    },
  )

  const loadMoreLeadLists = useCallback(() => {
    const nextPage = pagination.page + 1
    const lastPage = Math.ceil(pagination.total / (pagination.limit ?? 10))
    if (pagination.page < lastPage) {
      setPagination((prev) => ({ ...prev, page: nextPage }))
    }
  }, [pagination])

  return { options, pagination, loadMoreLeadLists }
}
