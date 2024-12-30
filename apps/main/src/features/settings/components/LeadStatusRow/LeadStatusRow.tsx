import { Flex } from '@/components/Flex'
import React, { FC, useState } from 'react'
import useTranslation from 'next-translate/useTranslation'
import { IconButton } from '@peiko/components/buttons/IconButton/IconButton'
import { EditIcon } from '@peiko/components/icons/EditIcon/EditIcon'
import { TrashIcon } from '@peiko/components/icons/TrashIcon'
import { Input } from '@peiko/components/inputs/Input'
import { CloseIcon } from '@peiko/components/icons/CloseIcon/CloseIcon'
import { SaveIcon } from '@peiko/components/icons/SaveIcon/SaveIcon'
import { getLeadStatuses } from '@/features/leads/store/leads'
import { useRedux } from '@/hooks/use-redux'
import { leadsApi } from '@/api-rest/leads'
import { handleRestError } from '@/features/common/error'

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

  return (
    <Flex gap="14px" styles={{ marginBottom: '10px' }}>
      <Input
        name="value"
        readOnly={editableItem.isSystem || !isEditing}
        width="174px"
        size="s"
        placeholder={t('change-lead-settings.status.valuePlaceholder')}
        onChange={(v) => handleChange('value', v)}
        value={editableItem.value}
      />
      <Input
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
              disabled={!editableItem.name || !editableItem.value || !isChanged}
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
