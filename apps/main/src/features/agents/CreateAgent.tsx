import useTranslation from 'next-translate/useTranslation'
import { Flex } from '@/components/Flex'
import { useFormik } from 'formik'
import * as yup from 'yup'
import { FilledButton } from '@peiko/components/buttons/FilledButton'
import { FormikInput } from '@peiko/components/inputs/formik-adapters/FormikInput'
import { FormikSelect } from '@peiko/components/inputs/formik-adapters/FormikSelect'

export const CreateAgent = (): JSX.Element => {
  const { t } = useTranslation('agents')

  const formik = useFormik({
    initialValues: {
      name: 'Lebron James',
      email: 'lakers@gmail.com',
      role: 'Manager',
      assignedCampaigns: 'Campaign 10',
    },
    validationSchema: yup.object().shape({}),
    onSubmit: (formData) => {
      // eslint-disable-next-line no-console
      console.log(formData)
    },
  })

  return (
    <Flex width="100%" height="100%" align="center" justify="center">
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
              {t('create-agent:action')}
            </FilledButton>
          </Flex>
        </Flex>
      </form>
    </Flex>
  )
}
