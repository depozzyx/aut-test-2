import useTranslation from 'next-translate/useTranslation'
import React, { FC } from 'react'
import { useModals } from '@/features/common/modals/hooks/use-modals'
import { MODAL_NAMES } from '@/features/common/modals/constants'
import { Button, Icon } from './CreateLeads.styled'

export const CreateLeads: FC = () => {
  const { t } = useTranslation('import-leads')
  const { setModal } = useModals()

  const onCreate = () => {
    setModal({ modalName: MODAL_NAMES.CREATE_LEADS_GROUP, isOpen: true })
  }

  return (
    <Button width="236px" onClick={onCreate}>
      <Icon /> {t('createNewList')}
    </Button>
  )
}
