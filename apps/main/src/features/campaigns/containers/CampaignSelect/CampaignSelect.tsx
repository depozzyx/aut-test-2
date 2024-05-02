import { useRedux } from '@/hooks/use-redux'
import { Select } from '@peiko/components/inputs/Select/Select'
import React, { FC } from 'react'
import { createStructuredSelector } from 'reselect'
import { shallowEqual } from 'react-redux'
import useTranslation from 'next-translate/useTranslation'
import { TSelectProps } from '@peiko/components/inputs/Select/types'
import {
  selectCampaignsNames,
  setFilterCampaignName,
} from '@/features/campaigns/store/campaigns'
import { TCampaignTableType } from '@/features/campaigns/types'

export const CampaignsSelect: FC<
  Omit<TSelectProps, 'name' | 'onChange' | 'value' | 'menuContent'> & {
    type: TCampaignTableType
  }
> = ({ type, ...props }) => {
  const { select, dispatch } = useRedux()
  const { t } = useTranslation('campaigns')

  const { campaignsNames } = select(
    createStructuredSelector({
      campaignsNames: selectCampaignsNames(type),
    }),
    shallowEqual,
  )

  const handleOnChange = (value: string | number) => {
    dispatch(setFilterCampaignName(value as string))
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
