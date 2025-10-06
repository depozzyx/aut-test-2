import React, { FC, useEffect, useMemo, useRef, useState } from 'react'

import { Box } from '@peiko/components/Box'

import { OutlinedButton } from '@peiko/components/buttons/OutlinedButton'
import { ExcelIcon } from '@peiko/components/icons/ExcelIcon/ExcelIcon'
import { shallowEqual } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { useUnmount } from 'react-use'
import { Select } from '@peiko/components/inputs/Select/Select'
import { Toggle } from '@peiko/components/inputs/Toggle/Toggle'
import useTranslation from 'next-translate/useTranslation'
import { Text } from '@peiko/components/Text'
import { Flex } from '../../components/Flex'
import { CampaignStatisticsFilters } from './containers/filter'
import { formatCreatedAt } from '../campaigns/utils/formatCreateAt'
import { notificationActions } from '../common/notifications/store'
import {
  getCampaignStatistics,
  getCampaignStatisticsDownload,
  selectIsLoading,
  selectReportsFilters,
  selectReportsGroupBy,
  selectReportsOrder,
  selectReportsOrderBy,
  reset,
  setCampaignStatisticsFilters,
  setCampaignStatisticsGroupBy,
  setCampaignStatisticsOrderBy,
  setCampaignStatisticsOrder,
} from './store/reports'
import { useRedux } from '../../hooks/use-redux'
import { MultiSelect } from '../../components/MutliSelect'
import {
  CampaignStatisticFields,
  CampaignStatisticOrderBy,
} from '../../api/rest/reports/types'
import { TOrder } from '../../types/entities/order'
import { CampaignStatisticsTable } from './containers/CampaignStatisticsFilters'
import { CampaignStatisticsPrintableReport } from './CampaignStatisticsPrintableReport'

interface CampaignStatisticsListProps {
  type: 'calls' | 'leads'
}

