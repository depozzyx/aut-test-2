import { useCallback, useState } from 'react'
import useSWR from 'swr'
import { useRedux } from '@/hooks/use-redux'
import { handleRestError } from '@/features/common/error'
import { TPagination } from '@/types/entities/pagination'

import { TSelectOption } from '@peiko/components/inputs/Select/types'
import { ERoles } from '../../../constants/profile'
import { apiUsers } from '../../../api/rest/users'
import { TUser, TUsersReq } from '../../../api/rest/users/types'

type TReturn = {
  options: TSelectOption[]
  pagination: TPagination
  loadMoreUsers: () => void
}

export const useUserFilter = (role: ERoles): TReturn => {
  const { dispatch } = useRedux()
  const [options, setOptions] = useState<TSelectOption[]>([{ label: '-', value: 0 }])
  const [pagination, setPagination] = useState<TPagination>({
    page: 1,
    limit: 10,
    total: 1,
  })

  const fetcher = (params: TUsersReq) =>
    apiUsers.getUsersList(role, params).then((res) => res.data)

  useSWR(
    [role, pagination.page, pagination.limit],
    () =>
      fetcher({
        page: pagination.page,
        limit: pagination.limit,
        showBlocked: true,
      }),
    {
      revalidateOnFocus: false,
      onSuccess: (data) => {
        const formattedData = data.data.map((user: TUser) => ({
          label: `${user.username} (${user.pbxName})`,
          value: user.id,
        }))
        setOptions((prev) => [...prev, ...formattedData])
        setPagination(data.pagination)
      },
      onError: (e) => handleRestError({ e, dispatch }),
    },
  )

  const loadMoreUsers = useCallback(() => {
    const nextPage = pagination.page + 1
    const lastPage = Math.ceil(pagination.total / (pagination.limit ?? 10))
    if (pagination.page < lastPage) {
      setPagination((prev) => ({ ...prev, page: nextPage }))
    }
  }, [pagination])

  return { options, pagination, loadMoreUsers }
}
