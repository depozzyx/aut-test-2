import React, { FC, useEffect, useState } from 'react'
import { IconButton } from '@peiko/components/buttons/IconButton/IconButton'
import { TrashIcon } from '@peiko/components/icons/TrashIcon'
import { Flex } from '@/components/Flex'
import { TSelectOption } from '@/components/MutliSelect/types'
import { TFormik } from '@peiko/types/formik'
import { FormikInput } from '@peiko/components/inputs/formik-adapters/FormikInput/FormikInput'
import { FormikSelect } from '@peiko/components/inputs/formik-adapters/FormikSelect/FormikSelect'
import { TRecycleRule } from '@/api-rest/campaigns/types'
import useTranslation from 'next-translate/useTranslation'
import { FormikMultiSelect } from '@/components/formik-wrappers/FormikMultiSelect'
import { fonts } from '@peiko/styles/fonts'
import { palette } from '@peiko/styles/palette'
import { TStyle } from '@peiko/styles'

interface Props {
  formik: TFormik
  index: number
  statuses: TSelectOption[]
}

const menuPortalStyle = {
  menuPortal: (base: TStyle) => ({
    ...base,
    zIndex: 2000,
    ...Object.fromEntries(
      fonts.f8.split(';').map((prop) => prop.split(':').map((value) => value.trim())),
    ),
  }),
  menu: (base: TStyle) => ({
    ...base,
    // Custom scrollbar styles
  }),
  menuList: (base: TStyle) => ({
    ...base,
    // For Webkit browsers
    '::-webkit-scrollbar': {
      border: `1px solid ${palette.base3}`,
    },
    '::-webkit-scrollbar-thumb': {
      backgroundColor: palette.main8,
    },
    '&--is-selected': {
      cursor: 'default',
      backgroundColor: palette.base4,
      color: palette.main2,
    },
  }),
  menuOptions: (base: TStyle) => ({
    ...base,
    '&--is-focused': {
      backgroundColor: palette.base4,
    },
    '&:hover': {
      backgroundColor: palette.base4,
    },
  }),
  option: (base: TStyle, state: any = {}) => ({
    ...base,
    cursor: 'pointer',
    backgroundColor: state.isSelected ? palette.base4 : base.backgroundColor,
    color: state.isSelected ? palette.main2 : base.color,
    ...(state.isFocused && {
      backgroundColor: palette.base4,
    }),
    ':hover': {
      backgroundColor: palette.base4,
    },
  }),
}

export const RecycleRuleRow: FC<Props> = ({ formik, index, statuses }) => {
  const [disabled, setDisabled] = useState(false)
  const { t } = useTranslation('campaigns')

  useEffect(
    () => setDisabled(index !== 0 && !formik.values.recycleRules[0].status),
    [formik, index],
  )

  return (
    <Flex width="100%" direction="column" styles={{ marginBottom: '8px' }}>
      <Flex gap="12px" align="start" styles={{ marginBottom: '8px' }}>
        <FormikMultiSelect
          menuPortalTarget={document.body}
          styles={menuPortalStyle}
          formik={formik}
          name={`recycleRules[${index}].status`}
          emitValues
          label={{ label: t('create-campaign.recycle-rule-status') }}
          options={statuses.filter(
            (option) =>
              !formik.values.recycleRules
                .filter((_: TRecycleRule, i: number) => i !== index)
                .flatMap((r: TRecycleRule) => r.status)
                .includes(option.value),
          )}
          width="100%"
          maxMenuHeight={150}
          disabled={disabled}
          isSearchable
        />
        <IconButton
          styles={{ alignSelf: 'flex-end' }}
          iconColor="main13"
          onClick={() =>
            formik.setFieldValue(
              `recycleRules`,
              formik.values.recycleRules.filter(
                (_: TRecycleRule, i: number) => i !== index,
              ),
            )
          }
          disabled={disabled}
        >
          <TrashIcon width="20px" height="20px" />
        </IconButton>
      </Flex>
      <Flex gap="12px" align="start" styles={{ marginBottom: '8px' }}>
        <FormikInput
          formik={formik}
          type="time"
          label={{ label: t('create-campaign.recycle-rule-delay') }}
          name={`recycleRules[${index}].delay`}
          width="80px"
          size="s"
          disabled={disabled}
        />
        <FormikInput
          formik={formik}
          name={`recycleRules[${index}].attempts`}
          label={{ label: t('create-campaign.recycle-rule-attempts') }}
          type="number"
          placeholder=""
          width="100px"
          size="s"
          disabled={disabled}
        />
        <FormikSelect
          menuPortalTarget={document.body}
          styles={menuPortalStyle}
          formik={formik}
          name={`recycleRules[${index}].finalStatus`}
          label={{ label: t('create-campaign.recycle-rule-final-status') }}
          width="50%"
          options={statuses.filter(
            (option) =>
              !formik.values.recycleRules[index]?.status?.includes(option.value),
          )}
          maxMenuHeight={150}
          isSearchable
        />
      </Flex>
    </Flex>
  )
}
