import React, { useMemo, useCallback, useState } from 'react'
import useTranslation from 'next-translate/useTranslation'
import { Table } from '@peiko/components/Table'
import { BodyCell } from '@peiko/components/Table/components/BodyCell'
import { HeaderCell } from '@peiko/components/Table/components/HeaderCell'
import { THeader } from '@peiko/components/Table/types'
import { IconButton } from '@peiko/components/buttons/IconButton/IconButton'
import { FilledButton } from '@peiko/components/buttons/FilledButton/FilledButton'
import { PlusIcon } from '@peiko/components/icons/PlusIcon/PlusIcon'
import { TrashIcon } from '@peiko/components/icons/TrashIcon'
import { FormikInput } from '@peiko/components/inputs/formik-adapters/FormikInput/FormikInput'
import { TFormik } from '@peiko/types/formik'
import { EditIcon } from '@peiko/components/icons/EditIcon'
import { TOutboundConfig } from '@/api-rest/outbound-config/types'
import { SuccessIcon } from '@peiko/components/icons/SuccessIcon'
import { ErrorIcon } from '@peiko/components/icons/ErrorIcon'
import { Panel } from '@/features/agents/styles/AgentsList.styled'
import { Flex } from '@/components/Flex'
import { InfoCell } from '@/components/InfoCell'
import { FormikSelect } from '@peiko/components/inputs/formik-adapters/FormikSelect'
import { FormikCheckbox } from '@peiko/components/inputs/formik-adapters/FormikCheckbox'
import { useRoutesLoader } from '../../hooks/useRoutesLoader'
import { RouteRow } from '../../hooks/useCampaignEdit'
import { errorActions } from '../../../common/error'
import { useRedux } from '../../../../hooks/use-redux'

type TColumns = 'active' | 'prefix' | 'callerNumber' | 'edit' | 'delete'

