import { FC, useRef } from 'react'
import useTranslation from 'next-translate/useTranslation'
import { useFormik } from 'formik'
import { loginValidationSchema } from '@/utils/validation'
import { FormikInput } from '@peiko/components/inputs/formik-adapters/FormikInput'
import { NextLink } from '@peiko/components/links/NextLink'
import { FilledButton } from '@peiko/components/buttons/FilledButton'
import { EmailIcon } from '@peiko/components/icons/EmailIcon'
import { LockIcon } from '@peiko/components/icons/LockIcon'
import { Text } from '@peiko/components/Text'
import { useRedux } from '@/hooks/use-redux'
import { ROUTES } from '@/constants/routes'
import { Flex } from '@/components/Flex'
import Turnstile, { useTurnstile } from 'react-turnstile'
import { CLOUDFLARE_CAPTCHA_SITE_KEY } from '@/constants/config'
import { AuthFormCard } from './components/AuthFormCard'
import { signInAsync } from './store/sign-in'

export const SignIn: FC = () => {
  const { t } = useTranslation('auth')

  const { dispatch } = useRedux()
  const turnstile = useTurnstile()

  const emailRef = useRef<HTMLInputElement>(null)
  const passwordRef = useRef<HTMLInputElement>(null)

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      captchaToken: '',
    },
    validationSchema: loginValidationSchema,
    onSubmit: async (formData) => {
      await formik.validateForm()
      if (formik.isValid) {
        dispatch(signInAsync({ formData, formik }))
      }
    },
  })

  const resetCaptchaToken = () => {
    turnstile.reset()
    formik.setFieldValue('captchaToken', undefined)
  }

  const onCaptchaVerify = async (token: string) => {
    formik.setFieldValue('captchaToken', token)
  }

  const loginDisabled = (): boolean => {
    if (CLOUDFLARE_CAPTCHA_SITE_KEY) {
      return Boolean(
        !formik.values.captchaToken ||
          (formik.touched.email && formik.errors.email) ||
          (formik.touched.password && formik.errors.password),
      )
    }
    return Boolean(
      (formik.touched.email && formik.errors.email) ||
        (formik.touched.password && formik.errors.password),
    )
  }

  return (
    <AuthFormCard maxWidth={356} padding="32px 40px">
      <form onSubmit={formik.handleSubmit} autoComplete="off">
        <Flex direction="column" align="center" justify="center" gap={24} fullWidth>
          <Text tag="h4" variant="f4">
            {t('sign-in.title')}
          </Text>
          <Flex direction="column" align="center" justify="center" gap={16} fullWidth>
            <Flex direction="column" gap={4} fullWidth align="center">
              <FormikInput
                size="s"
                name="email"
                label={{ label: t('inputs:email') }}
                placeholder={t('inputs:placeholder.email')}
                id="email"
                formik={formik}
                width={300}
                startAdornment={<EmailIcon width="24px" height="24px" />}
                onInput={formik.handleChange}
                ref={emailRef}
              />
              {!formik.errors.email && (
                <Text variant="f10" color="main21">
                  {t('sign-in.warning')}
                </Text>
              )}
            </Flex>
            <Flex direction="column" fullWidth align="center">
              <FormikInput
                size="s"
                name="password"
                type="password"
                label={{ label: t('inputs:password') }}
                placeholder={t('inputs:placeholder.password')}
                id="password"
                formik={formik}
                width={300}
                startAdornment={<LockIcon width="24px" height="24px" />}
                onInput={formik.handleChange}
                ref={passwordRef}
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
            {CLOUDFLARE_CAPTCHA_SITE_KEY && (
              <Flex align="center" width={300} onClick={() => emailRef.current?.focus()}>
                <Turnstile
                  tabIndex={-1}
                  sitekey={CLOUDFLARE_CAPTCHA_SITE_KEY}
                  onVerify={onCaptchaVerify}
                  onExpire={resetCaptchaToken}
                  onError={resetCaptchaToken}
                  theme="light"
                  size="normal"
                />
              </Flex>
            )}
          </Flex>
          <FilledButton type="submit" size="s" width="100%" disabled={loginDisabled()}>
            {t('sign-in.action')}
          </FilledButton>
        </Flex>
      </form>
    </AuthFormCard>
  )
}
