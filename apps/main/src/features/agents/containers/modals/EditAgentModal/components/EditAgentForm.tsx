import { Flex } from '@/components/Flex'
import { useFormik } from 'formik'
import { useRedux } from '@/hooks/use-redux'
import * as yup from 'yup'
import useTranslation from 'next-translate/useTranslation'
import { OutlinedButton } from '@peiko/components/buttons/OutlinedButton'
import { FilledButton } from '@peiko/components/buttons/FilledButton'
import { FormikInput } from '@peiko/components/inputs/formik-adapters/FormikInput'
import { useModals } from '@/features/common/modals/hooks/use-modals'
import { createStructuredSelector } from 'reselect'
import { shallowEqual } from 'react-redux'
import {
  asyncUpdateAgent,
  selectInitFormData,
  selectUpdateAgentsIsLoading,
} from '@/features/agents/store/edit-agent'
import { validation } from '@/utils/validation'

export const EditAgentForm = (): JSX.Element => {
  const { t } = useTranslation('agents')
  const { resetModals } = useModals()
  const { select, dispatch } = useRedux()

  const { isLoading, initFormData } = select(
    createStructuredSelector({
      isLoading: selectUpdateAgentsIsLoading,
      initFormData: selectInitFormData,
    }),
    shallowEqual,
  )

  const formik = useFormik({
    initialValues: {
      username: initFormData?.username || '',
      email: initFormData?.email || '',
    },
    validationSchema: yup.object().shape({
      username: validation.required,
      email: validation.email,
    }),
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
          </Flex>
        </Flex>
        <Flex align="center" justify="center" gap={24}>
          <FilledButton
            type="submit"
            disabled={!formik.dirty || !formik.isValid || isLoading}
            width="236px"
            isLoading={isLoading}
          >
            {t('edit-agent.save')}
          </FilledButton>
          <OutlinedButton onClick={resetModals} width="236px">
            {t('edit-agent.cancel')}
          </OutlinedButton>
        </Flex>
      </Flex>
    </form>
  )
}
