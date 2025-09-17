import React, { useEffect, useState } from 'react'

import useTranslation from 'next-translate/useTranslation'
import { useModals } from '@/features/common/modals/hooks/use-modals'
import { MODAL_NAMES } from '@/features/common/modals/constants'
import { ModalMessage } from '@peiko/components/modals/ModalMessage'
import { TLeadListData, TUpdateLeadListReq } from '@/api-rest/lead-list/types'
import { Flex } from '@/components/Flex'
import { Text } from '@peiko/components/Text/Text'
import { formatCreatedAt } from '@/features/campaigns/utils/formatCreateAt'
import { useTheme } from 'styled-components'
import { useFormik } from 'formik'
import { OutlinedButton } from '@peiko/components/buttons/OutlinedButton/OutlinedButton'
import { FilledButton } from '@peiko/components/buttons/FilledButton'
import { apiLeadList } from '@/api-rest/lead-list'
import { handleRestError } from '@/features/common/error'
import { useRedux } from '@/hooks/use-redux'
import { FormikSelect } from '@peiko/components/inputs/formik-adapters/FormikSelect/FormikSelect'

export const EditLeadListModal = ({
  leadListData,
  onClose,
}: {
  leadListData: TLeadListData
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
    // { name: 'leads', value: '' },
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

  // const [leadOptions, setLeadOptions] = useState<TLeadOption[]>([])
  // const [pagination, setPagination] = useState({
  //   total: 1,
  //   limit: 10,
  //   page: 1,
  // })

  type TFormValues = {
    // assignedLeadIds: number[]
    active: boolean
  }

  const formik = useFormik<TFormValues>({
    initialValues: {
      // assignedLeadIds: [],
      active: leadListData.active,
    },
    onSubmit: async (values) => {
      const payload: TUpdateLeadListReq = {}
      if (values.active !== leadListData.active) {
        payload.active = values.active
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

  const [canSave, setCanSave] = useState(false)

  useEffect(() => {
    setCanSave(leadListData.active !== formik.values.active)
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
