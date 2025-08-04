import { useFormik } from 'formik'
import { createStructuredSelector } from 'reselect'
import { shallowEqual } from 'react-redux'
import useTranslation from 'next-translate/useTranslation'
import { Flex } from '@/components/Flex'
import { useRedux } from '@/hooks/use-redux'
import { OutlinedButton } from '@peiko/components/buttons/OutlinedButton'
import { FilledButton } from '@peiko/components/buttons/FilledButton'
import { FormikInput } from '@peiko/components/inputs/formik-adapters/FormikInput'
import { useModals } from '@/features/common/modals/hooks/use-modals'
import {
  asyncUpdateAgent,
  selectInitFormData,
  selectUpdateAgentIsLoading,
} from '@/features/agents/store/edit-agent'
import { editAgentValidationSchema } from '@/utils/validation'
import { useAuth } from '@/features/common/user'

export const EditAgentForm = (): JSX.Element => {
  const { t } = useTranslation('agents')
  const { resetModals } = useModals()
  const { select, dispatch } = useRedux()
  const { user } = useAuth()

  const { isLoading, initFormData } = select(
    createStructuredSelector({
      isLoading: selectUpdateAgentIsLoading,
      initFormData: selectInitFormData,
    }),
    shallowEqual,
  )

  const formik = useFormik({
    initialValues: {
      username: initFormData?.username || '',
      email: initFormData?.email || '',
    },
    validationSchema: editAgentValidationSchema,
    onSubmit: (formData) => {
      dispatch(asyncUpdateAgent({ formData, formik }))
    },
  })

  return (
    <form onSubmit={formik.handleSubmit} autoComplete="off">
      <Flex direction="column" align="center" gap={48} margin="40px 0 0 0">
        <Flex gap={24}>
          <Flex direction="column" gap={16} maxWidth="326px" width="100%">
            <FormikInput
              size="s"
              name="username"
              label={{ label: t('edit-agent.agent-name') }}
              id="username"
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
            {user?.role && ['admin', 'superadmin', 'manager'].includes(user.role) && (
              <FormikInput
                size="s"
                name="password"
                type="password"
                label={{ label: t('edit-agent.password') }}
                id="password"
                placeholder="********"
                formik={formik}
                width={326}
                styles={{ padding: '0 14px' }}
              />
            )}
          </Flex>
        </Flex>
        <Flex align="center" justify="center" gap={24}>
          <FilledButton
            type="submit"
            disabled={!formik.dirty || !formik.isValid || isLoading}
            width="236px"
            isLoading={isLoading}
          >
            {t('edit-agent.save-btn')}
          </FilledButton>
          <OutlinedButton onClick={resetModals} width="236px">
            {t('edit-agent.cancel-btn')}
          </OutlinedButton>
        </Flex>
      </Flex>
    </form>
  )
}
