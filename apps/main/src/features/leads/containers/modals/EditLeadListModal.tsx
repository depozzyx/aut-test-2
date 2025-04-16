import React, { useCallback, useEffect, useState } from 'react'

import useTranslation from 'next-translate/useTranslation'
import { useModals } from '@/features/common/modals/hooks/use-modals'
import { MODAL_NAMES } from '@/features/common/modals/constants'
import { ModalMessage } from '@peiko/components/modals/ModalMessage'
import { TLeadListData, TUpdateLeadListReq } from '@/api-rest/lead-list/types'
import { Flex } from '@/components/Flex'
import { Text } from '@peiko/components/Text/Text'
import { formatCreatedAt } from '@/features/campaigns/utils/formatCreateAt'
import { useTheme } from 'styled-components'
import { TLeadOption } from '@/api-rest/leads/types'
import { FormikMultiSelect } from '@/components/formik-wrappers/FormikMultiSelect'
import { useFormik } from 'formik'
import { OutlinedButton } from '@peiko/components/buttons/OutlinedButton/OutlinedButton'
import { FilledButton } from '@peiko/components/buttons/FilledButton'
import { apiLeadList } from '@/api-rest/lead-list'
import { handleRestError } from '@/features/common/error'
import { useRedux } from '@/hooks/use-redux'
import { leadsApi } from '@/api-rest/leads'
import { hasArrayChanged } from '@/utils/array'
import { FormikSelect } from '@peiko/components/inputs/formik-adapters/FormikSelect/FormikSelect'
import { CAMPAIGN_STATUSES } from '@/features/campaigns/constants'

