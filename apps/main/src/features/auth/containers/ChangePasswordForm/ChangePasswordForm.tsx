import { FC } from 'react'
import * as yup from 'yup'
import { useFormik } from 'formik'
import useTranslation from 'next-translate/useTranslation'
import { Logo } from '@/features/auth/components/Logo'
import { FilledButton } from '@peiko/components/buttons/FilledButton'
import { validation } from '@/utils/validation'
import { FormikInput } from '@peiko/components/inputs/formik-adapters/FormikInput'
import { Container, FormWrapper, SubTitle, Title } from './ChangePasswordForm.styled'

export const ChangePasswordForm: FC = () => {
  const { t } = useTranslation('auth')

  const formik = useFormik({
    initialValues: {
      password: '',
      confirmPassword: '',
    },
    validationSchema: yup.object().shape({
      password: validation.password,
      confirmPassword: validation.repeatPassword,
    }),
    onSubmit: (formData) => {
      // eslint-disable-next-line no-console
      console.log('ChangePasswordForm', formData)
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
            id="password"
            name="password"
            type="password"
            size="s"
            label={{ label: t('inputs:password') }}
            placeholder={t('inputs:placeholder.password')}
            formik={formik}
            width={247}
          />
          <FormikInput
            id="password"
            name="confirmPassword"
            type="confirmPassword"
            size="s"
            label={{ label: t('inputs:password') }}
            placeholder={t('inputs:placeholder.password')}
            formik={formik}
            width={247}
          />
          <FilledButton
            type="submit"
            size="s"
            width="100%"
            styles={{ marginTop: '24px', maxWidth: '247px' }}
          >
            {t('sign-in.action')}
          </FilledButton>
        </FormWrapper>
      </form>
    </Container>
  )
}
