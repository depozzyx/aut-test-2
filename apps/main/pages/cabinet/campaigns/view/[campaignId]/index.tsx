import { NextPage } from 'next'
import { useTitle } from 'react-use'
import { shallowEqual } from 'react-redux'
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import useTranslation from 'next-translate/useTranslation'
import { createStructuredSelector } from 'reselect'

import { Permissions } from '@/features/common/permissions/Permissions'
import { CabinetLayout } from '@/layout/CabinetLayout'
import { ERoles } from '@/constants/profile'
import { Container } from '@/features/campaigns/styles/CampaignsList.styled'
import { apiCampaigns } from '@/api-rest/campaigns'
import { handleRestError } from '@/features/common/error'
import { useRedux } from '@/hooks/use-redux'
import { TCampaignInfo } from '@/api-rest/campaigns/types'
import { Flex } from '@/components/Flex'
import { Text } from '@peiko/components/Text/Text'
import { Box } from '@peiko/components/Box'
import { Pagination } from '@peiko/components/Pagination/Pagination'
import { useTheme } from 'styled-components'
import { Card } from '@peiko/components/Card'
import { CampaignAgentsCalls } from '@/features/campaigns/CampaignAgentsCalls'
import { CardTile } from '@/features/settings/components/CardTile'
import { LeadListCallStatisticTable } from '@/features/leads/containers/modals/components/LeadListCallStatisticTable'
import { LeadListTable } from '@/features/leads/containers/LeadListTable'
import { asyncGetLeadLists } from '@/features/leads/store/lead-list'
import { InlineLoader } from '@peiko/components/loaders/InlineLoader'
import { ArrowIcon } from '@peiko/components/icons/Arrow/ArrowIcon'
import {
  selectLeadsOrderBy,
  selectLeadsPagination,
  selectLeadsOrder,
} from '@/features/leads/store/leads'
import { ROUTES } from '@/routes'
import { TCampaign } from '@/features/campaigns/types'

