import useTranslation from 'next-translate/useTranslation'
import { useModals } from '@/features/common/modals/hooks/use-modals'
import { MODAL_NAMES } from '@/features/common/modals/constants'
import { ModalMessage } from '@peiko/components/modals/ModalMessage'
import { Flex } from '@/components/Flex'
import { Text } from '@peiko/components/Text/Text'
import { TLeadData, TUpdateLeadReq } from '@/api-rest/leads/types'
import React, { useEffect, useState } from 'react'
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
// import { timezones } from '@/features/leads/containers/modals/index'
import { selectLeadStatuses } from '@/features/leads/store/leads'
import { useTheme } from 'styled-components'
import { getLeadStatus } from '@/features/leads/containers/LeadsTable'
import { useFormik } from 'formik'
import { editLeadValidationSchema } from '@/utils/validation'
import { FormikInput } from '@peiko/components/inputs/formik-adapters/FormikInput'
import { CAMPAIGN_STATUSES } from '@/features/campaigns/constants'
import { LeadStatusLogTable } from './components/LeadStatusLogTable'

type Field = {
  isEditable: boolean
  isEditing?: boolean
  value: string
  display?: (val: TLeadData) => string
}

type Fields = {
  name: Field
  status: Field
  timezone: Field
  phone: Field
  source: Field
  campaign: Field
  leadList: Field
  lastCallAt: Field
  country: Field
  rank: Field
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
  const theme = useTheme()

  const { modalState, resetModals } = useModals()
  const { dispatch, select } = useRedux()

  const leadStatuses = select(selectLeadStatuses)

  const onCloseModal = () => {
    resetModals()
    onClose()
  }

  const showModal = modalState?.modalName === MODAL_NAMES.VIEW_LEAD && modalState.isOpen

  const formik = useFormik({
    initialValues: {
      name: leadData.name,
    },
    onSubmit: async () => null,
    validationSchema: editLeadValidationSchema,
  })

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
      display: (val: TLeadData) => getLeadStatus(leadStatuses, val.status),
    },
    timezone: {
      isEditable: false,
      isEditing: false,
      value: leadData.timezone,
      display: (val: TLeadData) => `${val.tzId} (${val.timezone})`,
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
    leadList: {
      isEditable: false,
      value: leadData.leadList?.name,
    },
    lastCallAt: {
      isEditable: false,
      value: leadData.lastCallAt && formatCreatedAt(leadData.lastCallAt, true),
    },
    country: {
      isEditable: false,
      value: getCountryName(leadData.countryCode) || '',
    },
    rank: {
      isEditable: false,
      value: leadData.rank.toString() || '0',
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
        ...fields.name,
        isEditing: false,
        value: leadData.name,
      },
      status: {
        ...fields.status,
        isEditing: false,
        value: leadData.status,
      },
    })
    formik.resetForm({
      values: {
        name: leadData.name,
      },
    })
  }

  const handleSave = async (): Promise<void> => {
    const payload: TUpdateLeadReq = {
      name: leadData.name !== fields.name.value ? fields.name.value : undefined,
      status: leadData.status !== fields.status.value ? fields.status.value : undefined,
    }
    Object.keys(payload).forEach((key) => {
      const typedKey = key as keyof TUpdateLeadReq
      if (!payload[typedKey]) {
        delete payload[typedKey]
      }
    })

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
        fields.status.value !== leadData.status) &&
        ![fields.name.value, fields.status.value].includes(''),
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
  const getFieldText = (field: Field): string => {
    if (field.display) {
      return field.display(leadData)
    }
    return field.value
  }

  return (
    <ModalMessage
      title={t('view-lead.title')}
      open={showModal}
      onClose={onCloseModal}
      containerWidth="100%"
    >
      <Flex justify="center" align="center" direction="column" gap="5px">
        <Flex direction="column" width="100%" styles={{ marginTop: '5px' }}>
          {Object.keys(fields).map((key) => {
            const typedKey = key as keyof Fields
            return (
              <Flex
                key={key}
                styles={{
                  borderBottom: `1px solid ${theme.palette.main22}`,
                }}
              >
                <Flex justify="start" align="center" width="35%" padding="10px">
                  <Text variant="f8">{t(`view-lead.fields.${key}`)}</Text>
                </Flex>
                <Flex justify="start" align="center" width="45%">
                  {fields[typedKey].isEditing && key === 'status' && (
                    <Select
                      name={key}
                      options={leadStatuses.map(({ name: label, value }) => ({
                        label,
                        value,
                      }))}
                      value={fields[key].value}
                      width="100%"
                      onChange={(e) => handleInputChange(key, String(e?.value))}
                    />
                  )}
                  {fields[typedKey].isEditing && key === 'name' && (
                    <FormikInput
                      name={key}
                      formik={formik}
                      maxWidth="374px"
                      width="100%"
                      size="s"
                      placeholder={t(`view-lead.placeholders.${key}`)}
                      value={fields[typedKey].value}
                      onChange={(e) => {
                        handleInputChange(typedKey, e)
                        formik.setFieldValue('name', e)
                      }}
                    />
                  )}
                  {!fields[typedKey].isEditing && (
                    <Text variant="f8">{getFieldText(fields[typedKey])}</Text>
                  )}
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
                        if (key === 'name') {
                          formik.setFieldValue('name', leadData.name)
                        }
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
          <FilledButton
            disabled={!canSave || !formik.isValid}
            width="202px"
            onClick={handleSave}
          >
            {t('view-lead.save')}
          </FilledButton>
          <OutlinedButton onClick={resetFields} width="202px">
            {t('view-lead.cancel')}
          </OutlinedButton>
        </Flex>
        <Flex width="100%">
          <LeadStatusLogTable logs={leadData.logs} leadStatuses={leadStatuses} />
        </Flex>
        <FilledButton
          styles={{ marginBottom: leadData.logs?.length ? '-24px' : '0' }}
          onClick={handleDelete}
          disabled={
            leadData?.leadList?.campaign?.status === CAMPAIGN_STATUSES.COMPLETE ||
            leadData?.leadList?.campaign?.status === CAMPAIGN_STATUSES.ACTIVE
          }
        >
          {t('view-lead.delete')}
        </FilledButton>
      </Flex>
    </ModalMessage>
  )
}
