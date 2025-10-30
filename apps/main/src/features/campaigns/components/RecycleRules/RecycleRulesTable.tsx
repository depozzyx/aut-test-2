import React, { FC, useMemo, useCallback } from 'react'
import useTranslation from 'next-translate/useTranslation'
import { Table } from '@peiko/components/Table'
import { BodyCell } from '@peiko/components/Table/components/BodyCell'
import { HeaderCell } from '@peiko/components/Table/components/HeaderCell'
import { THeader } from '@peiko/components/Table/types'
import { IconButton } from '@peiko/components/buttons/IconButton/IconButton'
import { FilledButton } from '@peiko/components/buttons/FilledButton/FilledButton'
import { PlusIcon } from '@peiko/components/icons/PlusIcon/PlusIcon'
import { TrashIcon } from '@peiko/components/icons/TrashIcon'
import { FormikMultiSelect } from '@/components/formik-wrappers/FormikMultiSelect'
import { FormikInput } from '@peiko/components/inputs/formik-adapters/FormikInput/FormikInput'
import { FormikSelect } from '@peiko/components/inputs/formik-adapters/FormikSelect/FormikSelect'
import { TFormik } from '@peiko/types/formik'
import { TSelectOption } from '@/components/MutliSelect/types'
import { TRecycleRule } from '@/api-rest/campaigns/types'
import { Panel } from '../../styles/CampaignsList.styled'

type TColumns = 'status' | 'delay' | 'attempts' | 'finalStatus' | 'actions'

interface Props {
  formik: TFormik
  statuses: TSelectOption[]
  readOnly?: boolean
}

export const RecycleRulesTable: FC<Props> = ({ formik, statuses, readOnly = false }) => {
  const { t } = useTranslation('campaigns')

  const handleAddRule = useCallback(() => {
    const current = (formik.values.recycleRules as TRecycleRule[]) || []
    formik.setFieldValue(
      'recycleRules',
      [{ status: [], delay: '00:15', attempts: 1, finalStatus: '' }, ...current],
      false,
    )
  }, [formik.values.recycleRules])

  const headers: THeader<TColumns>[] = useMemo(
    () => [
      { label: t('create-campaign.recycle-rule-status'), value: 'status', width: '50%' },
      { label: t('create-campaign.recycle-rule-delay'), value: 'delay', width: '10%' },
      {
        label: t('create-campaign.recycle-rule-attempts'),
        value: 'attempts',
        width: '5%',
      },
      {
        label: t('create-campaign.recycle-rule-final-status'),
        value: 'finalStatus',
        width: '20%',
      },
      { label: '', value: 'actions', width: '5%' },
    ],
    [t],
  )

  const rows = useMemo(
    () =>
      (formik.values.recycleRules as TRecycleRule[]).map((rule, index) => {
        const disabled =
          readOnly || (index !== 0 && !formik.values.recycleRules[0].status)

        const statusOptions = statuses.filter(
          (option) =>
            !formik.values.recycleRules
              .filter((_: TRecycleRule, i: number) => i !== index)
              .flatMap((r: TRecycleRule) => r.status)
              .includes(option.value),
        )

        const finalStatusOptions = statuses.filter(
          (option) => !formik.values.recycleRules[index]?.status?.includes(option.value),
        )

        return {
          row: {
            id: `${index}`,
            status: (
              <FormikMultiSelect
                menuPortalTarget={
                  typeof document !== 'undefined' ? document.body : undefined
                }
                formik={formik}
                name={`recycleRules[${index}].status`}
                emitValues
                options={statusOptions}
                maxMenuHeight={150}
                disabled={disabled}
                width="100%"
                hideSelectedOptions
                isSearchable
              />
            ),
            delay: (
              <FormikInput
                formik={formik}
                type="time"
                name={`recycleRules[${index}].delay`}
                size="s"
                disabled={disabled}
              />
            ),
            attempts: (
              <FormikInput
                formik={formik}
                name={`recycleRules[${index}].attempts`}
                type="number"
                placeholder=""
                size="s"
                disabled={disabled}
              />
            ),
            finalStatus: (
              <FormikSelect
                menuPortalTarget={
                  typeof document !== 'undefined' ? document.body : undefined
                }
                formik={formik}
                disabled={readOnly}
                name={`recycleRules[${index}].finalStatus`}
                width="100%"
                options={finalStatusOptions}
                maxMenuHeight={150}
                isSearchable
              />
            ),
            actions: (
              <IconButton
                iconColor="main13"
                onClick={() =>
                  formik.setFieldValue(
                    `recycleRules`,
                    (formik.values.recycleRules as TRecycleRule[]).filter(
                      (_: TRecycleRule, i: number) => i !== index,
                    ),
                  )
                }
                disabled={disabled}
              >
                <TrashIcon width="20px" height="20px" />
              </IconButton>
            ),
          },
        }
      }),
    [formik.values.recycleRules, statuses],
  )

  return (
    <>
      <Panel>
        <div> </div>
        <FilledButton
          type="button"
          size="s"
          startIcon={<PlusIcon width="20px" height="20px" />}
          disabled={readOnly}
          onClick={handleAddRule}
        >
          {t('create-campaign.add-recycle-rule')}
        </FilledButton>
      </Panel>
      <Table
        loading={false}
        headerData={headers}
        rowsData={rows}
        bodyCell={(props) => (
          <BodyCell height="auto" alignItems="start" {...props} whiteSpace="nowrap" />
        )}
        headerCell={(props) => <HeaderCell {...props} whiteSpace="nowrap" />}
      />
    </>
  )
}

RecycleRulesTable.displayName = 'RecycleRulesTable'
