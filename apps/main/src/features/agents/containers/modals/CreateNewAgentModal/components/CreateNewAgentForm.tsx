import { useState, useMemo } from 'react'
import dynamic from 'next/dynamic'
import { useFormik } from 'formik'
import useTranslation from 'next-translate/useTranslation'
import * as yup from 'yup'

import { Flex } from '@/components/Flex'
import { FilledButton } from '@peiko/components/buttons/FilledButton'
import { validation } from '@/utils/validation'
import { useRedux } from '@/hooks/use-redux'
import { Snackbar } from '@/components/Snackbar'
import {
  asyncCreateAgent,
  selectCreateAgentsIsLoading,
} from '@/features/agents/store/create-agent'

const FormikCheckbox = dynamic(
  () =>
    import('@peiko/components/inputs/formik-adapters/FormikCheckbox').then(
      (mod) => mod.FormikCheckbox,
    ),
  {
    ssr: false,
  },
)

const FormikInput = dynamic(
  () =>
    import('@peiko/components/inputs/formik-adapters/FormikInput').then(
      (mod) => mod.FormikInput,
    ),
  {
    ssr: false,
  },
)

export const CreateNewAgentForm = (): JSX.Element => {
  const [showMessage, setShowMessage] = useState(true)
  const { t } = useTranslation('agents')
  const { select, dispatch } = useRedux()
  const isLoading = select(selectCreateAgentsIsLoading)

  const validationSchema = useMemo(
    () =>
      yup.object().shape({
        username: validation.required,
        email: validation.email.required(),
        sendToEmail: validation.boolean,
        password: yup.string(),
      }),
    [],
  )

  const formik = useFormik({
    initialValues: {
      username: '',
      email: '',
      sendToEmail: true,
      password: '',
    },
    validationSchema,
    onSubmit: (formData) => {
      dispatch(asyncCreateAgent({ formData, formik }))
    },
  })

  return (
    <Flex
      width="100%"
      height="100%"
      align="center"
      justify="center"
      direction="column"
      gap={40}
    >
      <form onSubmit={formik.handleSubmit} autoComplete="off">
        <Flex direction="column" align="center" gap={40} margin="40px 0 0 0">
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
              <FormikInput
                size="s"
                name="password"
                label={{ label: t('create-agent.password') }}
                id="password"
                formik={formik}
                width={326}
                styles={{ padding: '0 14px' }}
              />
              {formik.values.password && (
                <FormikCheckbox
                  size="s"
                  name="sendToEmail"
                  label={t('create-agent.send-password')}
                  formik={formik}
                />
              )}
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
      {showMessage && (
        <Snackbar
          status="info"
          onClose={() => setShowMessage(false)}
          message={t('create-agent.message')}
          withAnimation={false}
          maxWidth="326px"
        />
      )}
    </Flex>
  )
}
