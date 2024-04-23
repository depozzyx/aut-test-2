import useTranslation from 'next-translate/useTranslation'
import React, { FC } from 'react'
import { Button, Icon } from './CreateLeads.styled'

export const CreateLeads: FC = () => {
  const { t } = useTranslation('import-leads')

  return (
    <Button width="236px">
      <Icon width="12px" height="12px" /> {t('createNewList')}
    </Button>
  )
}
