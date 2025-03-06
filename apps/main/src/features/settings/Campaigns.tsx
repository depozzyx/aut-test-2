import { useFormik } from 'formik'
import useTranslation from 'next-translate/useTranslation'
import React, { FC, useEffect, useState } from 'react'
import * as yup from 'yup'

import { FormikSelect } from '@peiko/components/inputs/formik-adapters/FormikSelect'
import { FilledButton } from '@peiko/components/buttons/FilledButton'
import { Box } from '@peiko/components/Box'
import { Card } from '@peiko/components/Card'
import { validation } from '@/utils/validation'
import { useSettings } from '@/features/settings/hooks/useSettings'
import { TFormik } from '@peiko/types/formik'
import {
  modes,
  coefficients,
  campaignSettingKeys,
  emptyOption,
  workHours,
  hideLeadPhoneOptions,
} from '@/constants/settings'
import { USER_ROLES } from '@/types/roles'
import { useAuth } from '@/features/common/user'
import { CardTile } from './components/CardTile'

export const Campaigns: FC = () => {
  const { t } = useTranslation('settings')
  const { getSettingsAsync, changeSettingsAsync } = useSettings()
  const { user } = useAuth()

  const [isLoaded, setIsLoaded] = useState(false)

  const initialValues = {
    [campaignSettingKeys.mode]: '',
    [campaignSettingKeys.coefficient]: '',
    [campaignSettingKeys.workHours]: '',
    [campaignSettingKeys.hidePhoneManager]: '',
    [campaignSettingKeys.hidePhoneAgent]: '',
  }

  const [originalSettings, setOriginalSettings] = useState(initialValues)

  const getSettings = async (form: TFormik) => {
    const { data } = await getSettingsAsync([
      campaignSettingKeys.mode,
      campaignSettingKeys.coefficient,
      campaignSettingKeys.workHours,
      campaignSettingKeys.hidePhoneAgent,
      campaignSettingKeys.hidePhoneManager,
    ])
    await form.setFieldValue(campaignSettingKeys.mode, data.campaignMode)
    await form.setFieldValue(campaignSettingKeys.coefficient, data.campaignCoefficient)
    await form.setFieldValue(campaignSettingKeys.workHours, data.campaignWorkHours)
    await form.setFieldValue(
      campaignSettingKeys.hidePhoneManager,
      data.campaignHidePhoneManager,
    )
    await form.setFieldValue(
      campaignSettingKeys.hidePhoneAgent,
      data.campaignHidePhoneAgent,
    )
    setOriginalSettings(data)
    setIsLoaded(true)
  }

  const formik = useFormik({
    initialValues,
    validationSchema: yup.object().shape({
      campaignMode: validation.required,
      campaignCoefficient: validation.required,
    }),
    onSubmit: async ({
      campaignMode,
      campaignCoefficient,
      campaignWorkHours,
      campaignHidePhoneManager,
      campaignHidePhoneAgent,
    }) => {
      await changeSettingsAsync({
        formData: {
          data: {
            campaignMode,
            campaignCoefficient,
            campaignWorkHours,
            campaignHidePhoneManager,
            campaignHidePhoneAgent,
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

  const isChanged = () => {
    let changed = false
    Object.keys(originalSettings).forEach((key) => {
      if (originalSettings[key] !== formik.values[key]) changed = true
    })
    return changed
  }

  return isLoaded ? (
    <Card margin="32px 0 40px" padding="24px 61px" fullWidth maxWidth="fit-content">
      <CardTile>{t('change-campaign-settings.title')}</CardTile>
      <form onSubmit={formik.handleSubmit}>
        <Box
          styles={{
            display: 'flex',
            gap: '16px',
            alignItems: 'end',
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
          <FormikSelect
            formik={formik}
            options={[emptyOption, ...workHours.map((wh) => ({ label: wh, value: wh }))]}
            width="9rem"
            name="campaignWorkHours"
            label={{ label: t('change-campaign-settings.workHours-label') }}
          />
          {user?.role !== USER_ROLES.MANAGER && (
            <FormikSelect
              formik={formik}
              options={[
                emptyOption,
                ...hideLeadPhoneOptions.map((option) => ({
                  label: t(`change-campaign-settings.hidePhone.${option}`),
                  value: option,
                })),
              ]}
              width="12rem"
              name="campaignHidePhoneManager"
              label={{ label: t('change-campaign-settings.hidePhone.manager.label') }}
            />
          )}
          <FormikSelect
            formik={formik}
            options={[
              emptyOption,
              ...hideLeadPhoneOptions.map((option) => ({
                label: t(`change-campaign-settings.hidePhone.${option}`),
                value: option,
              })),
            ]}
            width="12rem"
            name="campaignHidePhoneAgent"
            label={{ label: t('change-campaign-settings.hidePhone.agent.label') }}
          />
          <FilledButton
            size="s"
            styles={{ marginLeft: '24px' }}
            width="134px"
            type="submit"
            isLoading={formik.isSubmitting}
            disabled={!formik.isValid || !formik.dirty || !isChanged()}
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
