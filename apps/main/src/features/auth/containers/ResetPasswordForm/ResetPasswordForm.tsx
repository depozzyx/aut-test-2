import { FC } from 'react'
import * as yup from 'yup'
import { useFormik } from 'formik'
import useTranslation from 'next-translate/useTranslation'
import { FilledButton } from '@peiko/components/buttons/FilledButton'
import { FormikInput } from '@peiko/components/inputs/formik-adapters/FormikInput'
import { LockIcon } from '@peiko/components/icons/LockIcon'
import { Text } from '@peiko/components/Text'
import { validation } from '@/utils/validation'
import { useRedux } from '@/hooks/use-redux'
import { Flex } from '@/components/Flex'
import { resetPasswordAsync } from '../../store/reset-password'
import { AuthFormCard } from '../../components/AuthFormCard'

export const ResetPasswordForm: FC = () => {
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
      dispatch(resetPasswordAsync({ formData, formik }))
    },
  })

  return (
    <AuthFormCard maxWidth={552}>
      <form onSubmit={formik.handleSubmit} autoComplete="off">
        <Flex direction="column" align="center" justify="center" gap={24}>
          <Text tag="h4" variant="f4">
            {t('reset-password.title')}
          </Text>
          <Text variant="f7" styles={{ textAlign: 'center' }}>
            {t('reset-password.subtitle')}
          </Text>
          <FormikInput
            id="password"
            name="password"
            type="password"
            size="s"
            label={{ label: t('inputs:new-password') }}
            placeholder={t('inputs:placeholder.new-password')}
            formik={formik}
            maxWidth="248px"
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
            maxWidth="248px"
            startAdornment={<LockIcon width="24px" height="24px" />}
          />
          <FilledButton
            type="submit"
            size="s"
            width="100%"
            styles={{ marginTop: '24px', maxWidth: '248px' }}
            disabled={!formik.isValid || !formik.dirty}
          >
            {t('common:confirm')}
          </FilledButton>
        </Flex>
      </form>
    </AuthFormCard>
  )
}
