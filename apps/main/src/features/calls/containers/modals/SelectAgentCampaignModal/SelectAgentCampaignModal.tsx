import useTranslation from 'next-translate/useTranslation'
import { MODAL_NAMES } from '@/features/common/modals/constants'
import { useModals } from '@/features/common/modals/hooks/use-modals'
import { ModalMessage } from '@peiko/components/modals/ModalMessage'
import { Text } from '@peiko/components/Text'
import React, { useEffect, useState } from 'react'
import { FormikSelect } from '@peiko/components/inputs/formik-adapters/FormikSelect'
import { FilledButton } from '@peiko/components/buttons/FilledButton'
import { RefreshIcon } from '@peiko/components/icons/Refresh/RefreshIcon'
import { useFormik } from 'formik'
import * as yup from 'yup'
import { required } from '@/utils/validation'
import { TFormik } from '@peiko/types/formik'
import { setSelectedCampaignId } from '@/features/agents/store/agents'
import { Flex } from '@/components/Flex'
import { useRedux } from '@/hooks/use-redux'
import {
  asyncGetAgentAssignedCampaigns,
  selectAgentAssignedCampaigns,
  selectIsCampaignSelected,
} from '@/features/campaigns/store/campaigns'
import { BaseIconButton } from '@peiko/components/buttons/BaseIconButton'
import { RotateContainer } from '@peiko/components/loaders/Loader/Loader.styles'

type TProps = {
  // campaigns: Partial<TCampaign>[]
  onSelectedCampaign: boolean
  onSelectCampaign: (id: string) => void
  callback: (value: string) => void
  onClose: () => void
  // campaignCompleted: boolean
}

export const SelectAgentCampaignModal = ({
  // campaigns,
  callback,
  onSelectedCampaign,
  onSelectCampaign,
  // campaignCompleted,
  onClose,
}: TProps): JSX.Element => {
  const { t } = useTranslation('calls')
  const { modalState, resetModals } = useModals()
  const { dispatch, select } = useRedux()
  const agentAssignedCampaigns = select(selectAgentAssignedCampaigns)
  const isCampaignSelected = select(selectIsCampaignSelected)
  const [isRotating, setIsRotating] = useState(false)

  const showModal =
    modalState?.modalName === MODAL_NAMES.SELECT_AGENT_CAMPAIGN && modalState.isOpen

  const title =
    agentAssignedCampaigns.length === 0 ? (
      ''
    ) : (
      <Text tag="span">{t('selectCampaignTitle')}</Text>
    )

  const formik: TFormik = useFormik({
    initialValues: {
      campaignId: null,
    },
    validationSchema: yup.object().shape({
      campaignId: required,
    }),
    onSubmit: (formData) => {
      dispatch(setSelectedCampaignId(formData.campaignId))
      if (formData.campaignId) {
        onSelectCampaign(formData.campaignId)
        if (onSelectedCampaign) callback(formData.campaignId)
      }
    },
  })

  const handleClose = () => {
    onClose()
    if (agentAssignedCampaigns.length === 0) {
      resetModals()
    }
  }

  const handleSubmit = async () => {
    await formik.submitForm()
    resetModals()
  }

  const refreshCampaigns = () => {
    setIsRotating(true)
    dispatch(asyncGetAgentAssignedCampaigns())
    setTimeout(() => setIsRotating(false), 1000)
  }

  useEffect(() => {
    formik.setValues({ campaignId: agentAssignedCampaigns[0]?.id || null })
  }, [agentAssignedCampaigns])

  return (
    <ModalMessage
      title={title}
      open={showModal}
      maxWidth="612px"
      containerWidth="100%"
      disableCloseOutside={!!agentAssignedCampaigns.length}
      hideCloseButton={!!agentAssignedCampaigns.length}
      onClose={handleClose}
    >
      {agentAssignedCampaigns.length === 0 && (
        <Text>
          {isCampaignSelected ? t('onCompleteCampaignMessage') : t('noCampaignError')}
        </Text>
      )}
      {agentAssignedCampaigns.length > 1 && (
        <Flex direction="column" align="center" gap={40} margin="40px 0 0 0">
          <Flex align="center" justify="center" direction="column" gap={8}>
            <Flex align="center" justify="center" direction="row" gap={8}>
              <FormikSelect
                placeholder={t('selectPlaceholder')}
                formik={formik}
                options={agentAssignedCampaigns.map(({ id, name }) => ({
                  label: String(name),
                  value: String(id),
                }))}
                name="campaignId"
                width="326px"
                maxMenuHeight={200}
              />
              <RotateContainer isRotating={isRotating}>
                <BaseIconButton onClick={refreshCampaigns}>
                  <RefreshIcon color="main4" size="s" />
                </BaseIconButton>
              </RotateContainer>
            </Flex>
            <Text variant="f8">(Go online to join the selected campaign.)</Text>
          </Flex>
          <Flex align="center" justify="center">
            <FilledButton
              type="submit"
              disabled={!formik.dirty || !formik.isValid}
              width="236px"
              onClick={handleSubmit}
            >
              {t('save')}
            </FilledButton>
          </Flex>
        </Flex>
      )}
    </ModalMessage>
  )
}
