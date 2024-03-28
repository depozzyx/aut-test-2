import { FC } from 'react'
import useTranslation from 'next-translate/useTranslation'
import { useFormik } from 'formik'
import * as yup from 'yup'
import { validation } from '@/utils/validation'
import { FormikInput } from '@peiko/components/inputs/formik-adapters/FormikInput'
import { NextLink } from '@peiko/components/links/NextLink'
import { FilledButton } from '@peiko/components/buttons/FilledButton'
import { useRedux } from '@/hooks/use-redux'
import { ROUTES } from '@/constants/routes'
import { EmailIcon } from '@peiko/components/icons/EmailIcon'
import { LockIcon } from '@peiko/components/icons/LockIcon'
import {
  Container,
  FormWrapper,
  Title,
  Fields,
  EmailField,
  WarningText,
  ForgotPassword,
} from './styles/SignIn.styled'
import { signInAsync } from './store/sign-in'
import { Logo } from './components/Logo'

export const SignIn: FC = () => {
  const { t } = useTranslation('auth')

  const { dispatch } = useRedux()

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: yup.object().shape({
      email: validation.required,
      password: validation.password,
    }),
    onSubmit: (formData) => {
      dispatch(signInAsync({ formData, formik }))
    },
  })

  return (
    <Container>
      <Logo />
      <form onSubmit={formik.handleSubmit} autoComplete="off">
        <FormWrapper>
          <Title>{t('sign-in.title')}</Title>
          <Fields>
            <EmailField>
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
              <WarningText>{!formik.errors.email && t('sign-in.warning')}</WarningText>
            </EmailField>
            <FormikInput
              size="s"
              name="password"
              type="password"
              label={{ label: t('inputs:password') }}
              placeholder={t('inputs:placeholder.password')}
              id="password"
              formik={formik}
              width={247}
              startAdornment={<LockIcon width="24px" height="24px" />}
            />
          </Fields>
          <NextLink href={ROUTES.RESET_PASSWORD}>
            <ForgotPassword>{t('forgot-password-link')}</ForgotPassword>
          </NextLink>
          <FilledButton type="submit" size="s" width="100%">
            {t('sign-in.action')}
          </FilledButton>
        </FormWrapper>
      </form>
    </Container>
  )
}
