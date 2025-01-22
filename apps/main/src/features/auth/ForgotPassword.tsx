import React, { FC, useEffect, useState } from 'react'
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
import { OutlinedButton } from '@peiko/components/buttons/OutlinedButton/OutlinedButton'
import { ROUTES } from '@/routes'
import { useRouter } from 'next/router'
import { apiAuth } from '@/api-rest/auth'
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
  const router = useRouter()

  const { statusCode } = select(selectForgotPassword)

  useUnmount(() => {
    dispatch(reset())
  })

  const [timer, setTimer] = useState(0)
  const [startTimer, setStartTimer] = useState(false)

  const formik = useFormik({
    initialValues: {
      email: '',
    },
    validationSchema: yup.object().shape({
      email: validation.email.required(),
    }),
    onSubmit: async (formData) => {
      if (timer > 0) {
        dispatch(setStatusCode('error'))
        return
      }

      const { data } = await apiAuth.checkResetPasswordTimer(formData.email)
      if (data?.data > 0) {
        setTimer(data.data)
        setStartTimer(true)
        dispatch(setStatusCode('error'))
      } else {
        dispatch(forgotPasswordAsync({ formData, formik }))
      }
    },
  })

  const handleHideNotification = () => {
    dispatch(setStatusCode(''))
  }

  const handleInputChange = async (email: string) => {
    setTimer(0)
    setStartTimer(false)
    await formik.setFieldValue('email', email)
    await formik.setFieldTouched('email', true)
  }

  const formatData = (value: number) => value.toString().padStart(2, '0')

  useEffect(() => {
    if (timer > 0 && startTimer) {
      const interval = setInterval(() => {
        setTimer((prev) => {
          if (prev <= 1) {
            clearInterval(interval)
            setStartTimer(false)
            return 0
          }
          return prev - 1
        })
      }, 1000)

      return () => clearInterval(interval)
    }
  }, [startTimer])

  return (
    <Flex direction="column" align="center" maxWidth={552} gap={12}>
      <AuthFormCard>
        <form onSubmit={formik.handleSubmit} autoComplete="off" style={{ width: '100%' }}>
          <Flex direction="column" align="center" justify="center" gap={24} fullWidth>
            <Text tag="h4" variant="f4">
              {t('forgot-password.title')}
            </Text>
            <Text variant="f7" styles={{ whiteSpace: 'nowrap' }}>
              {t('forgot-password.subtitle')}
            </Text>
            <Text variant="f7" styles={{ whiteSpace: 'nowrap' }}>
              {t('forgot-password.subtitle-annotation')}
            </Text>
            {timer > 0 && (
              <Text variant="f5">
                <span>{formatData(Math.floor(timer / 60))}:</span>
                <span>{formatData(timer % 60)}</span>
              </Text>
            )}
            <FormikInput
              size="s"
              name="email"
              label={{ label: t('inputs:email') }}
              placeholder={t('inputs:placeholder.email')}
              id="email"
              formik={formik}
              onChange={handleInputChange}
              maxWidth="248px"
              debounce={600}
              startAdornment={<EmailIcon width="24px" height="24px" />}
            />
            <Flex justify="space-between" align="center" gap={10}>
              <OutlinedButton
                onClick={() => router.push(ROUTES.SIGN_IN)}
                width="100%"
                type="button"
                size="s"
                styles={{ marginTop: '24px', maxWidth: '248px' }}
              >
                {t('forgot-password.back')}
              </OutlinedButton>
              <FilledButton
                type="submit"
                size="s"
                width="100%"
                disabled={!formik.isValid || timer > 0 || !formik.dirty}
                styles={{ marginTop: '24px', maxWidth: '248px' }}
              >
                {t('forgot-password.action')}
              </FilledButton>
            </Flex>
          </Flex>
        </form>
      </AuthFormCard>
      {statusCode && (
        <Snackbar
          status={statusCode === 'error' ? 'error' : 'info'}
          title={
            statusCode === 'error'
              ? t('forgot-password.notification.error')
              : t('forgot-password.notification.title')
          }
          onClose={handleHideNotification}
        />
      )}
    </Flex>
  )
}
