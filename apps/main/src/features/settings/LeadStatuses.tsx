import { Card } from '@peiko/components/Card'
import useTranslation from 'next-translate/useTranslation'
import React, { FC, useEffect, useState } from 'react'

import { getLeadStatuses, selectLeadStatuses } from '@/features/leads/store/leads'
import { useRedux } from '@/hooks/use-redux'
import { FilledButton } from '@peiko/components/buttons/FilledButton/FilledButton'
import { TLeadStatusData } from '@/api-rest/leads/types'
import { LeadStatusRow } from '@/features/settings/components/LeadStatusRow/LeadStatusRow'
import { Flex } from '@/components/Flex'
import { PlusIcon } from '@peiko/components/icons/PlusIcon/PlusIcon'
import { CardTile } from './components/CardTile'

export const LeadStatuses: FC = () => {
  const { t } = useTranslation('settings')
  const { dispatch, select } = useRedux()
  const leadStatuses = select(selectLeadStatuses)

  useEffect(() => {
    dispatch(getLeadStatuses())
  }, [dispatch])

  const [copy, setCopy] = useState<TLeadStatusData[]>([])

  useEffect(() => {
    if (leadStatuses.length) {
      setCopy(leadStatuses)
    }
  }, [leadStatuses])

  const addNewIsDisabled = () => !!copy.filter((i) => i?.id === -1).length

  const addNew = () => {
    if (!addNewIsDisabled())
      setCopy([{ id: -1, name: '', value: '', isSystem: false }, ...copy])
  }

  const handleReset = (id?: number) => {
    if (id === -1) {
      setCopy(copy.filter((item) => item.isSystem || item.id !== id))
    } else {
      const original = leadStatuses.find((status) => status.id === id)
      if (original) {
        setCopy(copy.map((item) => (item?.id === id ? original : item)))
      }
    }
  }

  return (
    <Card margin="32px 0 40px" padding="24px 41px" fullWidth maxWidth="fit-content">
      <Flex justify="space-between">
        <CardTile>{t('change-lead-settings.status.title')}</CardTile>
        <FilledButton
          size="s"
          width="120px"
          startIcon={<PlusIcon width="24px" height="24px" color="main22" />}
          onClick={addNew}
          disabled={addNewIsDisabled()}
        >
          {t('change-lead-settings.status.addNew')}
        </FilledButton>
      </Flex>
      <div style={{ marginLeft: '14px' }}>
        {copy.map((item) => (
          <LeadStatusRow
            key={item.id || item.value}
            originalItem={leadStatuses.find((status) => status.id === item.id) || item}
            item={item}
            onReset={handleReset}
          />
        ))}
      </div>
    </Card>
  )
}