const CampaignViewPage: NextPage = () => {
  const { t } = useTranslation('campaigns')
  const { t: tRouting } = useTranslation('routing')

  const router = useRouter()
  const theme = useTheme()

  useTitle(tRouting('campaign_view'))

  const { dispatch, select } = useRedux()
  const campaignId = Number(router.query.campaignId)
  const [campaignInfo, setCampaignInfo] = useState<TCampaignInfo>()
  const [campaign, setCampaign] = useState<TCampaign>()

  const {
    pagination: { total, page, limit },
    orderBy,
    order,
  } = select(
    createStructuredSelector({
      pagination: selectLeadsPagination,
      orderBy: selectLeadsOrderBy,
      order: selectLeadsOrder,
    }),
    shallowEqual,
  )

  const onChangePage = (page: number) =>
    campaignId &&
    dispatch(asyncGetLeadLists({ page, limit, order, campaignId: +campaignId }))

  useEffect(() => {
    onChangePage(page)
  }, [orderBy, order])

  const [loading, setLoading] = useState(true)
  useEffect(() => {
    const fetchCampaignInfo = async () => {
      if (!campaignId) return
      try {
        setLoading(true)
        const [info, campaign] = await Promise.all([
          apiCampaigns.getCampaignInfoById(campaignId),
          apiCampaigns.getCampaignById(campaignId.toString()),
        ])
        if (info.data) setCampaignInfo(info.data.data)
        if (campaign.data) setCampaign(campaign.data.data)
      } catch (e) {
        setLoading(false)
        handleRestError({ e, dispatch })
      } finally {
        setLoading(false)
      }
    }
    fetchCampaignInfo()
  }, [campaignId])

  const rows = [
    { name: t('view.name'), value: campaignInfo?.name },
    {
      name: t('view.status'),
      value: campaignInfo?.status && t(`statuses.${campaignInfo.status}`),
    },
    {
      name: t('view.mode-label'),
      value: campaign?.mode && t(`modes.${campaign?.mode}`),
    },
    {
      name: t('view.holdTime-label'),
      value: campaign?.holdTime ?? 0,
    },
    {
      name: t('view.workHours-label'),
      value: campaign?.workHours ?? '',
    },
    {
      name: t('view.coefficient-label'),
      value: campaign?.coefficient ?? '',
    },
    {
      name: t('view.callsToday'),
      value: campaignInfo?.callsToday,
    },
  ]

  return (
    <Permissions roles={[ERoles.ADMIN, ERoles.SUPERADMIN, ERoles.MANAGER]}>
      <CabinetLayout
        title={tRouting('campaign_view')}
        breadCrumbs={
          <Flex margin="0 0 14px" justify="start" align="center" gap={5}>
            <Text
              styles={{
                color: theme.palette.main23,
                cursor: 'pointer',
                ':hover': {
                  color: theme.palette.main2,
                },
              }}
              onClick={() => router.push(ROUTES.CAMPAIGNS_LIST)}
            >
              {t('view.breadCrumbs.campaigns')}
            </Text>
            <ArrowIcon direction="right" size="s" />
            <span style={{ color: theme.palette.main3 }}>
              {t('view.breadCrumbs.campaign')} {campaignId}
            </span>
          </Flex>
        }
      >
        <Container>
          {loading ? (
            <InlineLoader variant="table" loading={loading} borderRadius={4} />
          ) : (
            <Flex direction="column">
              <Flex gap={40}>
                <Card fullWidth maxWidth={300}>
                  <CardTile styles={{ marginBottom: '4px' }}>
                    {t('view.info.title')}
                  </CardTile>
                  <Flex
                    direction="column"
                    justify="center"
                    align="center"
                    styles={{
                      width: '100%',
                      maxWidth: '400px',
                      marginBottom: '20px',
                    }}
                  >
                    {rows.map((row) => (
                      <Flex
                        key={row.name}
                        justify="start"
                        gap="10"
                        styles={{
                          display: 'flex',
                          width: '100%',
                          padding: '8px 0',
                          borderBottom: `1px solid ${theme.palette.main22}`,
                        }}
                      >
                        <Flex
                          styles={{
                            flex: '1',
                            textAlign: 'start',
                          }}
                        >
                          <Text variant="f8">{row.name}</Text>
                        </Flex>
                        <Flex
                          styles={{
                            flex: '1',
                            textAlign: 'start',
                          }}
                        >
                          <Text variant="f8">{row.value}</Text>
                        </Flex>
                      </Flex>
                    ))}
                  </Flex>
                </Card>
                <Card fullWidth maxWidth={300}>
                  <CardTile styles={{ marginBottom: '4px' }}>
                    {t('view.agentsCalls.title')}
                  </CardTile>
                  {campaignInfo?.agentsCalls && (
                    <CampaignAgentsCalls agentsCalls={campaignInfo?.agentsCalls} />
                  )}
                </Card>
                <Card fullWidth>
                  <CardTile styles={{ marginBottom: '4px' }}>
                    {t('view.callsByLeadStatuses.title')}
                  </CardTile>
                  {campaignInfo?.byLeadStatuses && (
                    <LeadListCallStatisticTable
                      maxHeight="190px"
                      data={campaignInfo.byLeadStatuses}
                    />
                  )}
                </Card>
              </Flex>
              <Box styles={{ marginTop: '28px' }}>
                <Box styles={{ marginTop: '6px' }}>
                  <Flex padding={10}>
                    <Text variant="f4">{t('view.campaignLeadLists.title')}</Text>
                  </Flex>
                  <LeadListTable reFetch={() => onChangePage(page)} />
                </Box>
                <Box
                  styles={{
                    marginTop: '24px',
                    display: 'flex',
                    justifyContent: 'center',
                  }}
                >
                  <Pagination
                    lastPage={total === 0 ? 1 : Math.ceil(total / (limit ?? 10))}
                    currentPage={page}
                    onChange={onChangePage}
                  />
                </Box>
              </Box>
            </Flex>
          )}
        </Container>
      </CabinetLayout>
    </Permissions>
  )
}

export default CampaignViewPage