export const EditLeadListModal = ({
  leadListData,
  assignedLeads,
  initialLeadIds,
  onClose,
}: {
  leadListData: TLeadListData
  assignedLeads: TLeadOption[]
  initialLeadIds: number[]
  onClose: () => void
}): JSX.Element => {
  const { t } = useTranslation('leads-list')
  const theme = useTheme()

  const { dispatch } = useRedux()

  const { t: campaign } = useTranslation('campaigns')

  const { modalState, resetModals } = useModals()

  const onCloseModal = () => {
    resetModals()
    onClose()
  }

  const showModal =
    modalState?.modalName === MODAL_NAMES.EDIT_LEAD_LIST && modalState.isOpen

  const rows = [
    { name: t('view-lead-list.name'), value: leadListData.name },
    { name: 'active', value: '' },
    { name: t('view-lead-list.leadCount'), value: leadListData.leadCount },
    { name: 'leads', value: '' },
    { name: t('view-lead-list.campaignName'), value: leadListData.campaignName },
    {
      name: t('view-lead-list.campaignStatus'),
      value:
        leadListData.campaignStatus &&
        campaign(`statuses.${leadListData.campaignStatus}`).toLowerCase(),
    },
    {
      name: t('view-lead-list.lastCallDate'),
      value:
        leadListData.lastCallDate && formatCreatedAt(leadListData.lastCallDate, true),
    },
  ]

  const [leadOptions, setLeadOptions] = useState<TLeadOption[]>([])
  const [pagination, setPagination] = useState({
    total: 1,
    limit: 10,
    page: 1,
  })

  type TFormValues = {
    assignedLeadIds: number[]
    active: boolean
  }

  const formik = useFormik<TFormValues>({
    initialValues: {
      assignedLeadIds: [],
      active: leadListData.active,
    },
    onSubmit: async (values) => {
      const payload: TUpdateLeadListReq = {}
      if (values.active !== leadListData.active) {
        payload.active = values.active
      }
      const isChangedLeadIds = hasArrayChanged<number>(
        assignedLeads.map((l) => l.value),
        values.assignedLeadIds,
      )
      if (isChangedLeadIds) {
        payload.ids = values.assignedLeadIds
      }
      try {
        await apiLeadList.updateLeadList(leadListData.id, payload)
        onClose()
        resetModals()
      } catch (e) {
        handleRestError({ e, dispatch })
      }
    },
  })

  const getLeadsOptions = async (append?: boolean) => {
    const currentAssignedLeads = formik.getFieldProps('assignedLeadIds').value
    try {
      const { data } = await leadsApi.getLeadsForSelect()
      if (data?.data) {
        setPagination((prevState) => ({ ...prevState, total: data.data.length }))
        const options = data.data.filter(
          (option) => !currentAssignedLeads.includes(option.value),
        )
        setLeadOptions(
          append ? [...leadOptions, ...options] : [...options, ...assignedLeads],
        )
      }
    } catch (e) {
      handleRestError({ e, dispatch })
    }
  }

  useEffect(() => {
    if (assignedLeads) {
      // console.warn({ assignedLeads })
      formik.setFieldValue(
        'assignedLeadIds',
        assignedLeads.map((option) => option.value),
      )
    }
  }, [assignedLeads])

  useEffect(() => {
    getLeadsOptions()
  }, [])

  const onLeadsScrollToBottom = useCallback(() => {
    const { total, limit, page } = pagination
    const lastPage = total === 0 ? 1 : Math.ceil(total / (limit ?? 10))
    if (page < lastPage) {
      setPagination({
        page: page + 1,
        total,
        limit,
      })
    }
  }, [pagination])

  const [canSave, setCanSave] = useState(false)

  /** prevent to delete initial leads lists for completed campaign */
  useEffect(() => {
    if (
      leadListData?.campaignStatus === CAMPAIGN_STATUSES.COMPLETE &&
      initialLeadIds.length
    ) {
      const missingInitialItems = initialLeadIds.filter(
        (id) => !formik.values.assignedLeadIds.includes(id),
      )

      if (missingInitialItems.length) {
        // console.debug(`missing ${missingInitialItems}`) // todo
        formik.setFieldValue(
          'assignedLeadIds',
          Array.from(new Set([...formik.values.assignedLeadIds, ...missingInitialItems])),
        )
      }
    }
  }, [formik.values.assignedLeadIds, leadListData, initialLeadIds])

  useEffect(() => {
    setCanSave(
      leadListData.active !== formik.values.active ||
        hasArrayChanged<number>(
          assignedLeads.map((l) => l.value),
          formik.getFieldProps('assignedLeadIds').value,
        ),
    )
  }, [formik])

  return (
    <ModalMessage
      title={t('view-lead-list.title')}
      open={showModal}
      onClose={onCloseModal}
      containerWidth="100%"
    >
      <form onSubmit={formik.handleSubmit} autoComplete="off">
        <Flex
          justify="center"
          align="center"
          direction="column"
          styles={{ marginTop: '40px', width: '100%' }}
        >
          <Flex
            direction="column"
            justify="center"
            align="center"
            styles={{
              width: '100%',
              maxWidth: '400px',
            }}
          >
            {rows.map((row) => (
              <Flex
                key={row.name}
                justify="start"
                align="center"
                styles={{
                  display: 'flex',
                  width: '100%',
                  padding: row.name === 'active' ? '3px 0' : '8px 0',
                  borderBottom: `1px solid ${theme.palette.main22}`,
                }}
              >
                <Flex
                  styles={{
                    flex: row.name === 'leads' ? 0 : 1,
                    textAlign: 'start',
                  }}
                >
                  {row.name === 'leads' ? (
                    <></>
                  ) : (
                    <Text variant="f8">
                      {row.name === 'active' ? t('view-lead-list.status') : row.name}
                    </Text>
                  )}
                </Flex>
                <Flex
                  styles={{
                    flex: '1',
                    textAlign: 'start',
                  }}
                >
                  {row.name === 'active' && (
                    <FormikSelect
                      styles={{ padding: 0, margin: 0 }}
                      size="s"
                      formik={formik}
                      name="active"
                      options={[
                        { label: t('statuses.lead-list.active'), value: true },
                        { label: t('statuses.lead-list.inactive'), value: false },
                      ]}
                    />
                  )}
                  {row.name === 'leads' && (
                    <FormikMultiSelect
                      formik={formik}
                      name="assignedLeadIds"
                      label={{ label: t('view-lead-list.leads') }}
                      size="s"
                      width="100%"
                      options={leadOptions}
                      // isOptionDisabled={(option, selectValue) => // todo
                      //   leadListData?.campaignStatus === CAMPAIGN_STATUSES.COMPLETE &&
                      //   initialLeadIds.includes(+selectValue)
                      // }
                      onMenuScrollToBottom={onLeadsScrollToBottom}
                      isSearchable
                      maxMenuHeight={200}
                    />
                  )}
                  {!['leads', 'active'].includes(row.name) && (
                    <Text variant="f8">{row.value}</Text>
                  )}
                </Flex>
              </Flex>
            ))}
            <Flex
              align="center"
              justify="center"
              gap={24}
              styles={{
                visibility: canSave ? 'visible' : 'hidden',
                marginTop: '40px',
              }}
            >
              <FilledButton disabled={!canSave} width="202px" type="submit">
                {t('view-lead.save')}
              </FilledButton>
              <OutlinedButton onClick={resetModals} width="202px" type="button">
                {t('view-lead.cancel')}
              </OutlinedButton>
            </Flex>
          </Flex>
        </Flex>
      </form>
    </ModalMessage>
  )
}
