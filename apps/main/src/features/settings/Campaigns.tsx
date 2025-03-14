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
  campaignSettingKeys,
  coefficients,
  emptyOption,
  hideFirstPhoneOption,
  hideLastPhoneOption,
  hideLeadPhoneOptions,
  hidePhoneAmountOptions,
  hideWholePhoneOption,
  modes,
  workHours,
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
    [campaignSettingKeys.hidePhoneAmountManager]: '',
    [campaignSettingKeys.hidePhoneAgent]: '',
    [campaignSettingKeys.hidePhoneAmountAgent]: '',
  }

  const [originalSettings, setOriginalSettings] = useState(initialValues)

  const getSettings = async (form: TFormik) => {
    const { data } = await getSettingsAsync([
      campaignSettingKeys.mode,
      campaignSettingKeys.coefficient,
      campaignSettingKeys.workHours,
      campaignSettingKeys.hidePhoneAgent,
      campaignSettingKeys.hidePhoneAmountManager,
      campaignSettingKeys.hidePhoneManager,
      campaignSettingKeys.hidePhoneAmountAgent,
    ])
    await form.setFieldValue(campaignSettingKeys.mode, data.campaignMode)
    await form.setFieldValue(campaignSettingKeys.coefficient, data.campaignCoefficient)
    await form.setFieldValue(campaignSettingKeys.workHours, data.campaignWorkHours)
    await form.setFieldValue(
      campaignSettingKeys.hidePhoneManager,
      data.campaignHidePhoneManager,
    )
    await form.setFieldValue(
      campaignSettingKeys.hidePhoneAmountManager,
      data.campaignHidePhoneAmountManager,
    )
    await form.setFieldValue(
      campaignSettingKeys.hidePhoneAgent,
      data.campaignHidePhoneAgent,
    )
    await form.setFieldValue(
      campaignSettingKeys.hidePhoneAmountAgent,
      data.campaignHidePhoneAmountAgent,
    )
    setOriginalSettings(data)
    setIsLoaded(true)
  }

  const formik = useFormik({
    initialValues,
    validationSchema: yup.object().shape({
      campaignMode: validation.required,
      campaignCoefficient: validation.required,
      campaignHidePhoneAmountManager: yup.string(),
    }),
    onSubmit: async (values) => {
      await changeSettingsAsync({
        formData: { data: values },
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

  const isManagerAmountInValid = () =>
    [hideFirstPhoneOption, hideLastPhoneOption].includes(
      formik.values.campaignHidePhoneManager,
    ) && !formik.values.campaignHidePhoneAmountManager

  const isAgentAmountInValid = () =>
    [hideFirstPhoneOption, hideLastPhoneOption].includes(
      formik.values.campaignHidePhoneAgent,
    ) && !formik.values.campaignHidePhoneAmountAgent

  useEffect(() => {
    if (isAgentAmountInValid() || isManagerAmountInValid()) {
      console.warn('setFieldError')
      formik.setFieldError('campaignHidePhoneAmountManager', 'required')
    }
  }, [isAgentAmountInValid(), isAgentAmountInValid()])

  return isLoaded ? (
    <Card margin="32px 0 40px" padding="24px 61px" fullWidth maxWidth="fit-content">
      <CardTile>{t('change-campaign-settings.title')}</CardTile>
      <form onSubmit={formik.handleSubmit}>
        <Box
          styles={{
            display: 'flex',
            gap: '36px',
            alignItems: 'start',
            flexDirection: 'column',
          }}
        >
          <Box
            styles={{
              display: 'flex',
              gap: '16px',
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
              options={[
                emptyOption,
                ...workHours.map((wh) => ({ label: wh, value: wh })),
              ]}
              width="9rem"
              name="campaignWorkHours"
              label={{ label: t('change-campaign-settings.workHours-label') }}
            />
          </Box>
          <Box
            styles={{
              gap: '32px 24px',
              display: 'flex',
              alignItems: 'start',
            }}
          >
            {user?.role !== USER_ROLES.MANAGER && (
              <Box
                styles={{
                  display: 'flex',
                  gap: '16px',
                  alignItems: 'start',
                  marginRight: '24px',
                }}
              >
                <FormikSelect
                  formik={formik}
                  options={[
                    emptyOption,
                    ...hideLeadPhoneOptions.map((option) => ({
                      label: t(`change-campaign-settings.hidePhone.${option}`),
                      value: option,
                    })),
                  ]}
                  onChange={(e) => {
                    if (
                      [hideWholePhoneOption, emptyOption.value].includes(
                        e?.value as string,
                      )
                    ) {
                      formik.setFieldValue(
                        'campaignHidePhoneAmountManager',
                        emptyOption.value,
                      )
                    }
                  }}
                  width="12rem"
                  size="s"
                  name="campaignHidePhoneManager"
                  label={{ label: t('change-campaign-settings.hidePhone.manager.label') }}
                />
                <FormikSelect
                  disabled={[hideWholePhoneOption, emptyOption.value].includes(
                    formik.values.campaignHidePhoneManager,
                  )}
                  formik={formik}
                  options={hidePhoneAmountOptions.concat(
                    [hideWholePhoneOption, emptyOption.value].includes(
                      formik.values.campaignHidePhoneManager,
                    )
                      ? [emptyOption]
                      : [],
                  )}
                  size="s"
                  width="7rem"
                  name="campaignHidePhoneAmountManager"
                  label={{
                    label: t('change-campaign-settings.hidePhone.manager.amount-label'),
                  }}
                />
              </Box>
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
              onChange={(e) => {
                if (
                  [hideWholePhoneOption, emptyOption.value].includes(e?.value as string)
                ) {
                  formik.setFieldValue('campaignHidePhoneAmountAgent', emptyOption.value)
                }
              }}
              width="12rem"
              size="s"
              name="campaignHidePhoneAgent"
              label={{ label: t('change-campaign-settings.hidePhone.agent.label') }}
            />
            <FormikSelect
              disabled={[hideWholePhoneOption, emptyOption.value].includes(
                formik.values.campaignHidePhoneAgent,
              )}
              formik={formik}
              options={hidePhoneAmountOptions.concat(
                [hideWholePhoneOption, emptyOption.value].includes(
                  formik.values.campaignHidePhoneAgent,
                )
                  ? [emptyOption]
                  : [],
              )}
              width="7rem"
              size="s"
              name="campaignHidePhoneAmountAgent"
              label={{
                label: t('change-campaign-settings.hidePhone.agent.amount-label'),
              }}
            />
            <FilledButton
              styles={{ marginLeft: '24px', marginTop: '20px' }}
              width="134px"
              type="submit"
              isLoading={formik.isSubmitting}
              disabled={
                !formik.isValid ||
                !formik.dirty ||
                !isChanged() ||
                isManagerAmountInValid() ||
                isAgentAmountInValid()
              }
            >
              {t('change-campaign-settings.save')}
            </FilledButton>
          </Box>
        </Box>
      </form>
    </Card>
  ) : (
    <></>
  )
}