export const CampaignRoutesPage = ({ formik }: { formik: TFormik }): JSX.Element => {
  const { t } = useTranslation('campaign-edit')
  const { dispatch } = useRedux()
  const headers: THeader<TColumns>[] = useMemo(
    () => [
      { label: t('pages.routes.active'), value: 'active', width: '10%' },
      { label: t('pages.routes.prefix'), value: 'prefix', width: '35%' },
      { label: t('pages.routes.caller-number'), value: 'callerNumber', width: '35%' },
      {
        label: t('pages.routes.edit-action'),
        value: 'edit',
        width: '10%',
      },
      {
        label: t('pages.routes.delete-action'),
        value: 'delete',
        width: '10%',
      },
    ],
    [t],
  )

  const [editedRow, setEditedRow] = useState<{
    index: number
    route: RouteRow
  } | null>(null)

  const { options, loadMore, setSearch } = useRoutesLoader()

  const deleteRow = (index: number) => {
    formik.setFieldValue(
      `routes`,
      (formik.values.routes as TOutboundConfig[]).filter(
        (_: TOutboundConfig, i: number) => i !== index,
      ),
    )
  }
  const onCancelEditRow = (index: number) => {
    if (editedRow?.route.routeId === 0) {
      deleteRow(index)
      setEditedRow(null)
      return
    }
    formik.setFieldValue(`routes[${index}].prefix`, editedRow?.route.prefix)
    formik.setFieldValue(`routes[${index}].routeName`, editedRow?.route.routeName)
    setEditedRow(null)
  }

  const onConfirmEdit = async (index: number) => {
    // Touch and validate only the edited row fields before confirming
    await Promise.all([
      formik.setFieldTouched(`routes[${index}].prefix`, true, true),
      formik.setFieldTouched(`routes[${index}].routeId`, true, true),
    ])

    const errors = await formik.validateForm()
    const rowErrors = (errors as any)?.routes?.[index]

    if (rowErrors?.prefix || rowErrors?.routeId) {
      return
    }

    const hasDuplicate = formik.values.routes.some(
      (route: RouteRow, ind: number) =>
        ind !== index &&
        route.routeId === formik.values.routes[index].routeId &&
        route.prefix === formik.values.routes[index].prefix,
    )
    if (hasDuplicate) {
      dispatch(errorActions.showGlobalError(t('pages.routes.error-duplicate-route')))
      return
    }

    formik.setFieldValue(`routes[${index}].isChanged`, true)
    setEditedRow(null)
  }

  const onEditRow = (index: number, route: RouteRow) => {
    Promise.all([
      formik.setFieldError(`routes[${index}].routeId`, undefined),
      formik.setFieldError(`routes[${index}].prefix`, undefined),
    ]).then(() => {
      setEditedRow({ index, route })
    })
  }

  const handleAddRoute = useCallback(() => {
    const currentRoutes = formik.values.routes || []
    const newRow = {
      prefix: '',
      routeName: '',
      routeId: 0,
      isChanged: true,
      active: true,
    } as RouteRow
    formik.setFieldValue('routes', [newRow, ...currentRoutes], false)
    onEditRow(0, newRow)
  }, [formik.values.routes])

  const rows = useMemo(
    () =>
      formik.values.routes.map((route: RouteRow, index: number) => ({
        row: {
          id: `${index}`,
          active: (
            <FormikCheckbox
              formik={formik}
              name={`routes[${index}].active`}
              onChange={() => onConfirmEdit(index)}
            />
          ),
          prefix:
            editedRow?.index === index ? (
              <FormikInput
                size="s"
                formik={formik}
                name={`routes[${index}].prefix`}
                mask="9999999999"
                maskChar=""
                alwaysShowMask={false}
              />
            ) : (
              <InfoCell title={route.prefix} />
            ),
          callerNumber:
            editedRow?.index === index ? (
              <FormikSelect
                menuPortalTarget={
                  typeof document !== 'undefined' ? document.body : undefined
                }
                options={options}
                size="s"
                formik={formik}
                width="100%"
                name={`routes[${index}].routeId`}
                onMenuScrollToBottom={loadMore}
                onInputChange={setSearch}
                onChange={(option) => {
                  formik
                    .setFieldValue(`routes[${index}].routeId`, option?.value)
                    .then(() => {
                      formik.validateField(`routes[${index}].routeId`)
                    })
                  formik.setFieldValue(`routes[${index}].routeName`, option?.label)
                }}
              />
            ) : (
              <InfoCell title={route.routeName} />
            ),
          edit:
            editedRow?.index === index ? (
              <>
                <IconButton
                  disabled={Boolean(
                    (formik.errors.routes as any)?.[index]?.prefix ||
                      (formik.errors.routes as any)?.[index]?.routeId,
                  )}
                  iconColor="main11"
                  onClick={() => onConfirmEdit(index)}
                >
                  <SuccessIcon width="20px" height="20px" />
                </IconButton>
                <IconButton iconColor="main13" onClick={() => onCancelEditRow(index)}>
                  <ErrorIcon width="20px" height="20px" />
                </IconButton>
              </>
            ) : (
              <IconButton
                disabled={editedRow !== null}
                iconColor="main3"
                onClick={() => onEditRow(index, route)}
              >
                <EditIcon width="20px" height="20px" />
              </IconButton>
            ),
          delete: (
            <IconButton
              disabled={editedRow !== null}
              iconColor="main13"
              onClick={() => deleteRow(index)}
            >
              <TrashIcon width="20px" height="20px" />
            </IconButton>
          ),
        },
      })),
    [formik.values.routes, formik.errors, formik.touched, editedRow],
  )

  return (
    <Flex direction="column" align="center" margin="20px 0 0 0">
      <Panel>
        <div> </div>
        <FilledButton
          disabled={editedRow !== null}
          type="button"
          size="s"
          startIcon={<PlusIcon width="20px" height="20px" />}
          onClick={handleAddRoute}
        >
          {t('pages.routes.add-route')}
        </FilledButton>
      </Panel>
      <Table
        loading={false}
        headerData={headers}
        rowsData={rows}
        bodyCell={(props) => (
          <BodyCell height="auto" alignItems="top" {...props} whiteSpace="nowrap" />
        )}
        headerCell={(props) => <HeaderCell {...props} whiteSpace="nowrap" />}
      />
    </Flex>
  )
}
