import { useRedux } from '@/hooks/use-redux'
import { Select } from '@peiko/components/inputs/Select/Select'
import React, { FC } from 'react'
import { createStructuredSelector } from 'reselect'
import { shallowEqual } from 'react-redux'
import useTranslation from 'next-translate/useTranslation'
import { TSelectProps } from '@peiko/components/inputs/Select/types'
import { setSelectedId, selectCampaignsNames } from '@/features/campaigns/store/campaigns'

export const CampaignsSelect: FC<
  Omit<TSelectProps, 'name' | 'onChange' | 'value' | 'menuContent'>
> = (props) => {
  const { select, dispatch } = useRedux()
  const { t } = useTranslation('campaigns')

  const { campaignsNames } = select(
    createStructuredSelector({
      campaignsNames: selectCampaignsNames,
    }),
    shallowEqual,
  )

  const handleOnChange = (id: number | string) => {
    dispatch(setSelectedId(id))
  }

  return (
    <Select
      name="active-campaign"
      options={campaignsNames}
      onChange={(data) => {
        if (data) handleOnChange(data.value)
      }}
      placeholder={t('campaign-select-placeholder')}
      size="sm"
      width={156}
      {...props}
    />
  )
}
