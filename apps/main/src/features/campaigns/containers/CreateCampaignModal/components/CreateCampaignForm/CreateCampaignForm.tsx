import { Flex } from '@/components/Flex'
import { useFormik } from 'formik'
import { useRedux } from '@/hooks/use-redux'
import * as yup from 'yup'
import useTranslation from 'next-translate/useTranslation'
import { OutlinedButton } from '@peiko/components/buttons/OutlinedButton'
import { FilledButton } from '@peiko/components/buttons/FilledButton'
import { FormikInput } from '@peiko/components/inputs/formik-adapters/FormikInput'
import { FormikSelect } from '@peiko/components/inputs/formik-adapters/FormikSelect'
import { FormikDayPickerInput } from '@peiko/components/inputs/formik-adapters/FormikDayPickerInput'
import useModals from '@/features/common/modals/hooks/use-modals'
import { setFormData } from '@/features/campaigns/store/create-campaign'
import { MODAL_NAMES } from '@/features/common/modals/constants'

export interface IinitialValues {
  name: string
  assignedAgentIds: string
  leadSelection: string
  creationDate: string
  scenarioSetup: string
  callFrequency: string
  callTime: string
}

const mockAgents = [
  { value: 'Esther Howard', label: 'Esther Howard' },
  { value: 'John Johnson', label: 'John Johnson' },
  { value: 'John Johnson', label: 'John Johnson' },
  { value: 'Tim James', label: 'Tim James' },
]

const initialValues: IinitialValues = {
  name: 'Campaign Name 123',
  assignedAgentIds: '',
  leadSelection: 'Lead List 1',
  creationDate: '',
  scenarioSetup: 'Direct',
  callFrequency: 'Every hour',
  callTime: '10 AM - 6 PM',
}

export const CreateCampaignForm = (): JSX.Element => {
  const { t } = useTranslation('campaigns')
  const { resetModals, setModal } = useModals()
  const { dispatch } = useRedux()

  const formik = useFormik({
    initialValues,
    validationSchema: yup.object().shape({}),
    onSubmit: (formData) => {
      dispatch(setFormData(formData))
      setModal({ modalName: MODAL_NAMES.REVIEW_CAMPAIGN, isOpen: true })
    },
  })

  return (
    <form onSubmit={formik.handleSubmit} autoComplete="off">
      <Flex direction="column" align="center" gap={48} margin="40px 0 0 0">
        <Flex gap={24}>
          <Flex direction="column" gap={16} maxWidth="326px" width="100%">
            <FormikInput
              size="s"
              name="name"
              label={{ label: t('create-campaign.campaign-name') }}
              id="name"
              formik={formik}
              width={326}
              styles={{ padding: '0 14px' }}
            />
            <FormikSelect
              formik={formik}
              name="assignedAgentIds"
              label={{ label: t('create-campaign.agent-assignment') }}
              width={326}
              size="s"
              options={mockAgents}
            />
            <FormikSelect
              formik={formik}
              name="leadSelection"
              label={{ label: t('create-campaign.lead-selection') }}
              size="s"
              width={326}
              options={[
                { value: 'Lead List 1', label: 'Lead List 1' },
                { value: 'Lead List 2', label: 'Lead List 2' },
              ]}
            />
            <FormikDayPickerInput
              formik={formik}
              name="creationDate"
              label={{ label: t('create-campaign.creation-date') }}
              width={326}
              size="s"
              styles={{ padding: '0 6px 0 16px' }}
            />
          </Flex>
          <Flex direction="column" gap={16} maxWidth="326px" width="100%">
            <FormikSelect
              formik={formik}
              name="scenarioSetup"
              label={{ label: t('create-campaign.scenario-setup') }}
              width={326}
              options={[
                { value: 'Direct', label: 'Direct' },
                { value: 'Scenario 2', label: 'Scenario 2' },
              ]}
            />
            <FormikSelect
              formik={formik}
              name="callFrequency"
              label={{ label: t('create-campaign.call-frequency') }}
              width={326}
              options={[
                { value: 'Every hour', label: 'Every hour' },
                { value: 'Every day', label: 'Every day' },
              ]}
            />
            <FormikSelect
              formik={formik}
              name="callTime"
              label={{ label: t('create-campaign.time-for-calls') }}
              width={326}
              options={[
                { value: '10 AM - 6 PM', label: '10 AM - 6 PM' },
                { value: '6 PM - 12 AM', label: '6 PM - 12 AM' },
              ]}
            />
          </Flex>
        </Flex>
        <Flex align="center" justify="center" gap={24}>
          <OutlinedButton onClick={resetModals} width="236px">
            {t('common:cancel')}
          </OutlinedButton>
          <FilledButton
            type="submit"
            disabled={!formik.isValid || !formik.dirty}
            width="236px"
          >
            {t('create-campaign.review')}
          </FilledButton>
        </Flex>
      </Flex>
    </form>
  )
}
