import React, { FC, useState } from 'react'
import * as yup from 'yup'
import { useFormik } from 'formik'
import useTranslation from 'next-translate/useTranslation'

import { Flex } from '@/components/Flex'
import { IconButton } from '@peiko/components/buttons/IconButton/IconButton'
import { EditIcon } from '@peiko/components/icons/EditIcon/EditIcon'
import { TrashIcon } from '@peiko/components/icons/TrashIcon'
import { CloseIcon } from '@peiko/components/icons/CloseIcon/CloseIcon'
import { SaveIcon } from '@peiko/components/icons/SaveIcon/SaveIcon'
import { getLeadStatuses } from '@/features/leads/store/leads'
import { useRedux } from '@/hooks/use-redux'
import { leadsApi } from '@/api-rest/leads'
import { handleRestError } from '@/features/common/error'
import { FormikInput } from '@peiko/components/inputs/formik-adapters/FormikInput/FormikInput'
import { validation } from '@/utils/validation'

interface LeadStatusRowProps {
  originalItem: { id?: number; name: string; value: string; isSystem?: boolean }
  item: { id?: number; name: string; value: string; isSystem?: boolean }
  onReset: (id?: number) => void
}

export const LeadStatusRow: FC<LeadStatusRowProps> = ({
  originalItem,
  item,
  onReset,
}) => {
  const { t } = useTranslation('settings')
  const { dispatch } = useRedux()
  const [editableItem, setEditableItem] = useState(item)
  const [isEditing, setIsEditing] = useState(item?.id === -1 || false)

  const isChanged =
    editableItem.name !== originalItem.name || editableItem.value !== originalItem.value

  const handleChange = (key: 'name' | 'value', value: string) => {
    setEditableItem((prev) => ({ ...prev, [key]: value }))
  }

  const handleSave = async () => {
    const { name, value } = editableItem

    try {
      if (editableItem?.id && editableItem.id !== -1) {
        await leadsApi.updateCustomStatus(editableItem.id, { name, value })
      } else {
        await leadsApi.createCustomStatus({ name, value })
      }
      setIsEditing(false)
      dispatch(getLeadStatuses())
    } catch (e) {
      handleRestError({ e, dispatch })
    }
  }

  const handleDelete = async (id: number) => {
    try {
      await leadsApi.deleteCustomStatus(id)
      dispatch(getLeadStatuses())
    } catch (e) {
      handleRestError({ e, dispatch })
    }
  }

  const formik = useFormik({
    initialValues: {
      value: editableItem.value,
      name: editableItem.name,
    },
    validationSchema: yup.object().shape({
      value: yup
        .string()
        .matches(/^[A-Z]*$/, 'Only uppercase letters (A-Z)')
        .max(10, '10 characters maximum')
        .required('This field is required'),
      name: validation.required.max(30, '30 characters maximum'),
    }),
    onSubmit: () => undefined,
  })

  return (
    <Flex gap="14px" styles={{ marginBottom: '10px' }}>
      <FormikInput
        formik={formik}
        name="value"
        readOnly={editableItem.isSystem || !isEditing}
        width="174px"
        size="s"
        placeholder={t('change-lead-settings.status.valuePlaceholder')}
        onChange={(v) => handleChange('value', v)}
        value={editableItem.value}
      />
      <FormikInput
        formik={formik}
        name="name"
        readOnly={editableItem.isSystem || !isEditing}
        width="174px"
        size="s"
        placeholder={t('change-lead-settings.status.namePlaceholder')}
        onChange={(v) => handleChange('name', v)}
        value={editableItem.name}
      />
      <Flex styles={{ visibility: editableItem.isSystem ? 'hidden' : 'visible' }}>
        {isChanged || isEditing ? (
          <>
            <IconButton
              onClick={handleSave}
              iconColor="transparent"
              disabled={
                !editableItem.name || !editableItem.value || !isChanged || !formik.isValid
              }
            >
              <SaveIcon width="24px" height="24px" />
            </IconButton>
            <IconButton
              onClick={() => {
                setEditableItem(originalItem)
                onReset(editableItem?.id)
                if (isEditing) setIsEditing(false)
              }}
              iconColor="main13"
            >
              <CloseIcon width="24px" height="24px" />
            </IconButton>
          </>
        ) : (
          <>
            <IconButton onClick={() => setIsEditing(!isEditing)} iconColor="transparent">
              <EditIcon width="24px" height="24px" />
            </IconButton>
            <IconButton
              onClick={() => editableItem.id && handleDelete(editableItem.id)}
              iconColor="main13"
            >
              <TrashIcon width="24px" height="24px" />
            </IconButton>
          </>
        )}
      </Flex>
    </Flex>
  )
}
