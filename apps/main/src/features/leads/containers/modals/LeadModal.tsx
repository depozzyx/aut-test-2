import useTranslation from 'next-translate/useTranslation'
import { useModals } from '@/features/common/modals/hooks/use-modals'
import { MODAL_NAMES } from '@/features/common/modals/constants'
import { ModalMessage } from '@peiko/components/modals/ModalMessage'
import { Flex } from '@/components/Flex'
import { Text } from '@peiko/components/Text/Text'
import { TLeadData } from '@/api-rest/leads/types'
import React, { useEffect, useState } from 'react'
import { Input } from '@peiko/components/inputs/Input'
import { IconButton } from '@peiko/components/buttons/IconButton/IconButton'
import { CloseIcon } from '@peiko/components/icons/CloseIcon'
import { EditIcon } from '@peiko/components/icons/EditIcon'
import { OutlinedButton } from '@peiko/components/buttons/OutlinedButton/OutlinedButton'
import { FilledButton } from '@peiko/components/buttons/FilledButton'
import { formatCreatedAt } from '@/features/campaigns/utils/formatCreateAt'
import { getCountryName } from '@/features/campaigns/utils/getCountryByCode'
import { Select } from '@peiko/components/inputs/Select/Select'
import { leadsApi } from '@/api-rest/leads'
import { handleRestError } from '@/features/common/error'
import { useRedux } from '@/hooks/use-redux'
import { timezones } from '@/features/leads/containers/modals/index'
import { selectLeadStatuses } from '@/features/leads/store/leads'
import { LeadStatusLogTable } from './LeadStatusLogTable'

type Field = {
  isEditable: boolean
  isEditing?: boolean
  value: string
}

type Fields = {
  name: Field
  status: Field
  timezone: Field
  phone: Field
  source: Field
  campaign: Field
  lastCallAt: Field
  country: Field
}

