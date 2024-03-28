import { FC } from 'react'
import * as yup from 'yup'
import { useFormik } from 'formik'
import useTranslation from 'next-translate/useTranslation'
import { Logo } from '@/features/auth/components/Logo'
import { FilledButton } from '@peiko/components/buttons/FilledButton'
import { validation } from '@/utils/validation'
import { FormikInput } from '@peiko/components/inputs/formik-adapters/FormikInput'
import { LockIcon } from '@peiko/components/icons/LockIcon'
import { useRedux } from '@/hooks/use-redux'
import { changePasswordAsync } from '@/features/auth/store/change-password'
import { Container, FormWrapper, SubTitle, Title } from './ChangePasswordForm.styled'

export const ChangePasswordForm: FC = () => {
  const { t } = useTranslation('auth')
  const { dispatch } = useRedux()

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
      dispatch(changePasswordAsync({ formData, formik }))
    },
  })

  return (
    <Container>
      <Logo />
      <form onSubmit={formik.handleSubmit} autoComplete="off">
        <FormWrapper>
          <Title>{t('change-password.title')}</Title>
          <SubTitle>{t('change-password.subtitle')}</SubTitle>
          <FormikInput
            id="password"
            name="password"
            type="password"
            size="s"
            label={{ label: t('inputs:new-password') }}
            placeholder={t('inputs:placeholder.new-password')}
            formik={formik}
            width={247}
            startAdornment={<LockIcon width="24px" height="24px" />}
          />
          <FormikInput
            id="password"
            name="confirmPassword"
            type="password"
            size="s"
            label={{ label: t('inputs:repeat-password') }}
            placeholder={t('inputs:placeholder.repeat-password')}
            formik={formik}
            width={247}
            startAdornment={<LockIcon width="24px" height="24px" />}
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
