import { useEffect, useRef } from 'react'
import isEqual from 'lodash/isEqual'
import { createStructuredSelector } from 'reselect'
import { shallowEqual } from 'react-redux'
import { useRedux } from '@/hooks/use-redux'
import {
  asyncGetCampaignLog,
  selectLogPagination,
  selectParams,
} from '../../store/campaign-log'

export function useFetchCampaignLogs(): undefined {
  const { dispatch, select } = useRedux()

  const { params, pagination } = select(
    createStructuredSelector({
      params: selectParams,
      pagination: selectLogPagination,
    }),
    shallowEqual,
  )

  const prevParamsRef = useRef(params)
  const prevPaginationRef = useRef(pagination)

  useEffect(() => {
    if (
      !isEqual(params, prevParamsRef.current) ||
      !isEqual(pagination, prevPaginationRef.current)
    ) {
      dispatch(asyncGetCampaignLog())
      prevParamsRef.current = params
      prevPaginationRef.current = pagination
    }
  }, [params, pagination])
}
