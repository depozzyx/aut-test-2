import { Card } from '@peiko/components/Card'
import { useFormik } from 'formik'
import useTranslation from 'next-translate/useTranslation'
import React, { FC, useEffect, useState } from 'react'

import * as yup from 'yup'
import { FormikSelect } from '@peiko/components/inputs/formik-adapters/FormikSelect'
import { FilledButton } from '@peiko/components/buttons/FilledButton'
import { Box } from '@peiko/components/Box'
import { validation } from '@/utils/validation'
import { useSettings } from '@/features/settings/hooks/useSettings'
import { TFormik } from '@peiko/types/formik'
import { modes, coefficients, campaignSettingKeys } from '@/constants/settings'
import { CardTile } from './components/CardTile'

export const Campaigns: FC = () => {
  const { t } = useTranslation('settings')
  const { getSettingsAsync, changeSettingsAsync } = useSettings()

  const [isLoaded, setIsLoaded] = useState(false)

  const getSettings = async (form: TFormik) => {
    const { data } = await getSettingsAsync([
      campaignSettingKeys.mode,
      campaignSettingKeys.coefficient,
    ])
    await form.setFieldValue(campaignSettingKeys.mode, data.campaignMode)
    await form.setFieldValue(campaignSettingKeys.coefficient, data.campaignCoefficient)
    setIsLoaded(true)
  }

  const formik = useFormik({
    initialValues: {
      campaignMode: '',
      campaignCoefficient: '',
    },
    validationSchema: yup.object().shape({
      campaignMode: validation.required,
      campaignCoefficient: validation.required,
    }),
    onSubmit: async ({ campaignMode, campaignCoefficient }) => {
      await changeSettingsAsync({
        formData: {
          data: {
            campaignMode,
            campaignCoefficient,
          },
        },
        formik,
      })
      await getSettings(formik)
    },
  })

  useEffect(() => {
    getSettings(formik)
  }, [])

  return isLoaded ? (
    <Card margin="32px 0 40px" padding="24px 61px" fullWidth maxWidth="fit-content">
      <CardTile>{t('change-campaign-settings.title')}</CardTile>
      <form onSubmit={formik.handleSubmit}>
        <Box
          styles={{
            display: 'grid',
            gap: '24px',
            gridTemplateColumns: 'repeat(2, 1fr) 158px',
          }}
        >
          <FormikSelect
            formik={formik}
            options={modes.map((mode) => ({
              label: String(mode),
              value: String(mode),
            }))}
            width="7rem"
            name="campaignMode"
            label={{ label: t('change-campaign-settings.mode-label') }}
          />
          <FormikSelect
            formik={formik}
            options={coefficients.map((number) => ({
              label: String(number),
              value: String(number),
            }))}
            width="7rem"
            name="campaignCoefficient"
            label={{ label: t('change-campaign-settings.coefficient-label') }}
          />
          <FilledButton
            size="s"
            styles={{ marginLeft: '24px', marginTop: '22px' }}
            width="134px"
            type="submit"
            isLoading={formik.isSubmitting}
            disabled={!formik.isValid || !formik.dirty}
          >
            {t('change-campaign-settings.save')}
          </FilledButton>
        </Box>
      </form>
    </Card>
  ) : (
    <></>
  )
}
