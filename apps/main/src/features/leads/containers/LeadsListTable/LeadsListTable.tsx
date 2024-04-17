import { memo } from 'react'
import useTranslation from 'next-translate/useTranslation'
import { deepEqual } from '@/utils/deep-equal'
import { Table } from '@peiko/components/Table'
import { BodyCell } from '@peiko/components/Table/components/BodyCell'
import { HeaderCell } from '@peiko/components/Table/components/HeaderCell'
import { THeader } from '@peiko/components/Table/types'
import { Select } from '@peiko/components/inputs/Select/Select'
import { ROUTES } from '@/constants/routes'
import { PlusIcon } from '@peiko/components/icons/PlusIcon'
import { useRedux } from '@/hooks/use-redux'
import { shallowEqual } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { Text } from '@peiko/components/Text'
import { Flex } from '@/components/Flex'
import { StatusChip } from '../../components/StatusChip'
import { InfoColumn } from '../../components/InfoColumn'
import {
  selectIsLoading,
  selectLeadsGroup,
  selectLeadsGroups,
  selectLeadsList,
  setLeadsGroup,
} from '../../store/campaigns-list'
import { TLeadsGroup } from '../../mocks/leadsListMock'
import { Link } from './LeadsListTable.styled'

type TLeadsRowKeys = 'id' | 'name' | 'phone' | 'timezone' | 'status' | 'source' | 'empty'

export const LeadsListTable = memo((): JSX.Element => {
  const { t } = useTranslation('leads-list')
  const { select, dispatch } = useRedux()

  const { leadsGroup, leadsGroups, data, isLoading } = select(
    createStructuredSelector({
      leadsGroup: selectLeadsGroup,
      leadsGroups: selectLeadsGroups,
      data: selectLeadsList,
      isLoading: selectIsLoading,
    }),
    shallowEqual,
  )

  const headers: THeader<TLeadsRowKeys>[] = [
    { label: t('headers.lead-id'), value: 'id' },
    { label: t('headers.lead-name'), value: 'name' },
    { label: t('headers.lead-phone'), value: 'phone' },
    { label: t('headers.lead-timezone'), value: 'timezone' },
    { label: t('headers.lead-status'), value: 'status' },
    { label: t('headers.lead-source'), value: 'source' },
    {
      label: (
        <>
          <Select
            name="leads-group"
            options={leadsGroups}
            value={leadsGroup !== undefined ? leadsGroup : ''}
            onChange={(data) => {
              if (data) dispatch(setLeadsGroup(data.value as TLeadsGroup['value']))
            }}
            placeholder={t('headers.select')}
            menuContent={{
              place: 'append',
              element: (
                <Link href={ROUTES.CABINET_DASHBOARD}>
                  <Flex
                    padding="7px 16px"
                    align="center"
                    justify="space-between"
                    cursor="pointer"
                  >
                    <Text variant="f8">{t('headers.createNewList')}</Text>
                    <PlusIcon width="16px" height="16px" />
                  </Flex>
                </Link>
              ),
            }}
          />
        </>
      ),
      value: 'empty',
    },
  ]

  const rows = data.map((campaign) => ({
    row: {
      id: <InfoColumn title={campaign.id} />,
      name: <InfoColumn title={campaign.name} />,
      phone: <InfoColumn title={campaign.phone} />,
      timezone: <InfoColumn title={campaign.timezone} />,
      status: <StatusChip status={campaign.status} />,
      source: <InfoColumn title={campaign.source} />,
      empty: <></>,
    },
  }))

  return (
    <Table
      loading={isLoading}
      headerData={headers}
      rowsData={rows}
      bodyCell={(props) => <BodyCell {...props} whiteSpace="nowrap" />}
      headerCell={(props) => <HeaderCell {...props} whiteSpace="nowrap" />}
    />
  )
}, deepEqual)

LeadsListTable.displayName = 'LeadsListTable'
