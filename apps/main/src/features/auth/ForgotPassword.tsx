import { FC } from 'react'
import useTranslation from 'next-translate/useTranslation'
import { useFormik } from 'formik'
import * as yup from 'yup'
import { useUnmount } from 'react-use'
import { Text } from '@peiko/components/Text'
import { validation } from '@/utils/validation'
import { FormikInput } from '@peiko/components/inputs/formik-adapters/FormikInput'
import { FilledButton } from '@peiko/components/buttons/FilledButton'
import { EmailIcon } from '@peiko/components/icons/EmailIcon'
import { useRedux } from '@/hooks/use-redux'
import { Snackbar } from '@/components/Snackbar'
import { Flex } from '@/components/Flex'
import {
  forgotPasswordAsync,
  reset,
  selectForgotPassword,
  setStatusCode,
} from './store/forgot-password'
import { AuthFormCard } from './components/AuthFormCard'

export const ForgotPassword: FC = () => {
  const { t } = useTranslation('auth')
  const { select, dispatch } = useRedux()
  const { statusCode } = select(selectForgotPassword)

  useUnmount(() => {
    dispatch(reset())
  })

  const formik = useFormik({
    initialValues: {
      email: '',
    },
    validationSchema: yup.object().shape({
      email: validation.required,
    }),
    onSubmit: (formData) => {
      dispatch(forgotPasswordAsync({ formData, formik }))
    },
  })

  const handleHideNotification = () => {
    dispatch(setStatusCode(''))
  }

  return (
    <Flex direction="column" align="center" maxWidth={552} gap={12}>
      <AuthFormCard>
        <form onSubmit={formik.handleSubmit} autoComplete="off">
          <Flex direction="column" align="center" justify="center" gap={24}>
            <Text tag="h4" variant="f4">
              {t('forgot-password.title')}
            </Text>
            <Text variant="f7" styles={{ whiteSpace: 'nowrap' }}>
              {t('forgot-password.subtitle')}
            </Text>
            <FormikInput
              size="s"
              name="email"
              label={{ label: t('inputs:email') }}
              placeholder={t('inputs:placeholder.email')}
              id="email"
              formik={formik}
              width={246}
              startAdornment={<EmailIcon width="24px" height="24px" />}
            />
            <FilledButton
              type="submit"
              size="s"
              width="100%"
              disabled={!formik.isValid || !formik.dirty}
              styles={{ marginTop: '24px', maxWidth: '246px' }}
            >
              {t('forgot-password.action')}
            </FilledButton>
          </Flex>
        </form>
      </AuthFormCard>
      {statusCode && (
        <Snackbar
          status="info"
          title={t('forgot-password.notification.title')}
          onClose={handleHideNotification}
        />
      )}
    </Flex>
  )
}
