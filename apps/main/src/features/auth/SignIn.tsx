import { FC } from 'react'
import useTranslation from 'next-translate/useTranslation'
import { useFormik } from 'formik'
import * as yup from 'yup'
import { validation } from '@/utils/validation'
import { FormikInput } from '@peiko/components/inputs/formik-adapters/FormikInput'
import { NextLink } from '@peiko/components/links/NextLink'
import { FilledButton } from '@peiko/components/buttons/FilledButton'
import { EmailIcon } from '@peiko/components/icons/EmailIcon'
import { LockIcon } from '@peiko/components/icons/LockIcon'
import { Text } from '@peiko/components/Text'
import { useRedux } from '@/hooks/use-redux'
import { ROUTES } from '@/constants/routes'
import { Flex } from '@/components/Flex'
import { AuthFormCard } from './components/AuthFormCard'
import { signInAsync } from './store/sign-in'

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
    <AuthFormCard maxWidth={356} padding="32px 40px">
      <form onSubmit={formik.handleSubmit} autoComplete="off">
        <Flex direction="column" align="center" justify="center" gap={24} fullWidth>
          <Text tag="h4" variant="f4">
            {t('sign-in.title')}
          </Text>
          <Flex direction="column" align="center" justify="center" gap={16} fullWidth>
            <Flex direction="column" gap={4} fullWidth>
              <FormikInput
                size="s"
                name="email"
                label={{ label: t('inputs:email') }}
                placeholder={t('inputs:placeholder.email')}
                id="email"
                formik={formik}
                width={256}
                startAdornment={<EmailIcon width="24px" height="24px" />}
              />
              {!formik.errors.email && (
                <Text variant="f10" color="main21">
                  {t('sign-in.warning')}
                </Text>
              )}
            </Flex>
            <FormikInput
              size="s"
              name="password"
              type="password"
              label={{ label: t('inputs:password') }}
              placeholder={t('inputs:placeholder.password')}
              id="password"
              formik={formik}
              width={256}
              startAdornment={<LockIcon width="24px" height="24px" />}
            />
          </Flex>
          <NextLink href={ROUTES.FORGOT_PASSWORD}>
            <Text
              variant="f10"
              styles={{
                alignSelf: 'flex-end',
                textDecoration: 'underline',
                cursor: 'pointer',
              }}
            >
              {t('forgot-password-link')}
            </Text>
          </NextLink>
          <FilledButton
            type="submit"
            size="s"
            width="100%"
            disabled={!formik.isValid || !formik.dirty}
          >
            {t('sign-in.action')}
          </FilledButton>
        </Flex>
      </form>
    </AuthFormCard>
  )
}
