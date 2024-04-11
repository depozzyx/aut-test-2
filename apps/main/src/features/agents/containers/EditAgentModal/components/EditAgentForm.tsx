import { Flex } from '@/components/Flex'
import { useFormik } from 'formik'
import { useRedux } from '@/hooks/use-redux'
import * as yup from 'yup'
import useTranslation from 'next-translate/useTranslation'
import { OutlinedButton } from '@peiko/components/buttons/OutlinedButton'
import { FilledButton } from '@peiko/components/buttons/FilledButton'
import { FormikInput } from '@peiko/components/inputs/formik-adapters/FormikInput'
import { FormikSelect } from '@peiko/components/inputs/formik-adapters/FormikSelect'
import useModals from '@/features/common/modals/hooks/use-modals'
import { setFormData } from '@/features/campaigns/store/edit-campaign'

interface IinitialValues {
  name: string
  email: string
  role: string
  assignedCampaigns: string
}

const initialValues: IinitialValues = {
  name: 'Lebron James',
  email: 'lakers@gmail.com',
  role: 'Manager',
  assignedCampaigns: 'Campaign 10',
}

export const EditAgentForm = (): JSX.Element => {
  const { t } = useTranslation('agents')
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
              label={{ label: t('edit-agent.agent-name') }}
              id="name"
              formik={formik}
              width={326}
              styles={{ padding: '0 14px' }}
            />
            <FormikInput
              size="s"
              name="email"
              label={{ label: t('edit-agent.email') }}
              id="email"
              formik={formik}
              width={326}
              styles={{ padding: '0 14px' }}
            />
            <FormikSelect
              formik={formik}
              name="role"
              label={{ label: t('edit-agent.role') }}
              width={326}
              options={[
                { value: 'Agent', label: 'Agent' },
                { value: 'Manager', label: 'Manager' },
              ]}
            />
            <FormikSelect
              formik={formik}
              name="assignedCampaigns"
              label={{ label: t('edit-agent.assigned-campaigns') }}
              width={326}
              options={[
                { value: 'Campaign 10', label: 'Campaign 10' },
                { value: 'Campaign 11', label: 'Campaign 11' },
              ]}
            />
          </Flex>
        </Flex>
        <Flex align="center" justify="center" gap={24}>
          <FilledButton type="submit" disabled={!formik.dirty} width="236px">
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
