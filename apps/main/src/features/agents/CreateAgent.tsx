import useTranslation from 'next-translate/useTranslation'
import { Flex } from '@/components/Flex'
import { useFormik } from 'formik'
import * as yup from 'yup'
import { FilledButton } from '@peiko/components/buttons/FilledButton'
import { FormikInput } from '@peiko/components/inputs/formik-adapters/FormikInput'
import { validation } from '@/utils/validation'
import { useRedux } from '@/hooks/use-redux'
import {
  asyncCreateAgent,
  selectCreateAgentsIsLoading,
} from '@/features/agents/store/create-agent'

export const CreateAgent = (): JSX.Element => {
  const { t } = useTranslation('agents')
  const { select, dispatch } = useRedux()
  const isLoading = select(selectCreateAgentsIsLoading)

  const formik = useFormik({
    initialValues: {
      username: '',
      email: '',
    },
    validationSchema: yup.object().shape({
      username: validation.required,
      email: validation.email.required(),
    }),
    onSubmit: (formData) => {
      dispatch(asyncCreateAgent({ formData, formik }))
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
                name="username"
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
            </Flex>
          </Flex>
          <Flex align="center" justify="center" gap={24}>
            <FilledButton
              type="submit"
              width="236px"
              isLoading={isLoading}
              disabled={!formik.dirty || !formik.isValid || isLoading}
            >
              {t('create-agent.action')}
            </FilledButton>
          </Flex>
        </Flex>
      </form>
    </Flex>
  )
}
