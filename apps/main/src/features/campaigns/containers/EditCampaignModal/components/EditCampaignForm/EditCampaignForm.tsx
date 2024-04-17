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
import { setFormData } from '@/features/campaigns/store/edit-campaign'

interface IinitialValues {
  name: string
  creationDate: string
  callFrequency: string
  responseRate: string
  status: string
  conversionRate: string
}

const initialValues: IinitialValues = {
  name: 'Campaign Name 123',
  creationDate: '',
  callFrequency: 'Every hour',
  responseRate: '20%',
  status: 'Paused',
  conversionRate: '20%',
}

export const EditCampaignForm = (): JSX.Element => {
  const { t } = useTranslation('campaigns')
  const { resetModals } = useModals()
  const { dispatch } = useRedux()

  const formik = useFormik({
    initialValues,
    validationSchema: yup.object().shape({}),
    onSubmit: (formData) => {
      dispatch(setFormData({ formData, formik }))
      resetModals()
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
              label={{ label: t('edit-campaign.campaign-name') }}
              id="name"
              formik={formik}
              width={326}
              styles={{ padding: '0 14px' }}
            />
            <FormikDayPickerInput
              formik={formik}
              name="creationDate"
              label={{ label: t('edit-campaign.creation-date') }}
              width={326}
              size="s"
              styles={{ padding: '0 6px 0 16px' }}
            />
            <FormikSelect
              formik={formik}
              name="callFrequency"
              label={{ label: t('edit-campaign.call-frequency') }}
              width={326}
              options={[
                { value: 'Every hour', label: 'Every hour' },
                { value: 'Every day', label: 'Every day' },
              ]}
            />
          </Flex>
          <Flex direction="column" gap={16} maxWidth="326px" width="100%">
            <FormikSelect
              formik={formik}
              name="responseRate"
              label={{ label: t('edit-campaign.response-rate') }}
              width={326}
              options={[
                { value: '20%', label: '20%' },
                { value: '30%', label: '30%' },
              ]}
            />
            <FormikSelect
              formik={formik}
              name="status"
              label={{ label: t('edit-campaign.status') }}
              width={326}
              options={[
                { value: 'Paused', label: 'Paused' },
                { value: 'Active', label: 'Active' },
              ]}
            />
            <FormikSelect
              formik={formik}
              name="conversionRate"
              label={{ label: t('edit-campaign.conversion-rate') }}
              width={326}
              options={[
                { value: '20%', label: '20%' },
                { value: '30%', label: '30%' },
              ]}
            />
          </Flex>
        </Flex>
        <Flex align="center" justify="center" gap={24}>
          <FilledButton
            type="submit"
            disabled={!formik.isValid || !formik.dirty}
            width="236px"
          >
            {t('common:save')}
          </FilledButton>
          <OutlinedButton onClick={resetModals} width="236px">
            {t('common:cancel')}
          </OutlinedButton>
        </Flex>
      </Flex>
    </form>
  )
}
