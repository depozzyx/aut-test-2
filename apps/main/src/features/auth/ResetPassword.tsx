import { FC } from 'react'
import useTranslation from 'next-translate/useTranslation'
import { Logo } from '@/features/auth/components/Logo'
import { useFormik } from 'formik'
import * as yup from 'yup'
import { validation } from '@/utils/validation'
import { FormikInput } from '@peiko/components/inputs/formik-adapters/FormikInput'
import { FilledButton } from '@peiko/components/buttons/FilledButton'
import { EmailIcon } from '@peiko/components/icons/EmailIcon'
import { Box } from '@peiko/components/Box'
import { useRedux } from '@/hooks/use-redux'
import {
  FormWrapper,
  Title,
  FormContainer,
  SubTitle,
} from '@/features/auth/styles/ResetPassword.styled'
import { AuthNotification } from '@/features/auth/components/AuthNotification/AuthNotification'
import {
  resetPasswordAsync,
  reset,
  selectResetPassword,
  setStatusCode,
} from '@/features/auth/store/reset-password'
import { useUnmount } from 'react-use'

export const ResetPassword: FC = () => {
  const { t } = useTranslation('auth')
  const { select, dispatch } = useRedux()
  const { statusCode } = select(selectResetPassword)

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
      dispatch(resetPasswordAsync({ formData, formik }))
    },
  })

  const handleHideNotification = () => {
    dispatch(setStatusCode(''))
  }

  return (
    <Box
      styles={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        maxWidth: '552px',
        gap: '12px',
      }}
    >
      <FormContainer>
        <Logo />
        <form onSubmit={formik.handleSubmit} autoComplete="off">
          <FormWrapper>
            <Title>{t('reset-password.title')}</Title>
            <SubTitle>{t('reset-password.subtitle')}</SubTitle>
            <FormikInput
              size="s"
              name="email"
              label={{ label: t('inputs:email') }}
              placeholder={t('inputs:placeholder.email')}
              id="email"
              formik={formik}
              width={247}
              startAdornment={<EmailIcon width="24px" height="24px" />}
            />
            <FilledButton
              type="submit"
              size="s"
              width="100%"
              disabled={!formik.isValid || !formik.dirty}
              styles={{ marginTop: '24px', maxWidth: '247px' }}
            >
              {t('reset-password.action')}
            </FilledButton>
          </FormWrapper>
        </form>
      </FormContainer>
      {statusCode && (
        <AuthNotification
          status="info"
          title={t('reset-password.notification.title')}
          message={t('reset-password.notification.message')}
          onClose={handleHideNotification}
        />
      )}
    </Box>
  )
}