export const CampaignStatisticsList: FC<CampaignStatisticsListProps> = ({ type }) => {
  const { t } = useTranslation('campaign-statistics')
  const { dispatch, select } = useRedux()
  const { orderBy, order, isLoading, filter, groupBy } = select(
    createStructuredSelector({
      orderBy: selectReportsOrderBy,
      order: selectReportsOrder,
      isLoading: selectIsLoading,
      filter: selectReportsFilters,
      groupBy: selectReportsGroupBy,
    }),
    shallowEqual,
  )

  // Ref to track if the initial fetch has been triggered
  const initialFetchTriggered = useRef(false)
  const [simpleMode, setSimpleMode] = useState(false)
  const [downloadFormat, setDownloadFormat] = useState<'csv' | 'xlsx'>('xlsx')

  const fetchReport = () => {
    if (!initialFetchTriggered.current) {
      return
    }
    dispatch(
      getCampaignStatistics({
        orderBy,
        order,
        filter,
        groupBy,
        type,
      }),
    )
  }

  const orderByOptions = useMemo(
    () =>
      Object.values(CampaignStatisticOrderBy).map((v) => ({
        label:
          v === CampaignStatisticOrderBy.groups
            ? groupBy.map((field) => t(`headers.list.${field}`)).join(' / ')
            : t(`headers.list.${v}`),
        value: v,
      })),
    [groupBy, t],
  )

  useEffect(() => {
    fetchReport()
  }, [orderBy, order, filter, groupBy, type])

  const handleDownload = () => {
    getCampaignStatisticsDownload({
      orderBy,
      order,
      filter,
      groupBy,
      type,
      format: downloadFormat,
    })
      .then((url) => {
        if (url) {
          const a = document.createElement('a')
          a.href = url
          const fileName = formatCreatedAt(
            new Date().toISOString(),
            true,
            'HH-mm-ss',
          ).replace(/ /g, '_')
          a.download = `${type}_stat_${fileName}.${downloadFormat}`
          document.body.appendChild(a)
          a.click()
          a.remove()
        }
      })
      .catch((e) => {
        console.error('Download error:', e)
        dispatch(
          notificationActions.setNotification({
            key: `notifications:agent.campaign`,
            status: 'info',
            values: {},
          }),
        )
      })
  }

  useEffect(() => {
    initialFetchTriggered.current = false
    dispatch(reset())
    dispatch(
      setCampaignStatisticsGroupBy([
        CampaignStatisticFields.day,
        CampaignStatisticFields.campaign,
        CampaignStatisticFields.leadList,
        CampaignStatisticFields.status,
      ]),
    )
    dispatch(setCampaignStatisticsFilters({ ...filter, onlyActive: false }))
    dispatch(setCampaignStatisticsOrder('DESC'))
    initialFetchTriggered.current = true
  }, [dispatch])

  useUnmount(() => {
    dispatch(reset())
  })

  return (
    <>
      <Box
        styles={{
          width: '100%',
          marginTop: '12px',
          display: 'flex',
          gap: '12px',
          alignItems: 'flex-start',
        }}
      >
        <div style={{ flex: '1 1 auto', minWidth: 0 }}>
          <CampaignStatisticsFilters
            inactiveFilters={{ onlyActive: true }}
            disabled={isLoading}
            filters={filter}
          />
        </div>
        <Flex gap={10} styles={{ flexShrink: 0, marginLeft: 'auto' }}>
          <OutlinedButton
            onClick={() => handleDownload()}
            size="s"
            startIcon={<ExcelIcon width="24px" height="24px" />}
          >
            {t('Download')}
          </OutlinedButton>
          <Text variant="f10" styles={{ alignSelf: 'center' }}>
            {t('XLSX')}
          </Text>
          <Toggle
            name="toggle"
            onChange={() => {
              setDownloadFormat(downloadFormat === 'csv' ? 'xlsx' : 'csv')
            }}
          />
          <Text variant="f10" styles={{ alignSelf: 'center' }}>
            {t('CSV')}
          </Text>
        </Flex>
      </Box>
      <Box
        styles={{
          width: '100%',
          marginTop: '12px',
          display: 'flex',
          gap: '12px',
          alignItems: 'flex-center',
        }}
      >
        <Text variant="f10" styles={{ alignSelf: 'center' }}>
          {t('Group by')}
        </Text>
        <MultiSelect
          name="groupBy"
          options={Object.values(CampaignStatisticFields).map((v) => ({
            label: t(`headers.list.${v}`),
            value: v,
          }))}
          disabled={isLoading}
          placeholder={t('group-by')}
          value={groupBy}
          emitValues
          hideSelectedOptions
          onChange={(values) =>
            dispatch(
              setCampaignStatisticsGroupBy(
                Array.isArray(values) ? values.map((v) => v.value) : [],
              ),
            )
          }
          size="m"
          styles={{ minWidth: '200px' }}
        />
        <Box
          styles={{
            display: 'flex',
            gap: '12px',
            alignItems: 'flex-start',
          }}
        >
          <Text variant="f10" styles={{ alignSelf: 'center' }}>
            {t('Order by')}
          </Text>
          <Select
            key={`orderBy-${groupBy.join('|')}`}
            name="orderBy"
            label={t('sort-by')}
            options={orderByOptions}
            disabled={isLoading}
            placeholder={t('sort-by')}
            value={orderBy}
            onChange={(value) =>
              dispatch(
                setCampaignStatisticsOrderBy(value?.value as CampaignStatisticOrderBy),
              )
            }
            size="m"
          />
          <Select
            name="order"
            options={[
              {
                label: t(`ASC`),
                value: 'ASC',
              },
              {
                label: t(`DESC`),
                value: 'DESC',
              },
            ]}
            disabled={isLoading}
            placeholder={t('order')}
            value={order}
            onChange={(value) =>
              dispatch(setCampaignStatisticsOrder(value?.value as TOrder))
            }
            size="m"
          />
        </Box>
        <Box
          styles={{
            display: 'flex',
            gap: '12px',
            alignItems: 'flex-start',
          }}
        >
          <Text variant="f10" styles={{ alignSelf: 'center' }}>
            {t('Table view')}
          </Text>
          <Toggle
            name="toggle"
            onChange={() => {
              setSimpleMode(!simpleMode)
            }}
          />
          <Text variant="f10" styles={{ alignSelf: 'center' }}>
            {t('Simple view')}
          </Text>
        </Box>
      </Box>
      <Box styles={{ marginTop: '6px' }}>
        {simpleMode ? <CampaignStatisticsPrintableReport /> : <CampaignStatisticsTable />}
      </Box>
    </>
  )
}
