import { Flex } from '@/components/Flex'
// import { useRedux } from '@/hooks/use-redux'
import useTranslation from 'next-translate/useTranslation'
import { OutlinedButton } from '@peiko/components/buttons/OutlinedButton'
import { FilledButton } from '@peiko/components/buttons/FilledButton'
import useModals from '@/features/common/modals/hooks/use-modals'
// import { selectCreateCampaignFormData } from '@/features/campaigns/store/create-campaign'
// import { Field } from './ReviewFields.styled'

export const ReviewFields = (): JSX.Element => {
  const { t } = useTranslation('campaigns')
  const { resetModals, setModal } = useModals()
  //   const { select } = useRedux()
  //   const formData = select(selectCreateCampaignFormData)

  const handleBack = () => {
    setModal({ modalName: 'CREATE_CAMPAIGN', isOpen: true })
  }

  return (
    <Flex direction="column" align="center" gap={48} margin="40px 0 0 0">
      <Flex gap={24} direction="column">
        {/* <Field label={} value={} />
        <Field label={} value={} />
        <Field label={} value={} />
        <Field label={} value={} />
        <Field label={} value={} />
        <Field label={} value={} />
        <Field label={} value={} /> */}
      </Flex>
      <Flex align="center" justify="center" gap={24}>
        <OutlinedButton onClick={handleBack} width="236px">
          {t('common:submit')}
        </OutlinedButton>
        <FilledButton onClick={resetModals} width="236px">
          {t('common:back')}
        </FilledButton>
      </Flex>
    </Flex>
  )
}
