import useTranslation from 'next-translate/useTranslation'
import Trans from 'next-translate/Trans'
import { ModalMessage } from '@peiko/components/modals/ModalMessage'
import { useModals } from '@/features/common/modals/hooks/use-modals'
import { Flex } from '@/components/Flex'
import { Text } from '@peiko/components/Text'
import { FilledButton } from '@peiko/components/buttons/FilledButton'
import { OutlinedButton } from '@peiko/components/buttons/OutlinedButton'
import { MODAL_NAMES } from '@/features/common/modals/constants'
import { useRedux } from '@/hooks/use-redux'
import { RadioButton } from '@peiko/components/inputs/RadioButton/RadioButton'
import { useState } from 'react'
import { TCampaign, TCampaignTableType } from '../../../types'
import {
  asyncRemoveCampaign,
  selectCampaignForDelete,
  setSelectedId,
} from '../../../store/campaigns'
import { ECampaignDeleteOptions } from '../../../../../api/rest/campaigns/types'

type TProps = {
  type: TCampaignTableType
}

export const DeleteCampaignModal = ({ type }: TProps): JSX.Element => {
  const { t } = useTranslation('campaigns')
  const { dispatch, select } = useRedux()
  const { modalState, resetModals } = useModals()

  const campaign = select(selectCampaignForDelete(type))

  const [deleteOptions, setDeleteOptions] = useState<ECampaignDeleteOptions>(
    ECampaignDeleteOptions.UNATTACH_LEAD_LISTS,
  )
  const showModal =
    modalState?.modalName === MODAL_NAMES.DELETE_CAMPAIGN && modalState.isOpen

  const handleDelete = () => {
    dispatch(asyncRemoveCampaign(type, deleteOptions))
  }

  const handleClose = () => {
    resetModals()
    dispatch(setSelectedId(null))
  }

  const title = (
    <Flex align="center" justify="center" width="330px" styles={{ textAlign: 'center' }}>
      <Trans
        i18nKey="campaigns:delete-campaign.title"
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

  return (
    <ModalMessage
      title={title}
      open={showModal}
      onClose={handleClose}
      status="info"
      containerWidth="100%"
    >
      <Flex
        direction="column"
        styles={{ marginTop: '30px' }}
        gap="25px"
        justify="center"
        align="center"
      >
        {((campaign as TCampaign)?.leadLists.length || undefined) && (
          <Flex
            styles={{ paddingLeft: '100px' }}
            width="100%"
            direction="column"
            gap="22px"
            justify="center"
          >
            <Flex
              gap="4px"
              styles={{ cursor: 'pointer' }}
              onClick={() => setDeleteOptions(ECampaignDeleteOptions.UNATTACH_LEAD_LISTS)}
            >
              <RadioButton
                name={ECampaignDeleteOptions.UNATTACH_LEAD_LISTS}
                onChange={() =>
                  setDeleteOptions(ECampaignDeleteOptions.UNATTACH_LEAD_LISTS)
                }
                inputProps={{
                  value: ECampaignDeleteOptions.UNATTACH_LEAD_LISTS,
                  checked: deleteOptions === ECampaignDeleteOptions.UNATTACH_LEAD_LISTS,
                }}
              />
              <Text>{t('delete-campaign.unattachLeadLists')}</Text>
            </Flex>
            <Flex
              gap="4px"
              styles={{ cursor: 'pointer' }}
              onClick={() => setDeleteOptions(ECampaignDeleteOptions.KEEP_LEAD_LISTS)}
            >
              <RadioButton
                name={ECampaignDeleteOptions.KEEP_LEAD_LISTS}
                onChange={() => setDeleteOptions(ECampaignDeleteOptions.KEEP_LEAD_LISTS)}
                inputProps={{
                  value: ECampaignDeleteOptions.KEEP_LEAD_LISTS,
                  checked: deleteOptions === ECampaignDeleteOptions.KEEP_LEAD_LISTS,
                }}
              />
              <Text>{t('delete-campaign.keepLeadLists')}</Text>
            </Flex>
            <Flex
              gap="4px"
              styles={{ cursor: 'pointer' }}
              onClick={() => setDeleteOptions(ECampaignDeleteOptions.DELETE_LEAD_LISTS)}
            >
              <RadioButton
                name={ECampaignDeleteOptions.DELETE_LEAD_LISTS}
                onChange={() =>
                  setDeleteOptions(ECampaignDeleteOptions.DELETE_LEAD_LISTS)
                }
                inputProps={{
                  value: ECampaignDeleteOptions.DELETE_LEAD_LISTS,
                  checked: deleteOptions === ECampaignDeleteOptions.DELETE_LEAD_LISTS,
                }}
              />
              <Text>{t('delete-campaign.deleteLeadLists')}</Text>
            </Flex>
          </Flex>
        )}
        <Flex width="100%" gap={24} justify="center">
          <FilledButton onClick={handleDelete} width="160px">
            {t('delete-campaign.delete-btn')}
          </FilledButton>
          <OutlinedButton onClick={handleClose} width="160px">
            {t('delete-campaign.cancel-btn')}
          </OutlinedButton>
        </Flex>
      </Flex>
    </ModalMessage>
  )
}
