import { FC } from 'react'
import useTranslation from 'next-translate/useTranslation'
import { Logo } from '@/features/auth/components/Logo'
import { useFormik } from 'formik'
import * as yup from 'yup'
import { validation } from '@/utils/validation'
import { FormikInput } from '@peiko/components/inputs/formik-adapters/FormikInput'
import { FilledButton } from '@peiko/components/buttons/FilledButton'
import { EmailIcon } from '@peiko/components/icons/EmailIcon'
import {
  FormWrapper,
  Title,
  Container,
  SubTitle,
} from '@/features/auth/styles/ResetPassword.styled'

export const ResetPassword: FC = () => {
  const { t } = useTranslation('auth')

  const formik = useFormik({
    initialValues: {
      email: '',
    },
    validationSchema: yup.object().shape({
      email: validation.required,
    }),
    onSubmit: (formData) => {
      // eslint-disable-next-line no-console
      console.log('ResetPassword', formData)
    },
  })

  return (
    <Container>
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
    </Container>
  )
}