export const LeadModal = ({
  leadData,
  onSave,
  onClose,
}: {
  leadData: TLeadData
  onSave: (id: number) => Promise<boolean>
  onClose: () => void
}): JSX.Element => {
  const { t } = useTranslation('leads-list')
  const { modalState, resetModals } = useModals()
  const { dispatch, select } = useRedux()

  const leadStatuses = select(selectLeadStatuses)

  const onCloseModal = () => {
    resetModals()
    onClose()
  }

  const showModal = modalState?.modalName === MODAL_NAMES.VIEW_LEAD && modalState.isOpen

  const initFields = () => ({
    name: {
      isEditable: true,
      isEditing: false,
      value: leadData.name,
    },
    status: {
      isEditable: true,
      isEditing: false,
      value: leadData.status,
    },
    timezone: {
      isEditable: true,
      isEditing: false,
      value: leadData.timezone,
    },
    phone: {
      isEditable: false,
      value: leadData.phone,
    },
    source: {
      isEditable: false,
      value: leadData.source,
    },
    campaign: {
      isEditable: false,
      value: leadData.leadList?.campaign?.name,
    },
    lastCallAt: {
      isEditable: false,
      value: leadData.lastCallAt && formatCreatedAt(leadData.lastCallAt),
    },
    country: {
      isEditable: false,
      value: getCountryName(leadData.countryCode) || '',
    },
  })

  const [fields, setFields] = useState<Fields>(initFields())

  const handleInputChange = (key: keyof Fields, value: string) => {
    setFields((prevState) => ({
      ...prevState,
      [key]: {
        ...prevState[key],
        value,
      },
    }))
  }

  const toggleEditing = (key: keyof Fields, isEditing: boolean) => {
    setFields((prevState) => ({
      ...prevState,
      [key]: {
        ...prevState[key],
        isEditing,
      },
    }))
  }

  const resetFields = () => {
    setFields({
      ...fields,
      name: {
        isEditable: true,
        isEditing: false,
        value: leadData.name,
      },
      status: {
        isEditable: true,
        isEditing: false,
        value: leadData.status,
      },
      timezone: {
        isEditable: true,
        isEditing: false,
        value: leadData.timezone,
      },
    })
  }

  const handleSave = async (): Promise<void> => {
    const payload = {
      name: fields.name.value,
      status: fields.status.value,
      timezone: fields.timezone.value,
    }
    try {
      await leadsApi.updateLead(leadData.id, payload)
      await onSave(leadData.id)
      setFields(initFields())
    } catch (e) {
      handleRestError({ e, dispatch })
    }
  }

  const [canSave, setCanSave] = useState<boolean>(false)

  useEffect(() => {
    setCanSave(
      (fields.name.value.trim() !== leadData.name ||
        fields.status.value !== leadData.status ||
        fields.timezone.value !== leadData.timezone) &&
        ![fields.name.value, fields.status.value, fields.timezone.value].includes(''),
    )
  }, [fields])

  const handleDelete = async (): Promise<void> => {
    try {
      await leadsApi.deleteLead(leadData.id)
      onCloseModal()
    } catch (e) {
      handleRestError({ e, dispatch })
    }
  }

  return (
    <ModalMessage
      title={t('view-lead.title')}
      open={showModal}
      onClose={onCloseModal}
      containerWidth="100%"
    >
      <Flex justify="center" align="center" direction="column" gap="10px">
        <Flex direction="column" width="100%" styles={{ marginTop: '10px' }}>
          {Object.keys(fields).map((key) => {
            const typedKey = key as keyof Fields
            return (
              <Flex
                key={key}
                styles={{
                  borderBottom: '1px solid #ccc',
                }}
              >
                <Flex justify="start" align="center" width="35%" padding="8px">
                  <Text>{t(`view-lead.fields.${key}`)}</Text>
                </Flex>
                <Flex justify="start" align="center" width="45%">
                  {fields[typedKey].isEditing && key === 'timezone' && (
                    <Select
                      name={key}
                      options={timezones.map((t) => ({ label: t, value: t }))}
                      value={fields[key].value}
                      width="100%"
                      onChange={(e) => handleInputChange(key, String(e?.value))}
                    />
                  )}
                  {fields[typedKey].isEditing && key === 'status' && (
                    <Select
                      name={key}
                      options={leadStatuses.map((status) => ({
                        label: status.name,
                        value: status.name,
                      }))}
                      value={fields[key].value}
                      width="100%"
                      onChange={(e) => handleInputChange(key, String(e?.value))}
                    />
                  )}
                  {fields[typedKey].isEditing && key === 'name' && (
                    <Input
                      name={key}
                      maxWidth="374px"
                      width="100%"
                      size="s"
                      placeholder={t(`view-lead.placeholders.${key}`)}
                      value={fields[typedKey].value}
                      onChange={(e) => handleInputChange(typedKey, e)}
                    />
                  )}
                  {!fields[typedKey].isEditing && <Text>{fields[typedKey].value}</Text>}
                </Flex>
                <Flex justify="end" align="center" width="20%">
                  {fields[typedKey].isEditable && fields[typedKey].isEditing && (
                    <IconButton
                      onClick={() => {
                        setFields((prevState) => ({
                          ...prevState,
                          [key]: {
                            ...prevState[typedKey],
                            value: leadData[key as keyof TLeadData],
                            isEditing: false,
                          },
                        }))
                      }}
                      iconColor="main13"
                    >
                      <CloseIcon width="24px" height="24px" />
                    </IconButton>
                  )}
                  {fields[typedKey].isEditable && !fields[typedKey].isEditing && (
                    <IconButton
                      onClick={() => toggleEditing(typedKey, true)}
                      iconColor="transparent"
                    >
                      <EditIcon width="24px" height="24px" />
                    </IconButton>
                  )}
                </Flex>
              </Flex>
            )
          })}
        </Flex>
        <Flex
          align="center"
          justify="center"
          gap={24}
          styles={{
            visibility: canSave ? 'visible' : 'hidden',
            marginBottom: '10px',
          }}
        >
          <OutlinedButton onClick={resetFields} width="202px">
            {t('view-lead.cancel')}
          </OutlinedButton>
          <FilledButton disabled={!canSave} width="202px" onClick={handleSave}>
            {t('view-lead.save')}
          </FilledButton>
        </Flex>
        {!!leadData.logs?.length && (
          <Flex width="100%">
            <LeadStatusLogTable logs={leadData.logs} />
          </Flex>
        )}
        <FilledButton
          styles={{ marginBottom: leadData.logs?.length ? '-24px' : '0' }}
          onClick={handleDelete}
        >
          {t('view-lead.delete')}
        </FilledButton>
      </Flex>
    </ModalMessage>
  )
}
