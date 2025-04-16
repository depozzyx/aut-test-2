import { Card } from '@peiko/components/Card'
import { useFormik } from 'formik'
import useTranslation from 'next-translate/useTranslation'
import React, { FC } from 'react'
import { FormikInput } from '@peiko/components/inputs/formik-adapters/FormikInput'
import { FilledButton } from '@peiko/components/buttons/FilledButton'
import { Box } from '@peiko/components/Box'
import { Text } from '@peiko/components/Text'
import { changePasswordValidationSchema } from '@/utils/validation'
import { CardTile } from './components/CardTile'
import { useChangePassword } from './hooks/useChangePassword'

export const ChangePassword: FC = () => {
  const { t } = useTranslation('settings')
  const { changePasswordAsync } = useChangePassword()

  const formik = useFormik({
    initialValues: {
      currentPassword: '',
      password: '',
      confirmPassword: '',
    },
    validationSchema: changePasswordValidationSchema,
    onSubmit: (formData) => {
      changePasswordAsync({ formData, formik })
    },
  })

  return (
    <Card
      maxWidth="980px"
      padding="24px 61px"
      styles={{ width: '100%', marginTop: '40px' }}
    >
      <CardTile>{t('changePassword.title')}</CardTile>
      <form onSubmit={formik.handleSubmit}>
        <Box
          styles={{
            display: 'grid',
            gap: '32px 24px',
            gridTemplateColumns: 'repeat(2, 1fr) 158px',
          }}
        >
          <FormikInput
            type="password"
            size="s"
            formik={formik}
            name="currentPassword"
            label={{ label: t('changePassword.oldPasswordLabel') }}
            placeholder={t('changePassword.oldPasswordPlaceholder')}
          />
          <span />
          <span />
          <FormikInput
            type="password"
            size="s"
            formik={formik}
            name="password"
            label={{ label: t('changePassword.newPasswordLabel') }}
            placeholder={t('changePassword.newPasswordPlaceholder')}
          />
          <FormikInput
            type="password"
            size="s"
            formik={formik}
            name="confirmPassword"
            label={{ label: t('changePassword.repeatNewPasswordLabel') }}
            placeholder={t('changePassword.repeatNewPasswordPlaceholder')}
          />
          <FilledButton
            size="s"
            styles={{ marginLeft: '24px', marginTop: '22px' }}
            width="134px"
            type="submit"
            isLoading={formik.isSubmitting}
            disabled={!formik.dirty || !formik.isValid}
          >
            {t('changePassword.save')}
          </FilledButton>
        </Box>
      </form>
      <Text color="main5" variant="f10" styles={{ marginTop: '4px' }}>
        {t('changePassword.passwordConditions')}
      </Text>
    </Card>
  )
}
