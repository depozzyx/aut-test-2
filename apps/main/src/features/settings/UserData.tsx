import { Card } from '@peiko/components/Card'
import { useFormik } from 'formik'
import useTranslation from 'next-translate/useTranslation'
import React, { FC } from 'react'
import * as yup from 'yup'
import { FormikInput } from '@peiko/components/inputs/formik-adapters/FormikInput'
import { FilledButton } from '@peiko/components/buttons/FilledButton'
import { Box } from '@peiko/components/Box'
import { validation } from '@/utils/validation'
import { useTheme } from 'styled-components'
import { useAuth } from '../common/user'
import { CardTile } from './components/CardTile'
import { useUpdateProfile } from './hooks/useUpdateProfile'

export const UserData: FC = () => {
  const { t } = useTranslation('settings')
  const { user } = useAuth()
  const { palette } = useTheme()
  const { updateProfileAsync } = useUpdateProfile()

  const formik = useFormik({
    initialValues: {
      id: user?.id,
      username: user?.username,
    },
    validationSchema: yup.object().shape({
      username: validation.required,
    }),
    onSubmit: ({ username }) => {
      if (username) updateProfileAsync({ formData: { username }, formik })
    },
  })

  return (
    <Card
      margin="32px 0 40px"
      maxWidth="980px"
      padding="24px 61px"
      styles={{ width: '100%' }}
    >
      <CardTile>{t('changeName.title')}</CardTile>
      <form onSubmit={formik.handleSubmit}>
        <Box
          styles={{
            display: 'grid',
            gap: '24px',
            gridTemplateColumns: 'repeat(2, 1fr) 158px',
          }}
        >
          <FormikInput
            size="s"
            formik={formik}
            name="id"
            label={{ label: t('changeName.userId') }}
            placeholder={t('changeName.id')}
            readOnly
            inputProps={{ style: { color: palette.main22 } }}
          />
          <FormikInput
            size="s"
            formik={formik}
            name="username"
            label={{ label: t('changeName.username') }}
            placeholder={t('changeName.username')}
          />
          <FilledButton
            size="s"
            styles={{ marginLeft: '24px', marginTop: '22px' }}
            width="134px"
            type="submit"
            isLoading={formik.isSubmitting}
          >
            {t('changeName.save')}
          </FilledButton>
        </Box>
      </form>
    </Card>
  )
}
