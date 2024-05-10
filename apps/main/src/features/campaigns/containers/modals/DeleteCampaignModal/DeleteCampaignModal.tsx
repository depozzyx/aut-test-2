import useTranslation from 'next-translate/useTranslation'
import Trans from 'next-translate/Trans'
import { ModalMessage } from '@peiko/components/modals/ModalMessage'
import useModals from '@/features/common/modals/hooks/use-modals'
import { Flex } from '@/components/Flex'
import { Text } from '@peiko/components/Text'
import { FilledButton } from '@peiko/components/buttons/FilledButton'
import { OutlinedButton } from '@peiko/components/buttons/OutlinedButton'
import { MODAL_NAMES } from '@/features/common/modals/constants'
import { useRedux } from '@/hooks/use-redux'
import { TCampaignTableType } from '../../../types'
import {
  asyncRemoveCampaign,
  selectCampaignForDelete,
  setSelectedId,
} from '../../../store/campaigns'

type TProps = {
  type: TCampaignTableType
}

export const DeleteCampaignModal = ({ type }: TProps): JSX.Element => {
  const { t } = useTranslation('common')
  const { dispatch, select } = useRedux()
  const { modalState, resetModals } = useModals()

  const campaign = select(selectCampaignForDelete(type))

  const showModal =
    modalState?.modalName === MODAL_NAMES.DELETE_CAMPAIGN && modalState.isOpen

  const handleDelete = () => {
    dispatch(asyncRemoveCampaign(type))
  }

  const handleClose = () => {
    resetModals()
    dispatch(setSelectedId(null))
  }

  const title = (
    <Flex align="center" justify="center" width="330px" styles={{ textAlign: 'center' }}>
      <Trans
        i18nKey="campaigns:delete-campaign"
        components={{
          translate: <Text tag="span" variant="f2" />,
          value: <Text tag="span" variant="f2" color="main2" />,
        }}
        values={{
          campaignName: campaign?.name || '',
        }}
      />
    </Flex>
  )

  const actions = (
    <Flex width="100%" gap={24} styles={{ paddingTop: '48px' }}>
      <FilledButton onClick={handleDelete} width="100%">
        {t('delete')}
      </FilledButton>
      <OutlinedButton onClick={handleClose} width="100%">
        {t('cancel')}
      </OutlinedButton>
    </Flex>
  )

  return (
    <ModalMessage
      title={title}
      open={showModal}
      onClose={handleClose}
      status="info"
      containerWidth="100%"
    >
      {actions}
    </ModalMessage>
  )
}
