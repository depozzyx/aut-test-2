import { Flex } from '@/components/Flex'
import { useFormik } from 'formik'
// import { useRedux } from '@/hooks/use-redux'
import * as yup from 'yup'
import useTranslation from 'next-translate/useTranslation'
import { validation } from '@/utils/validation'
import { OutlinedButton } from '@peiko/components/buttons/OutlinedButton'
import { FilledButton } from '@peiko/components/buttons/FilledButton'
import { FormikInput } from '@peiko/components/inputs/formik-adapters/FormikInput'
import { FormikSelect } from '@peiko/components/inputs/formik-adapters/FormikSelect'

export const CreateCampaignForm = (): JSX.Element => {
  const { t } = useTranslation('campaigns')
  //   const { dispatch } = useRedux()

  const formik = useFormik({
    initialValues: {
      name: 'Campaign Name 123',
      assignedAgentIds: '',
      leadSelection: '',
      creatiodnDate: '',
      scenarioSetup: '',
      callFrequency: '',
      callTime: '',
    },
    validationSchema: yup.object().shape({
      email: validation.required,
      password: validation.password,
    }),
    onSubmit: (formData) => {
      //   dispatch(setForm({ formData, formik }))
      // eslint-disable-next-line no-console
      console.log('formData', formData)
    },
  })

  return (
    <form onSubmit={formik.handleSubmit} autoComplete="off">
      <Flex direction="column" align="center" gap={48}>
        <Flex gap={24}>
          <Flex direction="column" gap={16} maxWidth="326px" width="100%">
            <FormikInput
              size="s"
              name="name"
              label={{ label: t('create-campaign.campaign-name') }}
              id="name"
              formik={formik}
              width={246}
            />
          </Flex>
          <Flex direction="column" gap={16}>
            <FormikSelect
              formik={formik}
              name="scenarioSetup"
              label={{ label: t('create-campaign.scenario-setup') }}
            />
            <FormikSelect
              formik={formik}
              name="callFrequency"
              label={{ label: t('create-campaign.call-frequency') }}
            />
            <FormikSelect
              formik={formik}
              name="callTime"
              label={{ label: t('create-campaign.time-for-calls') }}
            />
          </Flex>
        </Flex>
        <Flex align="center" justify="center" gap={24}>
          <OutlinedButton>{t('common:cancel')}</OutlinedButton>
          <FilledButton>{t('create-campaign.review')}</FilledButton>
        </Flex>
      </Flex>
    </form>
  )
}
